import { FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiGithub, FiMail } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FiTwitter />, name: 'Twitter', url: 'https://twitter.com/tradegate' },
    { icon: <FiInstagram />, name: 'Instagram', url: 'https://instagram.com/tradegate' },
    { icon: <FiLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com/company/tradegate' },
    { icon: <FiYoutube />, name: 'YouTube', url: 'https://youtube.com/@tradegate' },
    { icon: <FiGithub />, name: 'GitHub', url: 'https://github.com/tradegate' },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">TradeGate</h3>
            <p className="footer-description">
              Verifying legitimate trading mentors who actually make money and trade what they teach.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
              <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works') }}>How It Works</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a></li>
              <li><a href="#verified" onClick={(e) => { e.preventDefault(); scrollToSection('verified') }}>Verified Mentors</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact Us</a></li>
              <li><a href="mailto:mentors@tradegate.com">Apply as Mentor</a></li>
              <li><a href="#verification">Verification Process</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:contact@tradegate.com" className="footer-contact">
                  <FiMail />
                  contact@tradegate.com
                </a>
              </li>
              <li>
                <a href="mailto:mentors@tradegate.com" className="footer-contact">
                  <FiMail />
                  mentors@tradegate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} TradeGate. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
