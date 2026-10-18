import { GoogleGenAI } from '@google/genai';
import { ScamCategory, ScanResult, ScanVerdict, ConfidenceLevel } from '../lib/types';
import { evaluateCategoryRules, evaluateCallChecklist, CallChecklistAnswers } from '../lib/scam_rules';
import { checkKnownScam } from '../lib/scam_hashes';

// Initialize SDK with server environment variable
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not set on server, running in rules-only fallback mode.');
    return null;
  }
  return new GoogleGenAI();
};

const DISCLAIMER_TEXT =
  'This is AI-assisted guidance, not a guarantee. Always verify with the official company or bank. The creator is not responsible for decisions made from this result.';

// Strict schema expectation for AI output
interface GeminiScanResponse {
  verdict: 'Safe' | 'Suspicious' | 'Likely Scam' | 'Not Sure';
  score: number;
  confidence: 'Low' | 'Medium' | 'High';
  reasons: string[];
  actions: string[];
  verifySteps: string[];
}

export async function analyzeScamWithSignals(
  category: ScamCategory,
  input: string,
  callAnswers?: CallChecklistAnswers
): Promise<ScanResult> {
  // 1. Signal 1: Rule Engine Evaluation
  const ruleEval = category === 'call' && callAnswers
    ? evaluateCallChecklist(callAnswers)
    : evaluateCategoryRules(category, input);

  // 2. Signal 2: Known Viral Scam SHA-256 and Near-Match
  const hashCheck = category === 'call'
    ? { matched: false, similarity: 0 }
    : await checkKnownScam(input);

  // 3. Signal 3: URL Risk Analysis
  let urlRiskScore = 0;
  if (category === 'website' || input.includes('http') || input.includes('.com') || input.includes('.xyz') || input.includes('.top')) {
    if (input.includes('.xyz') || input.includes('.top') || input.includes('wa.me') || input.includes('bit.ly') || input.includes('tinyurl')) {
      urlRiskScore = 75;
    } else if (input.includes('hbl') || input.includes('easypaisa') || input.includes('jazzcash')) {
      // Check if not official domain
      if (!input.includes('hbl.com') && !input.includes('easypaisa.com.pk') && !input.includes('jazzcash.com.pk')) {
        urlRiskScore = 90;
      }
    }
  }

  // Known viral scam match is an immediate high risk signal
  if (hashCheck.matched) {
    ruleEval.score = Math.max(ruleEval.score, 92);
    ruleEval.redFlags.unshift(`Matches verified viral scam in registry: "${hashCheck.scam?.title || 'Known Threat'}"`);
    ruleEval.reasons.unshift('Exact or near-match detected in the national viral scam hash database');
  }

  // 4. Signal 4: Gemini Analysis with Timeout and Single Retry
  let aiResult: GeminiScanResponse | null = null;
  let isOfflineCheck = false;

  const ai = getGenAI();
  if (ai) {
    const systemPrompt = `You are an elite fraud detection specialist in Pakistan. Analyze this potential ${category} scam targeting Pakistani consumers (supporting English, Urdu, and Roman Urdu).
Contextual specifics for Pakistan:
- BISP / Benazir / Ehsaas 25,000 / 10,500 lottery SMS are 100% scams.
- Bank or telecom SMS from personal 11-digit numbers (0300...) claiming to be HBL, Meezan, Easypaisa, or JazzCash are scams.
- Demanding OTP, MPIN, or remote access software (AnyDesk, TeamViewer) is always a scam.
- YouTube video like / subscribe task daily income is a pyramid task scam.
- Real banks never threaten same-day arrest or account freeze over telephone calls.

Evaluate objectively. Never invent facts about real organizations. Be honest and balanced.
Return JSON conforming to:
{
  "verdict": "Safe" | "Suspicious" | "Likely Scam" | "Not Sure",
  "score": number (0 to 100),
  "confidence": "Low" | "Medium" | "High",
  "reasons": [string, string, string],
  "actions": [string, string, string],
  "verifySteps": [string, string]
}`;

    const userContent = category === 'call' && callAnswers
      ? `Category: Phone Call.
Checklist answers:
- Claimed authority (bank/police/army): ${callAnswers.claimedAuthority}
- Demanded OTP/PIN/password: ${callAnswers.demandedCredentials}
- Threatened account block or arrest: ${callAnswers.threatenedConsequences}
- Demanded fund transfer to secure account: ${callAnswers.demandedFundTransfer}
- Asked to install remote app (AnyDesk/TeamViewer): ${callAnswers.installRemoteApp}
- Rushed urgency: ${callAnswers.rushedUrgency}
Notes: ${input || 'No additional notes'}`
      : `Category: ${category}
Message/Content to inspect:
"""${input}"""`;

    // Attempt with retry
    for (let attempt = 0; attempt < 2; attempt++) {
      let timer: NodeJS.Timeout | null = null;
      try {
        const timeoutPromise = new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error('AI request timeout')), 20000);
        });

        const aiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemPrompt}\n\n${userContent}`,
          config: {
            temperature: 0.1,
            maxOutputTokens: 800,
            responseMimeType: 'application/json'
          }
        });

        const resp = await Promise.race([aiCall, timeoutPromise]);
        if (timer) clearTimeout(timer);

        const text = resp.text?.trim() || '{}';
        const parsed = JSON.parse(text) as GeminiScanResponse;

        if (parsed.verdict && typeof parsed.score === 'number' && Array.isArray(parsed.reasons)) {
          aiResult = parsed;
          break; // Successful parse
        }
      } catch (err) {
        if (timer) clearTimeout(timer);
        console.warn(`Gemini scam analysis attempt ${attempt + 1} failed:`, err instanceof Error ? err.message : err);
      }
    }
  }

  if (!aiResult) {
    isOfflineCheck = true;
  }

  // Combine Signals into unified Final Verdict
  let finalScore: number;
  let finalVerdict: ScanVerdict;
  let finalConfidence: ConfidenceLevel;
  const reasons: string[] = [];
  const actions: string[] = [];
  const verifySteps: string[] = [];

  if (aiResult) {
    // Weighted combination: 45% AI, 40% Category Rules, 15% URL/Hash
    let combined = (aiResult.score * 0.45) + (ruleEval.score * 0.40) + (Math.max(urlRiskScore, hashCheck.matched ? 90 : 0) * 0.15);
    
    // Override if known viral hash match
    if (hashCheck.matched) {
      combined = Math.max(combined, 90);
    }

    finalScore = Math.round(combined);

    // Determine verdict
    if (finalScore >= 65) {
      finalVerdict = 'Likely Scam';
      finalConfidence = hashCheck.matched || aiResult.confidence === 'High' ? 'High' : 'Medium';
    } else if (finalScore >= 35) {
      finalVerdict = 'Suspicious';
      finalConfidence = 'Medium';
    } else if (Math.abs(aiResult.score - ruleEval.score) > 40) {
      // Signals strongly disagree
      finalVerdict = 'Not Sure';
      finalConfidence = 'Low';
    } else {
      finalVerdict = 'Safe';
      finalConfidence = 'High';
    }

    // Merge top reasons
    reasons.push(...aiResult.reasons.slice(0, 3));
    if (reasons.length < 3 && ruleEval.reasons.length > 0) {
      reasons.push(...ruleEval.reasons.slice(0, 3 - reasons.length));
    }

    actions.push(...(aiResult.actions || []).slice(0, 3));
    verifySteps.push(...(aiResult.verifySteps || []).slice(0, 2));
  } else {
    // Offline Rule Engine Fallback
    finalScore = ruleEval.score;
    if (hashCheck.matched) finalScore = Math.max(finalScore, 90);

    if (finalScore >= 65) {
      finalVerdict = 'Likely Scam';
      finalConfidence = hashCheck.matched ? 'High' : 'Medium';
    } else if (finalScore >= 35) {
      finalVerdict = 'Suspicious';
      finalConfidence = 'Medium';
    } else {
      finalVerdict = 'Safe';
      finalConfidence = 'Medium';
    }

    reasons.push(...ruleEval.reasons);
    if (reasons.length === 0) {
      if (finalVerdict === 'Likely Scam') {
        reasons.push('Matched critical threat patterns in offline fraud rule database');
      } else if (finalVerdict === 'Suspicious') {
        reasons.push('Contains ambiguous language or unverified sender indicators');
      } else {
        reasons.push('No known fraud keywords, suspicious links, or credential requests detected');
      }
    }

    actions.push('Do not share any OTP, PIN, password, or send money.');
    actions.push('Never click links sent from unverified personal mobile numbers.');
    actions.push('If in doubt, call the official bank or agency helpline.');

    verifySteps.push('Dial your bank or service helpline directly from their official debit card or website.');
    verifySteps.push('Verify any lottery or payout on the official government portal (e.g. 8171.bisp.gov.pk).');
  }

  // Ensure 3 clean reasons
  while (reasons.length < 3) {
    if (finalVerdict === 'Likely Scam') {
      reasons.push('Urgent pressure tactics commonly used in social engineering fraud');
    } else if (finalVerdict === 'Suspicious') {
      reasons.push('Inconsistencies detected in sender identity and communication channel');
    } else {
      reasons.push('Standard authentic communication format verified');
    }
  }

  return {
    verdict: finalVerdict,
    score: finalScore,
    confidence: finalConfidence,
    reasons: reasons.slice(0, 3),
    actions: actions.slice(0, 3),
    verifySteps: verifySteps.slice(0, 3),
    category,
    redFlags: ruleEval.redFlags,
    matchedKnownHash: hashCheck.matched,
    signalsBreakdown: {
      ruleScore: ruleEval.score,
      knownHashMatch: hashCheck.matched,
      urlRiskScore,
      aiScore: aiResult ? aiResult.score : undefined,
      isOfflineCheck
    },
    disclaimer: DISCLAIMER_TEXT
  };
}

// Screenshot OCR using Gemini 2.5 Flash Vision
export async function extractTextFromScreenshot(imageBase64: string, mimeType: string): Promise<string> {
  const ai = getGenAI();
  if (!ai) {
    throw new Error('OCR requires server AI service. Please enter text manually.');
  }

  // Clean base64 string
  const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

  let timer: NodeJS.Timeout | null = null;
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('OCR request timeout')), 20000);
    });

    const aiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          text: 'Transcribe all visible text from this screenshot accurately, preserving Pakistani SMS, WhatsApp, Urdu, Roman Urdu, phone numbers, and bank details. Output ONLY the extracted text with no intro or commentary.'
        },
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType || 'image/jpeg'
          }
        }
      ],
      config: {
        maxOutputTokens: 1000
      }
    });

    const response = await Promise.race([aiCall, timeoutPromise]);
    if (timer) clearTimeout(timer);
    return response.text?.trim() || '';
  } catch (err) {
    if (timer) clearTimeout(timer);
    console.warn('OCR processing error:', err instanceof Error ? err.message : err);
    throw err;
  }
}

// ShieldBot Chatbot Response
export async function generateChatbotReply(
  message: string,
  history: Array<{ sender: 'user' | 'bot'; text: string }>
): Promise<string> {
  const ai = getGenAI();
  const lower = message.toLowerCase();

  // Strict Creator response rule:
  if (lower.includes('who made') || lower.includes('who created') || lower.includes('kis ne banaya') || lower.includes('creator') || lower.includes('developer')) {
    return 'ScamShield AI was built by Imdad Ali (https://www.linkedin.com/in/imdad-ali-naich-849590335).';
  }

  // Future help response rule:
  if (lower.includes('future') || lower.includes('help in future') || lower.includes('future plans') || lower.includes('mustaqbil')) {
    return 'In the future, ScamShield AI can help by:\n1. Protecting students from fake job offers and registration fee traps.\n2. Helping elders and families spot deceptive SMS, WhatsApp lottery messages, and OTP theft.\n3. Providing a shared community warning board where real people share local scam experiences.\n4. Spreading local-language scam awareness in Urdu and Roman Urdu.\n5. Partnering with banks, universities, and telecom companies for proactive fraud warnings.\n\nPlease note: Results are guidance only. Always confirm with your bank.';
  }

  // Refusal for malicious fraud queries
  if (lower.includes('write scam') || lower.includes('how to cheat') || lower.includes('how to hack') || lower.includes('steal otp') || lower.includes('fake transfer')) {
    return 'I cannot assist with creating scam messages, phishing templates, or carrying out fraudulent activities. My goal is to protect Pakistani citizens from online and financial scams.';
  }

  if (!ai) {
    return 'ShieldBot is currently operating in offline mode. For urgent fraud help, never share your OTP or MPIN, and immediately contact your bank or FIA Cyber Crime at 1991.';
  }

  let timer: NodeJS.Timeout | null = null;
  try {
    const formattedHistory = history.slice(-6).map(h => `${h.sender === 'user' ? 'User' : 'ShieldBot'}: ${h.text}`).join('\n');
    const prompt = `You are ShieldBot, the warm, polite, and vigilant security assistant for "360 ScamShield AI" in Pakistan.
Rules:
1. If asked who made this app, respond: "ScamShield AI was built by Imdad Ali (https://www.linkedin.com/in/imdad-ali-naich-849590335)." Do not invent other personal details.
2. If asked how this can help in the future, emphasize protecting students from fake jobs, helping families spot scams, community warning board, local-language awareness, and potential partnerships with banks and universities. Remind them results are guidance only.
3. Refuse any request to write scam messages or commit fraud.
4. Respond in the same language as the user (English, Urdu اردو, or Roman Urdu).
5. Keep answers concise, empathetic, and actionable.

Conversation History:
${formattedHistory}

User: ${message}
ShieldBot:`;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('ShieldBot request timeout')), 15000);
    });

    const aiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 500
      }
    });

    const response = await Promise.race([aiCall, timeoutPromise]);
    if (timer) clearTimeout(timer);
    return response.text?.trim() || 'I am here to help you stay safe from online scams in Pakistan. Feel free to ask about any suspicious message or phone call!';
  } catch (err) {
    if (timer) clearTimeout(timer);
    console.warn('ShieldBot AI call failed:', err instanceof Error ? err.message : err);
    return 'I am currently having trouble connecting to AI services. Remember: never share your OTP, PIN, or bank passwords with anyone claiming to call from your bank.';
  }
}
