import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { FiPlus, FiEdit, FiPause, FiPlay, FiTrash2, FiX, FiCheck, FiMessageSquare, FiStar, FiUsers, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import './AdminPanel.css'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('mentorships') // mentorships, pending, users
  const [mentorships, setMentorships] = useState([])
  const [pendingMentorships, setPendingMentorships] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMentorship, setEditingMentorship] = useState(null)
  const [formData, setFormData] = useState({
    mentor_name: '',
    specialty: '',
    price: '',
    monthly_price: '',
    lifetime_price: '',
    membership_type: 'both',
    description: '',
    status: 'active',
    total_students: '',
    average_rating: '',
    success_rate: '',
    total_payouts: '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedMentorship, setSelectedMentorship] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [showTestimonialsModal, setShowTestimonialsModal] = useState(false)
  const [testimonialForm, setTestimonialForm] = useState({
    student_name: '',
    screenshots: [] // Array of base64 images
  })
  const [screenshotPreviews, setScreenshotPreviews] = useState([])
  const [editingTestimonial, setEditingTestimonial] = useState(null)

  useEffect(() => {
    fetchMentorships()
    fetchPendingMentorships()
  }, [])

  const fetchMentorships = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/admin/mentorships')
      setMentorships(response.data.mentorships || [])
    } catch (error) {
      console.error('Failed to fetch mentorships:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPendingMentorships = async () => {
    try {
      const response = await axios.get('/admin/mentorships/pending')
      setPendingMentorships(response.data.mentorships || [])
    } catch (error) {
      console.error('Failed to fetch pending mentorships:', error)
    }
  }

  const handleApproveMentorship = async (id) => {
    try {
      await axios.post(`/admin/mentorships/${id}/approve`)
      fetchPendingMentorships()
      fetchMentorships()
      alert('Mentorship approved successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to approve mentorship')
    }
  }

  const handleRejectMentorship = async (id) => {
    if (!window.confirm('Are you sure you want to reject this mentorship?')) {
      return
    }
    try {
      await axios.post(`/admin/mentorships/${id}/reject`)
      fetchPendingMentorships()
      fetchMentorships()
      alert('Mentorship rejected')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reject mentorship')
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({
          ...formData,
          image: base64String
        })
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddMentorship = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/admin/mentorships', formData)
      setShowAddForm(false)
      setFormData({
        mentor_name: '',
        specialty: '',
        price: '',
        monthly_price: '',
        lifetime_price: '',
        membership_type: 'both',
        description: '',
        status: 'active',
        total_students: '',
        average_rating: '',
        success_rate: '',
        total_payouts: '',
        image: ''
      })
      setImagePreview(null)
      fetchMentorships()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add mentorship')
    }
  }

  const handleUpdateMentorship = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/admin/mentorships/${editingMentorship.id}`, formData)
      setEditingMentorship(null)
      setFormData({
        mentor_name: '',
        specialty: '',
        price: '',
        monthly_price: '',
        lifetime_price: '',
        membership_type: 'both',
        description: '',
        status: 'active',
        total_students: '',
        average_rating: '',
        success_rate: '',
        total_payouts: '',
        image: ''
      })
      setImagePreview(null)
      fetchMentorships()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update mentorship')
    }
  }

  const handleEdit = (mentorship) => {
    setEditingMentorship(mentorship)
    setFormData({
      mentor_name: mentorship.mentor_name || '',
      specialty: mentorship.specialty || '',
      price: mentorship.price || '',
      monthly_price: mentorship.monthly_price || '',
      lifetime_price: mentorship.lifetime_price || '',
      membership_type: mentorship.membership_type || 'both',
      description: mentorship.description || '',
      status: mentorship.status || 'active',
      total_students: mentorship.total_students || '',
      average_rating: mentorship.average_rating || '',
      success_rate: mentorship.success_rate || '',
      total_payouts: mentorship.total_payouts || '',
      image: mentorship.image || ''
    })
    setImagePreview(mentorship.image || null)
    setShowAddForm(false)
  }

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'
    try {
      await axios.patch(`/admin/mentorships/${id}/status`, { status: newStatus })
      fetchMentorships()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mentorship? This action cannot be undone.')) {
      return
    }
    try {
      await axios.delete(`/admin/mentorships/${id}`)
      fetchMentorships()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete mentorship')
    }
  }

  const handleManageTestimonials = async (mentorship) => {
    setSelectedMentorship(mentorship)
    setShowTestimonialsModal(true)
    try {
      const response = await axios.get(`/mentorships/${mentorship.id}/testimonials`)
      setTestimonials(response.data.testimonials || [])
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
      setTestimonials([])
    }
  }

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`)
        return false
      }
      return true
    })

    // Convert to base64
    const promises = validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(promises).then(base64Images => {
      const newScreenshots = [...testimonialForm.screenshots, ...base64Images]
      setTestimonialForm({ ...testimonialForm, screenshots: newScreenshots })
      setScreenshotPreviews(newScreenshots)
    })
  }

  const handleRemoveScreenshot = (index) => {
    const newScreenshots = testimonialForm.screenshots.filter((_, i) => i !== index)
    setTestimonialForm({ ...testimonialForm, screenshots: newScreenshots })
    setScreenshotPreviews(newScreenshots)
  }

  const handleAddTestimonial = async (e) => {
    e.preventDefault()
    if (!selectedMentorship) return

    // Validate minimum 3 screenshots
    if (testimonialForm.screenshots.length < 3) {
      alert('Please upload at least 3 screenshots')
      return
    }

    if (!testimonialForm.student_name.trim()) {
      alert('Please enter a student name')
      return
    }
    
    try {
      // Create a testimonial for each screenshot
      const promises = testimonialForm.screenshots.map(screenshot => {
        const data = {
          student_name: testimonialForm.student_name,
          screenshot: screenshot
        }
        if (editingTestimonial) {
          return axios.put(`/admin/testimonials/${editingTestimonial.id}`, data)
        } else {
          return axios.post(`/admin/mentorships/${selectedMentorship.id}/testimonials`, data)
        }
      })

      await Promise.all(promises)
      setTestimonialForm({ student_name: '', screenshots: [] })
      setScreenshotPreviews([])
      setEditingTestimonial(null)
      // Refresh testimonials
      const response = await axios.get(`/mentorships/${selectedMentorship.id}/testimonials`)
      setTestimonials(response.data.testimonials || [])
    } catch (error) {
      console.error('Testimonial error:', error)
      alert(error.response?.data?.message || 'Failed to save testimonials')
    }
  }

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial)
    setTestimonialForm({
      student_name: testimonial.student_name,
      screenshots: testimonial.screenshot ? [testimonial.screenshot] : []
    })
    setScreenshotPreviews(testimonial.screenshot ? [testimonial.screenshot] : [])
  }

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return
    }
    try {
      await axios.delete(`/admin/testimonials/${id}`)
      const response = await axios.get(`/mentorships/${selectedMentorship.id}/testimonials`)
      setTestimonials(response.data.testimonials || [])
    } catch (error) {
      console.error('Delete testimonial error:', error)
      alert(error.response?.data?.message || 'Failed to delete testimonial')
    }
  }

  const closeTestimonialsModal = () => {
    setShowTestimonialsModal(false)
    setSelectedMentorship(null)
    setTestimonials([])
    setTestimonialForm({ student_name: '', screenshots: [] })
    setScreenshotPreviews([])
    setEditingTestimonial(null)
  }

  const cancelForm = () => {
    setShowAddForm(false)
    setEditingMentorship(null)
    setFormData({
      mentor_name: '',
      specialty: '',
      price: '',
      description: '',
      status: 'active'
    })
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage verified mentorships and users</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'mentorships' ? 'active' : ''}`}
          onClick={() => setActiveTab('mentorships')}
        >
          All Mentorships
        </button>
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <FiClock />
          Pending Approval ({pendingMentorships.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers />
          User Management
        </button>
      </div>

      {activeTab === 'mentorships' && (
        <>
          <div className="admin-actions">
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              <FiPlus />
              Add New Mentorship
            </button>
          </div>

          {(showAddForm || editingMentorship) && (
        <div className="admin-form-modal">
          <div className="admin-form-card">
            <div className="form-header">
              <h2>{editingMentorship ? 'Edit Mentorship' : 'Add New Mentorship'}</h2>
              <button className="close-btn" onClick={cancelForm}>
                <FiX />
              </button>
            </div>
            <form onSubmit={editingMentorship ? handleUpdateMentorship : handleAddMentorship}>
              <div className="form-group">
                <label>Mentor Name</label>
                <input
                  type="text"
                  name="mentor_name"
                  value={formData.mentor_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Membership Type</label>
                <select
                  name="membership_type"
                  value={formData.membership_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="monthly">Monthly Only</option>
                  <option value="lifetime">Lifetime Only</option>
                  <option value="both">Both Monthly & Lifetime</option>
                </select>
              </div>
              
              {formData.membership_type === 'monthly' || formData.membership_type === 'both' ? (
                <div className="form-group">
                  <label>Monthly Price ($)</label>
                  <input
                    type="number"
                    name="monthly_price"
                    value={formData.monthly_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              ) : null}
              
              {formData.membership_type === 'lifetime' || formData.membership_type === 'both' ? (
                <div className="form-group">
                  <label>Lifetime Price ($)</label>
                  <input
                    type="number"
                    name="lifetime_price"
                    value={formData.lifetime_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              ) : null}
              
              <div className="form-group">
                <label>Legacy Price ($) - Optional</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
                <p className="form-hint">For backwards compatibility</p>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mentor Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ marginBottom: '12px' }}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData({ ...formData, image: '' })
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
                <p className="form-hint">Upload an image for this mentorship (max 5MB, JPG/PNG)</p>
              </div>
              
              <div className="form-section-divider">
                <h3>Metrics & Analytics</h3>
                <p>Update mentorship performance metrics</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Total Students</label>
                  <input
                    type="number"
                    name="total_students"
                    value={formData.total_students}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Average Rating (0-5)</label>
                  <input
                    type="number"
                    name="average_rating"
                    value={formData.average_rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="0.0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Success Rate (%)</label>
                  <input
                    type="number"
                    name="success_rate"
                    value={formData.success_rate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Total Payouts ($)</label>
                  <input
                    type="number"
                    name="total_payouts"
                    value={formData.total_payouts}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={cancelForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiCheck />
                  {editingMentorship ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mentor</th>
                <th>Specialty</th>
                <th>Price</th>
                <th>Students</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentorships.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No mentorships found. Add one to get started.
                  </td>
                </tr>
              ) : (
                mentorships.map((mentorship) => (
                  <tr key={mentorship.id}>
                    <td>
                      <div className="mentor-cell">
                        <div className="mentor-avatar-small">
                          {mentorship.mentor_name?.charAt(0) || 'M'}
                        </div>
                        {mentorship.mentor_name}
                      </div>
                    </td>
                    <td>{mentorship.specialty}</td>
                    <td>${mentorship.price?.toLocaleString() || '0'}</td>
                    <td>{mentorship.total_students || 0}</td>
                    <td>{mentorship.average_rating?.toFixed(1) || '0.0'}</td>
                    <td>
                      <span className={`status-badge ${mentorship.status}`}>
                        {mentorship.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => handleEdit(mentorship)}
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="action-btn pause"
                          onClick={() => handleToggleStatus(mentorship.id, mentorship.status)}
                          title={mentorship.status === 'active' ? 'Pause' : 'Activate'}
                        >
                          {mentorship.status === 'active' ? <FiPause /> : <FiPlay />}
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(mentorship.id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          className="action-btn testimonials"
                          onClick={() => handleManageTestimonials(mentorship)}
                          title="Manage Testimonials"
                        >
                          <FiMessageSquare />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
        </>
      )}

      {activeTab === 'pending' && (
        <div className="pending-mentorships">
          <div className="pending-header">
            <h2>Pending Mentorships</h2>
            <p>Review and approve mentor-created mentorships</p>
          </div>
          {pendingMentorships.length === 0 ? (
            <div className="empty-state">
              <p>No pending mentorships</p>
            </div>
          ) : (
            <div className="pending-grid">
              {pendingMentorships.map((mentorship) => (
                <div key={mentorship.id} className="pending-card">
                  <div className="pending-card-header">
                    <h3>{mentorship.mentor_name}</h3>
                    <span className="status-badge pending">Pending</span>
                  </div>
                  <p className="pending-specialty">{mentorship.specialty}</p>
                  <p className="pending-description">{mentorship.description?.substring(0, 150)}...</p>
                  <div className="pending-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => handleApproveMentorship(mentorship.id)}
                    >
                      <FiCheckCircle />
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRejectMentorship(mentorship.id)}
                    >
                      <FiXCircle />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="user-management-embed">
          <p className="info-text">User management has been moved to a separate page. Click the "User Management" link in the navigation or go to /admin/users</p>
        </div>
      )}

      {showTestimonialsModal && selectedMentorship && (
        <div className="admin-form-modal">
          <div className="admin-form-card testimonials-modal">
            <div className="form-header">
              <h2>Manage Testimonials - {selectedMentorship.mentor_name}</h2>
              <button className="close-btn" onClick={closeTestimonialsModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleAddTestimonial} className="testimonial-form">
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  value={testimonialForm.student_name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, student_name: e.target.value })}
                  required
                  placeholder="Student's name"
                />
              </div>
              <div className="form-group">
                <label>Screenshots (Minimum 3 required)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshotChange}
                  style={{ marginBottom: '12px' }}
                />
                <p className="form-hint">
                  Upload at least 3 screenshots. Current: {testimonialForm.screenshots.length} / 3 minimum
                </p>
                {testimonialForm.screenshots.length > 0 && (
                  <div className="screenshots-preview-grid">
                    {testimonialForm.screenshots.map((screenshot, index) => (
                      <div key={index} className="screenshot-preview-item">
                        <img src={screenshot} alt={`Screenshot ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-screenshot-btn"
                          onClick={() => handleRemoveScreenshot(index)}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="form-actions">
                {editingTestimonial && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingTestimonial(null)
                      setTestimonialForm({ student_name: '', screenshots: [] })
                      setScreenshotPreviews([])
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={testimonialForm.screenshots.length < 3 || !testimonialForm.student_name.trim()}
                >
                  <FiCheck />
                  {editingTestimonial ? 'Update Testimonials' : 'Add Testimonials'}
                </button>
              </div>
            </form>

            <div className="testimonials-list">
              <h3>Existing Testimonials ({testimonials.length})</h3>
              {testimonials.length === 0 ? (
                <p className="empty-state">No testimonials yet. Add one above.</p>
              ) : (
                <div className="testimonials-grid-admin">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-item-admin">
                      <div className="testimonial-item-header">
                        <div>
                          <strong>{testimonial.student_name}</strong>
                          {testimonial.created_at && (
                            <small>{new Date(testimonial.created_at).toLocaleDateString()}</small>
                          )}
                        </div>
                        <div className="testimonial-actions">
                          <button
                            className="action-btn edit"
                            onClick={() => handleEditTestimonial(testimonial)}
                            title="Edit"
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      {testimonial.screenshot && (
                        <div className="testimonial-screenshot">
                          <img src={testimonial.screenshot} alt="Testimonial screenshot" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
