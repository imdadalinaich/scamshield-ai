import { Handler } from '@netlify/functions';
import { getPakistanThreatAlerts } from '../../src/server/alertsService';

export const handler: Handler = async () => {
  try {
    const data = await getPakistanThreatAlerts();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, ...data }),
    };
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Failed to retrieve threat alerts' }),
    };
  }
};
