import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { Message, ChatResponse } from '../types'
import { sendMessage } from '../lib/api'

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { type: 'user', content: input }
    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response: ChatResponse = await sendMessage(input)
      const botMessage: Message = { type: 'bot', content: response.reply }
      setMessages((prevMessages: Message[]) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { type: 'bot', content: 'エラーが発生しました。もう一度お試しください。' }
      setMessages((prevMessages: Message[]) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.chatInterface}>
      <div className={styles.chatContainer}>
        {messages.map((message: Message, index: number) => (
          <div key={index} className={`${styles.message} ${styles[message.type]}`}>
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          className={styles.input}
          disabled={isLoading}
        />
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? '送信中...' : '送信'}
        </button>
      </form>
    </div>
  )
}

export default ChatInterface