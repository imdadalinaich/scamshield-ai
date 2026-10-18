import { Handler } from '@netlify/functions';
import { generateChatbotReply } from '../../src/server/geminiService';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { message, history } = JSON.parse(event.body || '{}');
    if (!message || typeof message !== 'string') {
        return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Message is required' }) };
    }
    const trimmed = message.slice(0, 1000);
    const reply = await generateChatbotReply(trimmed, history || []);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, reply }),
    };
  } catch (error) {
    console.error('Error in chatbot:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'ShieldBot is temporarily unavailable' }),
    };
  }
};
