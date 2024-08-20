import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
// 'node-fetch' の型宣言を追加
declare module 'node-fetch';

const CLOUDFLARE_API_KEY = process.env.CLOUDFLARE_API_KEY;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID; // 必要に応じてゾーンIDも環境変数として設定

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'POST') {
    const { message } = req.body;
    res.status(200).json({ reply: `You said: ${message}` });
  } else {
    res.status(405).send('Method not allowed');
  }
}