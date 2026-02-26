import { FiShield, FiCheckCircle, FiTrendingUp, FiUsers, FiEye, FiLock } from 'react-icons/fi'
import './Features.css'

const Features = () => {
  const features = [
    {
      icon: <FiShield />,
      title: 'Rigorous Verification',
      description: 'Every mentor undergoes thorough verification of their trading performance and payouts.'
    },
    {
      icon: <FiCheckCircle />,
      title: 'Proven Track Records',
      description: 'Only mentors with verified profitable trading histories are promoted.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Real Trading Activity',
      description: 'We verify that mentors actually trade what they teach, not just sell courses.'
    },
    {
      icon: <FiUsers />,
      title: 'Community Protection',
      description: 'Our mission is to protect aspiring traders from fraud and disappointment.'
    },
    {
      icon: <FiEye />,
      title: 'Transparency',
      description: 'Complete transparency in verification processes and mentor qualifications.'
    },
    {
      icon: <FiLock />,
      title: 'Ongoing Monitoring',
      description: 'Verified mentors are continuously monitored to maintain their verified status.'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose TradeGate</h2>
          <p className="section-subtitle">
            We set the standard for verified trading mentorship
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
