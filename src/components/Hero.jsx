import { useTheme } from '../context/ThemeContext'
import { FiCheck, FiBarChart2, FiShield } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
  const { theme } = useTheme()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Verified Trading Mentors</span>
          </div>
          <h1 className="hero-title">
            Eliminating Fake Trading Mentors
            <span className="gradient-text"> One Verification at a Time</span>
          </h1>
          <p className="hero-description">
            TradeGate is dedicated to promoting only legitimate trading mentors who actually make money. 
            We verify that they receive payouts and trade what they teach, eliminating fraud from the industry.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('how-it-works')}
            >
              Learn More
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('verified')}
            >
              View Verified Mentors
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-icon">
              <FiCheck />
            </div>
            <h3>Verified</h3>
            <p>Real payouts confirmed</p>
          </div>
          <div className="hero-card">
            <div className="card-icon">
              <FiBarChart2 />
            </div>
            <h3>Transparent</h3>
            <p>They trade what they teach</p>
          </div>
          <div className="hero-card">
            <div className="card-icon">
              <FiShield />
            </div>
            <h3>Protected</h3>
            <p>Community-first approach</p>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Hero
