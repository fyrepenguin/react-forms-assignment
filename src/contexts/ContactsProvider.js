import React, { useContext, useState } from 'react'
import { useAuth } from './AuthProvider';
import contactsData from '../data/contacts.json';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const auth = useAuth()
  const [contacts, setContacts] = useState([{ firstName: 'You', email: auth.email }, ...contactsData])

  function createContact({ email, firstName, lastName, phoneNumber }) {
    setContacts(prevContacts => {
      return [...prevContacts, { email, firstName, lastName, phoneNumber }]
    })
  }
  function deleteContact(email) {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.email !== email)
    })
  }

  function updateContact(email, firstName, lastName, phoneNumber) {
    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        if (contact.email === email) {
          return { ...contact, firstName, lastName, phoneNumber }
        }
        return contact
      })
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact, deleteContact, updateContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
