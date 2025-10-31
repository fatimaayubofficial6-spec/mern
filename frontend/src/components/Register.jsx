import { useState } from 'react'
import axios from 'axios'

function Register({ onRegister, onToggle }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password
      })
      onRegister(response.data.token, response.data.user)
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            minLength={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onToggle}>
          Already have an account? Login
        </button>
      </form>
    </div>
  )
}

export default Register
