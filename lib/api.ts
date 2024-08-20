const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'

export async function sendMessage(message: string): Promise<{ reply: string }> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error('API request failed')
  }

  return response.json()
}