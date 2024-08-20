import type { NextApiRequest, NextApiResponse } from 'next'
import { sendMessage } from '../../lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body
    try {
      const response = await sendMessage(message)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).end()
  }
}