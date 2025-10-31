import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
    } catch (error) {
      console.error('Error fetching user:', error)
      handleLogout()
    }
  }

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  if (token && user) {
    return <Dashboard user={user} token={token} onLogout={handleLogout} />
  }

  return (
    <div className="container">
      {showRegister ? (
        <Register 
          onRegister={handleLogin}
          onToggle={() => setShowRegister(false)}
        />
      ) : (
        <Login 
          onLogin={handleLogin}
          onToggle={() => setShowRegister(true)}
        />
      )}
    </div>
  )
}

export default App
