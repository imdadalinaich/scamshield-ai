import fs from 'fs';
import path from 'path';
import { BENCHMARK_TEST_CASES, TestCase } from './benchmark_dataset';
import { evaluateCategoryRules, evaluateCallChecklist } from '../src/lib/scam_rules';
import { checkKnownScam } from '../src/lib/scam_hashes';

async function runBenchmark() {
  console.log('🚀 Running 360 ScamShield AI Benchmark Suite on 64 Test Cases...');
  
  let total = BENCHMARK_TEST_CASES.length;
  let correct = 0;
  let falsePositives = 0; // Genuine classified as Scam
  let falseNegatives = 0; // Scam classified as Safe
  let truePositives = 0;  // Scam classified as Scam/Suspicious
  let trueNegatives = 0;  // Genuine classified as Safe

  const categoryStats: Record<string, { total: number; correct: number }> = {};
  const langStats: Record<string, { total: number; correct: number }> = {};
  const failureCases: Array<{ id: number; desc: string; expected: string; gotScore: number; gotVerdict: string }> = [];

  for (const tc of BENCHMARK_TEST_CASES) {
    if (!categoryStats[tc.category]) categoryStats[tc.category] = { total: 0, correct: 0 };
    if (!langStats[tc.language]) langStats[tc.language] = { total: 0, correct: 0 };

    categoryStats[tc.category].total++;
    langStats[tc.language].total++;

    // Evaluate signals
    const ruleEval = tc.category === 'call' && tc.callAnswers
      ? evaluateCallChecklist(tc.callAnswers)
      : evaluateCategoryRules(tc.category, tc.content);

    const hashMatch = tc.category === 'call' ? { matched: false } : await checkKnownScam(tc.content);
    let finalScore = ruleEval.score;
    if (hashMatch.matched) finalScore = Math.max(finalScore, 90);

    const isPredictedScam = finalScore >= 35; // Suspicious or Likely Scam
    const isActualScam = tc.isScam;

    if (isPredictedScam === isActualScam) {
      correct++;
      categoryStats[tc.category].correct++;
      langStats[tc.language].correct++;
      if (isActualScam) truePositives++;
      else trueNegatives++;
    } else {
      failureCases.push({
        id: tc.id,
        desc: tc.description,
        expected: isActualScam ? 'Scam' : 'Genuine',
        gotScore: finalScore,
        gotVerdict: finalScore >= 65 ? 'Likely Scam' : finalScore >= 35 ? 'Suspicious' : 'Safe'
      });
      if (isPredictedScam && !isActualScam) falsePositives++;
      else falseNegatives++;
    }
  }

  const accuracy = ((correct / total) * 100).toFixed(1);
  const precision = ((truePositives / (truePositives + falsePositives || 1)) * 100).toFixed(1);
  const recall = ((truePositives / (truePositives + falseNegatives || 1)) * 100).toFixed(1);

  console.log(`\n======================================================`);
  console.log(`🎯 BENCHMARK RESULTS`);
  console.log(`Total Cases: ${total}`);
  console.log(`Accuracy:    ${accuracy}% (${correct}/${total})`);
  console.log(`Precision:   ${precision}%`);
  console.log(`Recall:      ${recall}%`);
  console.log(`False Positives (genuine flagged): ${falsePositives}`);
  console.log(`False Negatives (scam missed):     ${falseNegatives}`);
  console.log(`======================================================\n`);

  // Generate test_report.md
  const reportContent = `# 360 ScamShield AI - Benchmark Test Report

Generated: ${new Date().toISOString()}
Environment: Node.js / Linux (Rule Engine + Known Hash Near-Match Signals)

## 1. Executive Summary

- **Total Test Cases**: ${total}
- **Overall Accuracy**: **${accuracy}%** (${correct} passed out of ${total})
- **Precision**: **${precision}%**
- **Recall (Sensitivity)**: **${recall}%**
- **True Positives (Scams correctly flagged)**: ${truePositives}
- **True Negatives (Genuine messages verified safe)**: ${trueNegatives}
- **False Positives (Legitimate messages over-flagged)**: ${falsePositives}
- **False Negatives (Scams missed)**: ${falseNegatives}

> **Accuracy Note**: Per user instruction and responsible AI design, 360 ScamShield AI **never claims "99.9% accuracy" or guarantees**. Real world scam variants constantly evolve, and AI-assisted guidance requires users to verify with official organizations.

---

## 2. Breakdown by Language

| Language | Total Samples | Correct | Accuracy |
| :--- | :---: | :---: | :---: |
${Object.entries(langStats).map(([lang, stat]) => `| **${lang}** | ${stat.total} | ${stat.correct} | ${((stat.correct / stat.total) * 100).toFixed(1)}% |`).join('\n')}

---

## 3. Breakdown by Scam Threat Category

| Category | Total Samples | Correct | Accuracy |
| :--- | :---: | :---: | :---: |
${Object.entries(categoryStats).map(([cat, stat]) => `| **${cat.toUpperCase()}** | ${stat.total} | ${stat.correct} | ${((stat.correct / stat.total) * 100).toFixed(1)}% |`).join('\n')}

---

## 4. Signal Integration Analysis

The benchmark validates our multi-signal defense layer:
1. **Rule Engine**: Evaluates high-risk tokens (e.g., OTP, MPIN, unmasked mobile bank SMS, registration fee, advance payment only).
2. **Viral Scam Hash Registry**: Exact SHA-256 and word-level Jaccard similarity (>0.55) to detect variations of widespread Pakistani scams (BISP 25k, Easypaisa reversal, YouTube task scam).
3. **URL & Domain Analysis**: Identifies suspicious TLDs (.xyz, .top, .buzz, .click) and raw IP addresses without resolving or visiting the sites.
4. **Phone Call Checklist**: Assesses behavioral urgency, remote software requests (AnyDesk), and credentials harvesting.

---

## 5. False Negatives / False Positives Audit

${failureCases.length === 0 ? '✅ All 64 benchmark scenarios passed criteria without critical classification failures.' : failureCases.map(f => `- **Test #${f.id} (${f.desc})**: Expected ${f.expected}, but scored ${f.gotScore} (${f.gotVerdict})`).join('\n')}

---

## 6. Recommendations & Model Upgrades
- Maintain regular hash updates for trending BISP / Ramadan / Eid relief scams.
- Keep strict PII redaction on all community submissions.
- Always display the mandatory guidance disclaimer below every result.
`;

  fs.writeFileSync(path.join(process.cwd(), 'test_report.md'), reportContent, 'utf-8');
  console.log('✅ Generated test_report.md successfully!');
}

runBenchmark().catch(console.error);
