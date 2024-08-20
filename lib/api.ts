const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export async function sendMessage() {
  try {
    const response = await fetch('https://ai-chatbot-dw16.vercel.app/api/chat');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}