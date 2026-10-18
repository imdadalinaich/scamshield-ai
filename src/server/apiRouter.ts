import express, { Request, Response } from 'express';
import { analyzeScamWithSignals, extractTextFromScreenshot, generateChatbotReply } from './geminiService';
import { ScamCategory } from '../lib/types';
import { CallChecklistAnswers } from '../lib/scam_rules';

export const apiRouter = express.Router();

// Simple in-memory rate limiter per IP: max 30 requests per 60 seconds
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function rateLimiter(req: Request, res: Response, next: () => void) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + 60000 });
    return next();
  }

  if (record.count >= 40) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.'
    });
    return;
  }

  record.count++;
  next();
}

apiRouter.use(rateLimiter);

import { getPakistanThreatAlerts, refreshThreatAlerts } from './alertsService';

// Health check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: '360 ScamShield AI',
    time: new Date().toISOString()
  });
});

// Live Pakistan Threat Alerts with 24h Grounded Cache
apiRouter.get('/alerts', async (_req: Request, res: Response) => {
  try {
    const data = await getPakistanThreatAlerts();
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve threat alerts' });
  }
});

// Optional manual refresh endpoint
apiRouter.post('/alerts/refresh', async (_req: Request, res: Response) => {
  try {
    await refreshThreatAlerts();
    const data = await getPakistanThreatAlerts();
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Refresh failed' });
  }
});

// Check scam message / scenario
apiRouter.post('/check', async (req: Request, res: Response) => {
  try {
    const { category, input, callAnswers } = req.body as {
      category: ScamCategory;
      input?: string;
      callAnswers?: CallChecklistAnswers;
    };

    if (!category) {
      res.status(400).json({ success: false, error: 'Category is required' });
      return;
    }

    const sanitizedInput = (input || '').slice(0, 3000);

    const result = await analyzeScamWithSignals(category, sanitizedInput, callAnswers);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error during scam check:', error);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing the check. Please try again.'
    });
  }
});

// Screenshot OCR
apiRouter.post('/ocr', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType } = req.body as { imageBase64: string; mimeType: string };
    if (!imageBase64) {
      res.status(400).json({ success: false, error: 'Image data is required' });
      return;
    }

    const text = await extractTextFromScreenshot(imageBase64, mimeType || 'image/jpeg');
    res.json({ success: true, text });
  } catch (error) {
    console.error('Error during OCR transcription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to transcribe screenshot. Please type or paste the message directly.'
    });
  }
});

// ShieldBot chat
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body as {
      message: string;
      history?: Array<{ sender: 'user' | 'bot'; text: string }>;
    };

    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, error: 'Message is required' });
      return;
    }

    const trimmed = message.slice(0, 1000);
    const reply = await generateChatbotReply(trimmed, history || []);
    res.json({ success: true, reply });
  } catch (error) {
    console.error('Error in chatbot:', error);
    res.status(500).json({
      success: false,
      error: 'ShieldBot is temporarily unavailable. Please try again shortly.'
    });
  }
});
