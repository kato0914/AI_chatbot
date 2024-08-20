import { IncomingMessage, ServerResponse } from 'http';

export interface VercelRequest extends IncomingMessage {
  query: { [key: string]: string | string[] };
  cookies: { [key: string]: string };
  body: any;
}

export interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => this;
  send: (body: any) => this;
  json: (jsonBody: any) => this;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'AI Chatbot' } = req.query;
  
  if (req.method === 'GET') {
    res.status(200).send(`Hello, ${name}!`);
  } else {
    res.status(405).send('Method not allowed');
  }
}