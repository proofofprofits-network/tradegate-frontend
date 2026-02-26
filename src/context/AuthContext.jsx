import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Get API URL from environment or use relative path for production
const getApiUrl = () => {
  // Check if we're in production (Netlify)
  if (import.meta.env.VITE_API_URL) {
    const url = import.meta.env.VITE_API_URL
    console.log('🌐 Using API URL from environment:', url)
    return url
  }
  // Check if we're on a deployed domain (not localhost)
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    // On Netlify but no VITE_API_URL set - this is an error!
    console.error('❌ VITE_API_URL not set! Frontend will try to use relative paths which will fail.')
    console.error('💡 Set VITE_API_URL in Netlify environment variables!')
    // Still return empty to avoid breaking, but log the error
    return ''
  }
  // Default to localhost for local development
  return 'http://localhost:5000/api'
}

const API_URL = getApiUrl()
axios.defaults.baseURL = API_URL || '/api'

// Always log API URL for debugging (helps catch issues)
console.log('🔗 API Base URL:', axios.defaults.baseURL)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      })
      const { token: newToken, user: userData } = response.data
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password
      })
      const { token: newToken, user: userData } = response.data
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed'
      }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      isAdmin,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}
