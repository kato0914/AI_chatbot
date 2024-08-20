import { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.API_KEY; // 環境変数からAPIキーを取得

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const apiKey = req.headers.authorization;

  if (apiKey !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name = 'AI Chatbot' } = req.query;

  if (req.method === 'GET') {
    res.status(200).json({ message: `Hello, ${name}!` });
  } else {
    res.status(405).send('Method not allowed');
  }
}