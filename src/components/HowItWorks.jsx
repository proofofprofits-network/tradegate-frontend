import './HowItWorks.css'

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Application Review',
      description: 'Mentors apply to be part of TradeGate, providing their trading history and credentials.'
    },
    {
      number: '02',
      title: 'Payout Verification',
      description: 'We verify that mentors actually receive payouts from their brokers, confirming real trading activity.'
    },
    {
      number: '03',
      title: 'Trading Verification',
      description: 'We ensure mentors trade what they teach, verifying their strategies match their educational content.'
    },
    {
      number: '04',
      title: 'Ongoing Monitoring',
      description: 'Verified mentors are continuously monitored to maintain their status and ensure continued legitimacy.'
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Our rigorous verification process ensures only legitimate mentors are promoted
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-arrow">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
