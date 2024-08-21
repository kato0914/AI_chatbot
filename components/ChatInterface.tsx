import React, { useState } from 'react';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://your-worker.your-subdomain.workers.dev';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        mode: 'cors', // CORSモードを明示的に指定
      });

      if (!res.ok) {
        throw new Error(`Worker error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('エラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
      {response && <p>回答: {response}</p>}
    </div>
  );
};

export default ChatInterface;