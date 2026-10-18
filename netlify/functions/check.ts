import { Handler } from '@netlify/functions';
import { analyzeScamWithSignals } from '../../src/server/geminiService';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const { category, input, callAnswers } = JSON.parse(event.body || '{}');
    if (!category) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Category is required' }) };
    }
    const sanitizedInput = (input || '').slice(0, 3000);
    const result = await analyzeScamWithSignals(category, sanitizedInput, callAnswers);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, result }),
    };
  } catch (error) {
    console.error('Error during scam check:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'An internal error occurred' }),
    };
  }
};
