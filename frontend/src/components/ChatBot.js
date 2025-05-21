// src/components/ChatBot.js
import { useState } from 'react'

const ChatBot = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      setResponse(data.reply)
    } catch (error) {
      setResponse('Something went wrong.')
    }

    setLoading(false)
  }

  return (
    <div className="chatbot">
      <h2>AI ChatBot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
      {response && (
        <div className="chat-response">
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  )
}

export default ChatBot
