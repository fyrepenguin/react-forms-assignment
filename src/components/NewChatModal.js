import React, { useState } from 'react'
import { useChats } from '../contexts/ChatsProvider';
import { useContacts } from '../contexts/ContactsProvider';

export default function NewChatModal({ closeModal }) {
  const [selectedContactEmails, setSelectedContactEmails] = useState([])

  const { createChat } = useChats()
  const { contacts } = useContacts()


  function handleSubmit(e) {
    e.preventDefault()
    if (selectedContactEmails.length > 0) {
      createChat(selectedContactEmails)
      setSelectedContactEmails([])
    }
    e.target.reset()
    closeModal()
  }

  function handleCheckboxChange(contactEmail) {
    setSelectedContactEmails(prevSelectedContactEmails => {
      if (prevSelectedContactEmails.includes(contactEmail)) {
        return prevSelectedContactEmails.filter(prevEmail => {
          return contactEmail !== prevEmail
        })
      } else {
        return [...prevSelectedContactEmails, contactEmail]
      }
    })
  }

  return (
    <>
      <button onClick={closeModal} className="modal-close" title="Close Modal">X</button>
      <h3>Create Chat</h3>
      <div className="modal-area">
        <div className='modal-body'>
          <form onSubmit={handleSubmit} className='modal-form'>
            {contacts.map(contact => (
              <div controlId={contact.email} key={contact.email} className="form-group form-checkbox">
                <label htmlFor={contact.email}> <input
                  name="contact"
                  type="checkbox"
                  id={contact.email}
                  checked={selectedContactEmails.includes(contact.email)}
                  label={contact.firstName}
                  onChange={() => handleCheckboxChange(contact.email)}
                />
                  {contact.firstName}</label>
              </div>
            ))}
            <footer>
              <button className="primary" type="submit">Create Contact</button>
              <button className="secondary" onClick={closeModal}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
