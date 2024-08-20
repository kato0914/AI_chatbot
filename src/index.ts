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

  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch DNS records');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) { // 'error' の型を 'any' に指定
    res.status(500).json({ error: error.message });
  }
}