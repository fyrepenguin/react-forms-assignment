import React from 'react'
import { useChats } from '../contexts/ChatsProvider';
import { FaTrashAlt } from 'react-icons/fa';

export default function ChatList() {
  const { chats, selectChatIndex, deleteChat } = useChats()




  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index} className={`chat-item ${chat.selected ? 'active' : ''}`} >
          <div className='avatar-name-container' onClick={() => selectChatIndex(index)}>
            <div className='avatar'></div>
            <span>{chat.recipients.map(r => r.firstName).join(', ')}</span>
          </div>

          <div className='chat-item-buttons-container'>
            <button onClick={() => deleteChat(index)} className="delete-button" >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
