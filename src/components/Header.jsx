import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { FiSun, FiMoon, FiMenu, FiX, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi'
import './Header.css'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">TradeGate</span>
        </Link>
        
        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {location.pathname === '/' ? (
            <>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works') }}>How It Works</a>
              <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a>
              <a href="#verified" onClick={(e) => { e.preventDefault(); scrollToSection('verified') }}>Verified Mentors</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                  {user?.role === 'admin' && (
                    <>
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
                      <Link to="/admin/users" onClick={() => setIsMobileMenuOpen(false)}>User Management</Link>
                    </>
                  )}
                  {user?.role === 'mentor' && (
                    <Link to="/mentor" onClick={() => setIsMobileMenuOpen(false)}>My Mentorships</Link>
                  )}
                  <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
                </>
              )}
            </>
          )}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="user-link">
                <FiUser />
                <span>{user?.name?.split(' ')[0]}</span>
              </Link>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                <FiLogOut />
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              <FiLogIn />
              <span>Login</span>
            </Link>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
