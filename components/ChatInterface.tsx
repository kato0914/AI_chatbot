import React, { useState } from 'react';
import { sendMessage } from '../lib/api';

const ChatInterface = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await sendMessage();
      console.log(response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInterface;