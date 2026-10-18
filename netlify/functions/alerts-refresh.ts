import { Handler } from '@netlify/functions';
import { getPakistanThreatAlerts, refreshThreatAlerts } from '../../src/server/alertsService';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    await refreshThreatAlerts();
    const data = await getPakistanThreatAlerts();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, ...data }),
    };
  } catch (error) {
    console.error('Refresh failed:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Refresh failed' }),
    };
  }
};
