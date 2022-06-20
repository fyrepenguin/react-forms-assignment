import React, { useCallback } from 'react'
import { useChats } from '../contexts/ChatsProvider';

export default function Chat() {
  const { selectedChat } = useChats()

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])


  return (
    <div className="chat-container">
      <div className='conversation-container'>
        <div>
          {selectedChat.messages.map((message, index) => {
            const lastMessage = selectedChat.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className="message-container"
                style={{ alignItems: message.fromMe ? 'end' : 'start', alignSelf: message.fromMe ? 'end' : 'initial', }}
              >
                <div
                  className="message-content"
                  style={{ background: message.fromMe ? '#007bff' : '#dee2e6', color: message.fromMe ? '#fff' : '#6c757d' }}
                >
                  {message.text}
                </div>
                <div className="message-sender"
                  style={{ textAlign: message.fromMe ? 'right' : 'initial' }}>

                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form className='message-input-container' >
        <div>
          <textarea
            required
            name="message"
          />
          <button type="submit" className='send-button'>Send</button>

        </div>
      </form>
    </div>
  )
}
