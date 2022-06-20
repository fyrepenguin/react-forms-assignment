import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { ContactsProvider } from './contexts/ContactsProvider'
import { ChatsProvider } from './contexts/ChatsProvider';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';
import './App.css'

function App() {
  return (<AuthProvider>
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <ContactsProvider >
                  <ChatsProvider >
                    <Dashboard />
                  </ChatsProvider>
                </ContactsProvider>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </div>
  </AuthProvider>)
}

export default App;
