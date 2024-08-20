export interface Message {
  type: 'user' | 'bot'
  content: string
}

export interface ChatResponse {
  reply: string
}