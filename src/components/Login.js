import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    auth.login(email, () => {
      navigate(from, { replace: true });
    });

  }

  function createNewEmail(e) {

    let formData = new FormData(e.currentTarget);
    let email = formData.get("email");
    auth.login(email, () => {
      navigate(from, { replace: true });
    });

  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className='login-form-container'>
        <div>
          <label>Enter Your Email</label>
          <input type="email" required name="email" />
        </div>
        <button type="submit" className="primary">Login</button>
        <button onClick={createNewEmail} className="secondary">Create A New Email</button>
      </form>
    </div>
  )
}
