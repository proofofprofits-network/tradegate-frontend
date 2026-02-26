import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { FiPlus, FiEdit, FiTrash2, FiX, FiCheck, FiClock, FiImage } from 'react-icons/fi'
import './MentorPanel.css'

const MentorPanel = () => {
  const { user } = useAuth()
  const [mentorships, setMentorships] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMentorship, setEditingMentorship] = useState(null)
  const [formData, setFormData] = useState({
    mentor_name: '',
    specialty: '',
    monthly_price: '',
    lifetime_price: '',
    membership_type: 'both',
    description: '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    fetchMentorships()
  }, [])

  const fetchMentorships = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/mentor/mentorships')
      setMentorships(response.data.mentorships || [])
    } catch (error) {
      console.error('Failed to fetch mentorships:', error)
    } finally {
      setLoading(false)
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
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/mentor/mentorships', formData)
      setShowAddForm(false)
      setFormData({
        mentor_name: '',
        specialty: '',
        monthly_price: '',
        lifetime_price: '',
        membership_type: 'both',
        description: '',
        image: ''
      })
      setImagePreview(null)
      fetchMentorships()
      alert('Mentorship created! It will be reviewed by an admin before going live.')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create mentorship')
    }
  }

  const handleEdit = (mentorship) => {
    setEditingMentorship(mentorship.id)
    setFormData({
      mentor_name: mentorship.mentor_name || '',
      specialty: mentorship.specialty || '',
      monthly_price: mentorship.monthly_price || '',
      lifetime_price: mentorship.lifetime_price || '',
      membership_type: mentorship.membership_type || 'both',
      description: mentorship.description || '',
      image: mentorship.image || ''
    })
    setImagePreview(mentorship.image || null)
    setShowAddForm(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/mentor/mentorships/${editingMentorship}`, formData)
      setShowAddForm(false)
      setEditingMentorship(null)
      setFormData({
        mentor_name: '',
        specialty: '',
        monthly_price: '',
        lifetime_price: '',
        membership_type: 'both',
        description: '',
        image: ''
      })
      setImagePreview(null)
      fetchMentorships()
      alert('Mentorship updated! Changes require admin re-approval.')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update mentorship')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mentorship? This will also delete all associated testimonials.')) {
      return
    }
    try {
      await axios.delete(`/mentor/mentorships/${id}`)
      fetchMentorships()
      alert('Mentorship deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete mentorship')
    }
  }

  const handleAddTestimonial = async (mentorshipId) => {
    const studentName = prompt('Enter student name:')
    if (!studentName) return

    const screenshot = prompt('Enter screenshot (base64 image data URL) or leave empty to add later:')
    
    try {
      await axios.post(`/mentor/mentorships/${mentorshipId}/testimonials`, {
        student_name: studentName,
        screenshot: screenshot || ''
      })
      alert('Testimonial added successfully!')
      fetchMentorships()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add testimonial')
    }
  }

  const getStatusBadge = (status, approvalStatus) => {
    if (approvalStatus === 'pending') {
      return <span className="status-badge pending"><FiClock /> Pending Approval</span>
    } else if (approvalStatus === 'approved' && status === 'active') {
      return <span className="status-badge active"><FiCheck /> Active</span>
    } else if (approvalStatus === 'rejected') {
      return <span className="status-badge rejected">Rejected</span>
    } else {
      return <span className="status-badge paused">Paused</span>
    }
  }

  return (
    <div className="mentor-panel">
      <div className="mentor-header">
        <h1>My Mentorships</h1>
        <p>Create and manage your mentorships. All submissions require admin approval.</p>
      </div>

      <div className="mentor-actions">
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          <FiPlus />
          Create New Mentorship
        </button>
      </div>

      {showAddForm && (
        <div className="mentor-form-modal">
          <div className="mentor-form-card">
            <div className="form-header">
              <h2>{editingMentorship ? 'Edit Mentorship' : 'Create Mentorship'}</h2>
              <button className="close-btn" onClick={() => {
                setShowAddForm(false)
                setEditingMentorship(null)
                setFormData({
                  mentor_name: '',
                  specialty: '',
                  monthly_price: '',
                  lifetime_price: '',
                  membership_type: 'both',
                  description: '',
                  image: ''
                })
                setImagePreview(null)
              }}>
                <FiX />
              </button>
            </div>
            <form onSubmit={editingMentorship ? handleUpdate : handleSubmit}>
              <div className="form-group">
                <label>Mentor Name</label>
                <input
                  type="text"
                  name="mentor_name"
                  value={formData.mentor_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name or brand name"
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
                  placeholder="e.g., Forex Trading, Crypto, Stocks"
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
                  <option value="both">Both Monthly & Lifetime</option>
                  <option value="monthly">Monthly Only</option>
                  <option value="lifetime">Lifetime Only</option>
                </select>
              </div>
              {(formData.membership_type === 'monthly' || formData.membership_type === 'both') && (
                <div className="form-group">
                  <label>Monthly Price ($)</label>
                  <input
                    type="number"
                    name="monthly_price"
                    value={formData.monthly_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              )}
              {(formData.membership_type === 'lifetime' || formData.membership_type === 'both') && (
                <div className="form-group">
                  <label>Lifetime Price ($)</label>
                  <input
                    type="number"
                    name="lifetime_price"
                    value={formData.lifetime_price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  placeholder="Describe your mentorship program..."
                />
              </div>
              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowAddForm(false)
                  setEditingMentorship(null)
                  setFormData({
                    mentor_name: '',
                    specialty: '',
                    monthly_price: '',
                    lifetime_price: '',
                    membership_type: 'both',
                    description: '',
                    image: ''
                  })
                  setImagePreview(null)
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiCheck />
                  {editingMentorship ? 'Update Mentorship' : 'Submit for Approval'}
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
        <div className="mentorships-grid">
          {mentorships.length === 0 ? (
            <div className="empty-state">
              <p>You haven't created any mentorships yet. Create one to get started!</p>
            </div>
          ) : (
            mentorships.map((mentorship) => (
              <div key={mentorship.id} className="mentorship-card">
                {mentorship.image ? (
                  <img src={mentorship.image} alt={mentorship.mentor_name} className="mentorship-image" />
                ) : (
                  <div className="mentor-avatar-large">
                    {mentorship.mentor_name?.charAt(0) || 'M'}
                  </div>
                )}
                <div className="mentorship-info">
                  <h3>{mentorship.mentor_name}</h3>
                  <p className="specialty">{mentorship.specialty}</p>
                  {getStatusBadge(mentorship.status, mentorship.approval_status)}
                  <p className="description">{mentorship.description?.substring(0, 100)}...</p>
                  <div className="mentorship-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(mentorship)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="action-btn testimonial"
                      onClick={() => handleAddTestimonial(mentorship.id)}
                      title="Add Testimonial"
                    >
                      <FiImage />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(mentorship.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default MentorPanel
