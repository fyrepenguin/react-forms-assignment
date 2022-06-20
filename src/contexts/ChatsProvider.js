import React, { useContext, useState, useCallback } from 'react'
import { useContacts } from './ContactsProvider';
import { useAuth } from './AuthProvider';
import chatsData from '../data/chats.json';

const ChatsContext = React.createContext()

export function useChats() {
  return useContext(ChatsContext)
}

export function ChatsProvider({ children }) {
  const [chats, setChats] = useState(chatsData);
  const auth = useAuth();
  const [selectedChatIndex, setSelectedChatIndex] = useState(0)
  const { contacts } = useContacts()

  function createChat(recipients) {
    const chatAlreadyExists = chats.map(chat => arrayEquality(recipients, chat.recipients)).includes(true)

    !chatAlreadyExists && setChats(prevChats => {
      return [...prevChats, { recipients, messages: [] }]
    })
  }
  function deleteChat(index) {
    setChats(prevChats => {
      return prevChats.filter((_, i) => i !== index)
    })
  }

  const addMessageToChat = useCallback(({ recipients, text, sender }) => {
    setChats(prevChats => {
      let madeChange = false
      const newMessage = { sender, text }
      const newChats = prevChats.map(chat => {
        if (arrayEquality(chat.recipients, recipients)) {
          madeChange = true
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }

        return chat
      })

      if (madeChange) {
        return newChats
      } else {
        return [
          ...prevChats,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setChats])

  function sendMessage(recipients, text) {
    addMessageToChat({ recipients, text, sender: auth.email })
  }

  const formattedChats = chats.map((chat, index) => {
    const recipients = chat.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.email === recipient
      })
      const firstName = (contact && contact.firstName) || recipient
      return { email: recipient, firstName }
    })

    const messages = chat.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.email === message.sender
      })
      const firstName = (contact && contact.firstName) || message.sender
      const fromMe = auth.email === message.sender
      return { ...message, senderName: firstName, fromMe }
    })

    const selected = index === selectedChatIndex
    return { ...chat, messages, recipients, selected }
  })

  const value = {
    chats: formattedChats,
    selectedChat: formattedChats[selectedChatIndex],
    sendMessage,
    selectChatIndex: setSelectedChatIndex,
    createChat,
    deleteChat
  }

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}