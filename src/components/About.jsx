import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About TradeGate</h2>
          <p className="section-subtitle">
            We're on a mission to clean up the trading mentorship industry
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>The Problem</h3>
            <p>
              The trading mentorship industry is flooded with fake mentors who promise the world 
              but don't actually trade or make money themselves. They profit from selling courses 
              and signals, not from trading. This creates a cycle of disappointment and financial loss 
              for aspiring traders.
            </p>

            <h3>Our Solution</h3>
            <p>
              TradeGate verifies that trading mentors actually make money through real payouts. 
              We ensure they trade what they teach, eliminating fraudsters and promoting only 
              legitimate mentors who have proven track records. Our rigorous verification process 
              protects the community and helps aspiring traders find mentors they can trust.
            </p>

            <h3>Our Mission</h3>
            <p>
              To create a trusted community where only verified, profitable trading mentors are 
              promoted. We aim to eliminate fake mentors from the industry by verifying their 
              actual trading performance and ensuring transparency in everything they teach.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Verified Mentors</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Fake Mentors</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Community Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
