import { Handler } from '@netlify/functions';
import { extractTextFromScreenshot } from '../../src/server/geminiService';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const { imageBase64, mimeType } = JSON.parse(event.body || '{}');
    if (!imageBase64) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Image data is required' }) };
    }
    const text = await extractTextFromScreenshot(imageBase64, mimeType || 'image/jpeg');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, text }),
    };
  } catch (error) {
    console.error('Error during OCR transcription:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Failed to transcribe screenshot' }),
    };
  }
};
