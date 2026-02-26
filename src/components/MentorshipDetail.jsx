import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { 
  FiArrowLeft, 
  FiStar, 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiCheck,
  FiClock,
  FiBarChart2
} from 'react-icons/fi'
import './MentorshipDetail.css'

const MentorshipDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [mentorship, setMentorship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMentorship()
  }, [id])

  const fetchMentorship = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Try to get from public endpoint first
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      try {
        const response = await axios.get(`${API_URL}/mentorships/${id}`)
        setMentorship(response.data.mentorship)
      } catch (publicErr) {
        // If public endpoint fails and user is authenticated, try admin endpoint
        if (isAuthenticated) {
          const adminResponse = await axios.get('/admin/mentorships')
          const found = adminResponse.data.mentorships.find(m => m.id === parseInt(id))
          if (found) {
            setMentorship(found)
          } else {
            setError('Mentorship not found')
          }
        } else {
          setError('Mentorship not found')
        }
      }
    } catch (err) {
      console.error('Failed to fetch mentorship:', err)
      setError('Failed to load mentorship details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mentorship-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  if (error || !mentorship) {
    return (
      <div className="mentorship-detail">
        <div className="error-container">
          <h2>Mentorship Not Found</h2>
          <p>{error || 'The mentorship you are looking for does not exist.'}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mentorship-detail">
      <div className="detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft />
          Back
        </button>

        <div className="detail-header">
          <div className="detail-image-section">
            {mentorship.image ? (
              <img 
                src={mentorship.image} 
                alt={mentorship.mentor_name}
                className="detail-image"
              />
            ) : (
              <div className="detail-avatar">
                <span>{mentorship.mentor_name?.charAt(0) || 'M'}</span>
              </div>
            )}
            <div className="detail-badge">
              <FiCheck />
              <span>Verified</span>
            </div>
          </div>

          <div className="detail-info">
            <h1 className="detail-name">{mentorship.mentor_name}</h1>
            <p className="detail-specialty">{mentorship.specialty}</p>
            {mentorship.membership_type && (
              <div className="detail-membership-badge">
                {mentorship.membership_type === 'monthly' && 'Monthly Membership'}
                {mentorship.membership_type === 'lifetime' && 'Lifetime Membership'}
                {mentorship.membership_type === 'both' && 'Monthly & Lifetime Available'}
              </div>
            )}
            <div className="detail-status">
              <span className={`status-badge ${mentorship.status}`}>
                {mentorship.status}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <div className="detail-section">
              <h2>About</h2>
              <p className="detail-description">
                {mentorship.description || 'No description available for this mentorship.'}
              </p>
            </div>

            <div className="detail-section">
              <h2>Performance Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon">
                    <FiStar />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{mentorship.average_rating?.toFixed(1) || '0.0'}</div>
                    <div className="metric-label">Average Rating</div>
                    <div className="metric-subtext">Out of 5.0 stars</div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{mentorship.success_rate?.toFixed(1) || '0'}%</div>
                    <div className="metric-label">Success Rate</div>
                    <div className="metric-subtext">Student success percentage</div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <FiUsers />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">{mentorship.total_students || 0}</div>
                    <div className="metric-label">Total Students</div>
                    <div className="metric-subtext">Enrolled students</div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon">
                    <FiDollarSign />
                  </div>
                  <div className="metric-content">
                    <div className="metric-value">${(mentorship.total_payouts || 0).toLocaleString()}</div>
                    <div className="metric-label">Total Payouts</div>
                    <div className="metric-subtext">Verified earnings</div>
                  </div>
                </div>
              </div>
            </div>

            {mentorship.testimonials && mentorship.testimonials.length > 0 && (
              <div className="detail-section">
                <h2>Student Testimonials</h2>
                <div className="testimonials-grid">
                  {mentorship.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                      <div className="testimonial-header">
                        <div className="testimonial-avatar">
                          {testimonial.student_name?.charAt(0) || 'S'}
                        </div>
                        <div className="testimonial-info">
                          <div className="testimonial-name">{testimonial.student_name}</div>
                          {testimonial.created_at && (
                            <div className="testimonial-date">
                              {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                      {testimonial.screenshot && (
                        <div className="testimonial-screenshot">
                          <img src={testimonial.screenshot} alt={`Testimonial from ${testimonial.student_name}`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Pricing</h3>
              <div className="price-display">
                {mentorship.membership_type === 'monthly' && mentorship.monthly_price ? (
                  <>
                    <span className="price-amount">${mentorship.monthly_price.toLocaleString()}</span>
                    <span className="price-label">Per month</span>
                  </>
                ) : mentorship.membership_type === 'lifetime' && mentorship.lifetime_price ? (
                  <>
                    <span className="price-amount">${mentorship.lifetime_price.toLocaleString()}</span>
                    <span className="price-label">One-time payment</span>
                  </>
                ) : mentorship.membership_type === 'both' ? (
                  <div className="dual-pricing">
                    <div className="price-option">
                      <span className="price-amount">${(mentorship.monthly_price || 0).toLocaleString()}</span>
                      <span className="price-label">Per month</span>
                    </div>
                    <div className="price-divider">or</div>
                    <div className="price-option">
                      <span className="price-amount">${(mentorship.lifetime_price || 0).toLocaleString()}</span>
                      <span className="price-label">Lifetime access</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="price-amount">${(mentorship.price || 0).toLocaleString()}</span>
                    <span className="price-label">One-time fee</span>
                  </>
                )}
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Verification Status</h3>
              <div className="verification-info">
                <div className="verification-item">
                  <FiCheck />
                  <span>Payouts Verified</span>
                </div>
                <div className="verification-item">
                  <FiCheck />
                  <span>Trading Activity Confirmed</span>
                </div>
                <div className="verification-item">
                  <FiCheck />
                  <span>Performance Metrics Validated</span>
                </div>
              </div>
            </div>

            {mentorship.created_at && (
              <div className="sidebar-card">
                <h3>Member Since</h3>
                <div className="date-info">
                  <FiClock />
                  <span>{new Date(mentorship.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorshipDetail
