import React from 'react'

export default function NewContactModal({ closeModal }) {

  return (
    <>
      <button onClick={closeModal} className="modal-close" title="Close Modal">X</button>
      <h3>Create Contact</h3>
      <div className="modal-area">
        <div className='modal-body'>
          <form className='modal-form'>
            <div className="form-group" >
              <label>First Name</label>
              <input type="text" name="first_name" required />
            </div>
            <div className="form-group" >
              <label>Last Name</label>
              <input type="text" name="last_name" required />
            </div>
            <div className="form-group" >
              <label>Phone Number</label>
              <input type="text" name="phone_number" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" name="email" required />
            </div>
            <footer>
              <button className="primary">Create Contact</button>
              <button className="secondary" onClick={closeModal}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
