import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard({ user, token, onLogout }) {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setLoading(true)
    try {
      const response = await axios.post(
        '/api/todos',
        { text: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTodos([response.data, ...todos])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
      alert(error.response?.data?.message || 'Failed to add todo')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert(error.response?.data?.message || 'Failed to delete todo')
    }
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>
            Welcome, <span className="username">{user.username}</span>
          </h1>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-add" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <span className="todo-text">{todo.text}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
