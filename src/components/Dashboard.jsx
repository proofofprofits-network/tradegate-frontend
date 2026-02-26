import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiTrendingUp, FiDollarSign, FiUsers, FiStar, FiBarChart2, FiSettings } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [mentorships, setMentorships] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('popularity') // popularity, price, results, payouts

  useEffect(() => {
    fetchMentorships()
  }, [sortBy])

  const fetchMentorships = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/mentorships?sort_by=${sortBy}`)
      setMentorships(response.data.mentorships || [])
    } catch (error) {
      console.error('Failed to fetch mentorships:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case 'popularity': return 'Most Popular'
      case 'price': return 'Best Price'
      case 'results': return 'Best Results'
      case 'payouts': return 'Highest Payouts'
      default: return 'Most Popular'
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p>Discover the best verified trading mentorships</p>
        </div>
        <Link to="/settings" className="settings-link">
          <FiSettings />
          Settings
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            <FiUsers />
          </div>
          <div className="stat-content">
            <div className="stat-value">{mentorships.length}</div>
            <div className="stat-label">Verified Mentors</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {mentorships.reduce((sum, m) => sum + (m.total_students || 0), 0)}
            </div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              ${mentorships.reduce((sum, m) => sum + (m.total_payouts || 0), 0).toLocaleString()}
            </div>
            <div className="stat-label">Total Payouts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <FiStar />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {mentorships.length > 0 
                ? (mentorships.reduce((sum, m) => sum + (m.average_rating || 0), 0) / mentorships.length).toFixed(1)
                : '0.0'}
            </div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </div>

      <div className="dashboard-controls">
        <h2>Top Mentorships - {getSortLabel()}</h2>
        <div className="sort-options">
          <button
            className={`sort-btn ${sortBy === 'popularity' ? 'active' : ''}`}
            onClick={() => setSortBy('popularity')}
          >
            <FiBarChart2 /> Popularity
          </button>
          <button
            className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
            onClick={() => setSortBy('price')}
          >
            <FiDollarSign /> Price
          </button>
          <button
            className={`sort-btn ${sortBy === 'results' ? 'active' : ''}`}
            onClick={() => setSortBy('results')}
          >
            <FiTrendingUp /> Results
          </button>
          <button
            className={`sort-btn ${sortBy === 'payouts' ? 'active' : ''}`}
            onClick={() => setSortBy('payouts')}
          >
            <FiDollarSign /> Payouts
          </button>
        </div>
      </div>

      {isAdmin() && (
        <div className="admin-banner">
          <Link to="/admin" className="admin-link">
            <FiSettings />
            Admin Panel
          </Link>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="mentorships-grid">
          {mentorships.length === 0 ? (
            <div className="empty-state">
              <p>No mentorships available yet. Check back soon!</p>
            </div>
          ) : (
            mentorships.map((mentorship) => (
              <div key={mentorship.id} className="mentorship-card">
                <div className="mentorship-header">
                  {mentorship.image ? (
                    <img 
                      src={mentorship.image} 
                      alt={mentorship.mentor_name}
                      className="mentorship-image"
                    />
                  ) : (
                    <div className="mentor-avatar-large">
                      {mentorship.mentor_name?.charAt(0) || 'M'}
                    </div>
                  )}
                  <div className="mentorship-status">
                    {mentorship.status === 'active' ? (
                      <span className="status-badge active">Active</span>
                    ) : mentorship.status === 'paused' ? (
                      <span className="status-badge paused">Paused</span>
                    ) : (
                      <span className="status-badge inactive">Inactive</span>
                    )}
                  </div>
                </div>
                <h3 className="mentorship-name">{mentorship.mentor_name || 'Mentor'}</h3>
                <p className="mentorship-specialty">{mentorship.specialty || 'Trading Mentor'}</p>
                {mentorship.membership_type && (
                  <div className="membership-type-badge">
                    {mentorship.membership_type === 'monthly' && 'Monthly'}
                    {mentorship.membership_type === 'lifetime' && 'Lifetime'}
                    {mentorship.membership_type === 'both' && 'Monthly & Lifetime'}
                  </div>
                )}
                
                <div className="mentorship-metrics">
                  <div className="metric">
                    <FiDollarSign />
                    <span>
                      {mentorship.membership_type === 'monthly' && mentorship.monthly_price
                        ? `$${mentorship.monthly_price.toLocaleString()}/mo`
                        : mentorship.membership_type === 'lifetime' && mentorship.lifetime_price
                        ? `$${mentorship.lifetime_price.toLocaleString()}`
                        : mentorship.membership_type === 'both'
                        ? `$${mentorship.monthly_price?.toLocaleString() || '0'}/mo or $${mentorship.lifetime_price?.toLocaleString() || '0'}`
                        : `$${mentorship.price?.toLocaleString() || '0'}`}
                    </span>
                  </div>
                  <div className="metric">
                    <FiUsers />
                    <span>{mentorship.total_students || 0} students</span>
                  </div>
                  <div className="metric">
                    <FiStar />
                    <span>{mentorship.average_rating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <div className="metric">
                    <FiTrendingUp />
                    <span>${mentorship.total_payouts?.toLocaleString() || '0'}</span>
                  </div>
                </div>

                <div className="mentorship-footer">
                  <div className="success-rate">
                    <strong>Success Rate:</strong> {mentorship.success_rate || 0}%
                  </div>
                  <button 
                    className="view-btn"
                    onClick={() => navigate(`/mentorship/${mentorship.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard
