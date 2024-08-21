const API_URL = process.env.API_URL || 'https://api.cloudflare.com/client/v4';

export async function sendMessage(message: string) {
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}