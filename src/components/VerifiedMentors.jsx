import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiCheck, FiStar, FiTrendingUp, FiUsers, FiDollarSign, FiExternalLink } from 'react-icons/fi'
import './VerifiedMentors.css'

const VerifiedMentors = () => {
  const navigate = useNavigate()
  const [mentorships, setMentorships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopMentorships()
  }, [])

  const fetchTopMentorships = async () => {
    try {
      setLoading(true)
      // This endpoint doesn't require auth for public display
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await axios.get(`${API_URL}/mentorships/top`)
      setMentorships(response.data.mentorships || [])
    } catch (error) {
      console.error('Failed to fetch top mentorships:', error)
      // If API fails, show empty state
      setMentorships([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="verified" className="verified-mentors">
      <div className="verified-mentors-container">
        <div className="section-header">
          <h2 className="section-title">Top Verified Mentors</h2>
          <p className="section-subtitle">
            Our top 3 mentorships ranked by success rate, ratings, payouts, and student results
          </p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : mentorships.length === 0 ? (
          <div className="empty-state">
            <p>No verified mentors available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mentors-grid">
            {mentorships.map((mentorship) => (
              <div key={mentorship.id} className="mentor-card">
                <div className="mentor-image-container">
                  {mentorship.image ? (
                    <img 
                      src={mentorship.image} 
                      alt={mentorship.mentor_name}
                      className="mentor-image"
                    />
                  ) : (
                    <div className="mentor-avatar-large">
                      <span>{mentorship.mentor_name?.charAt(0) || 'M'}</span>
                    </div>
                  )}
                  <div className="mentor-badge">
                    <FiCheck />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="mentor-content">
                  <h3 className="mentor-name">{mentorship.mentor_name}</h3>
                  <p className="mentor-specialty">{mentorship.specialty}</p>
                  {mentorship.membership_type && (
                    <div className="membership-type-badge">
                      {mentorship.membership_type === 'monthly' && 'Monthly'}
                      {mentorship.membership_type === 'lifetime' && 'Lifetime'}
                      {mentorship.membership_type === 'both' && 'Monthly & Lifetime'}
                    </div>
                  )}
                  {mentorship.description && (
                    <p className="mentor-description">{mentorship.description}</p>
                  )}
                  
                  <div className="mentor-metrics">
                    <div className="metric-item">
                      <FiStar />
                      <span>{mentorship.average_rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <div className="metric-item">
                      <FiTrendingUp />
                      <span>{mentorship.success_rate?.toFixed(1) || '0'}%</span>
                    </div>
                    <div className="metric-item">
                      <FiUsers />
                      <span>{mentorship.total_students || 0}</span>
                    </div>
                    <div className="metric-item">
                      <FiDollarSign />
                      <span>${(mentorship.total_payouts || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mentor-price">
                    <strong>
                      {mentorship.membership_type === 'monthly' && mentorship.monthly_price
                        ? `$${mentorship.monthly_price.toLocaleString()}/mo`
                        : mentorship.membership_type === 'lifetime' && mentorship.lifetime_price
                        ? `$${mentorship.lifetime_price.toLocaleString()}`
                        : mentorship.membership_type === 'both'
                        ? `$${mentorship.monthly_price?.toLocaleString() || '0'}/mo or $${mentorship.lifetime_price?.toLocaleString() || '0'}`
                        : `$${(mentorship.price || 0).toLocaleString()}`}
                    </strong>
                  </div>
                  
                  <button 
                    className="mentor-view-btn"
                    onClick={() => navigate(`/mentorship/${mentorship.id}`)}
                  >
                    View Full Profile
                    <FiExternalLink />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && mentorships.length > 0 && (
          <div className="verification-note">
            <p>
              <strong>Note:</strong> Rankings are calculated using a smart algorithm that considers 
              success rate (40%), ratings (25%), payouts (20%), and student count (15%). All mentors 
              have been verified through our rigorous verification process.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default VerifiedMentors
