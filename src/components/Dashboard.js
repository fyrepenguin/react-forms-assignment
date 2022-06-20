import React from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useChats } from '../contexts/ChatsProvider';
import { useAuth } from '../contexts/AuthProvider';

export default function Dashboard() {
  const { selectedChat } = useChats()
  const auth = useAuth()

  return (
    <div className='dashboard'>
      <Sidebar email={auth.email} />
      {selectedChat && <Chat />}
    </div>
  )
}
