import React from 'react'
import { useContacts } from '../contexts/ContactsProvider';
import { FaTrashAlt } from 'react-icons/fa'

export default function ContactList() {
  const { contacts, deleteContact } = useContacts();

  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.email} className="contact-item">
          <div className='avatar-name-container'>
            <div className='avatar'></div>
            <span>{contact.firstName}</span>
          </div>

          <div className='contact-item-buttons-container'>
            <button onClick={() => deleteContact(contact.email)} className="delete-button" >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
