import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { FiUser, FiUserCheck, FiShield, FiArrowUp, FiArrowDown, FiTrash2, FiSearch, FiX } from 'react-icons/fi'
import './UserManagement.css'

const UserManagement = () => {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, user, mentor, admin
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/admin/users')
      setUsers(response.data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
      alert('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return
    }

    try {
      await axios.put(`/admin/users/${userId}/role`, { role: newRole })
      fetchUsers()
      alert(`User role updated to ${newRole}`)
    } catch (error) {
      console.error('Failed to update role:', error)
      alert(error.response?.data?.message || 'Failed to update user role')
    }
  }

  const handleCleanupDuplicates = async () => {
    if (!window.confirm('This will remove duplicate users based on email addresses. The oldest account for each email will be kept. Continue?')) {
      return
    }

    try {
      const response = await axios.post('/admin/users/cleanup')
      alert(response.data.message || 'Cleanup completed')
      fetchUsers()
    } catch (error) {
      console.error('Failed to cleanup duplicates:', error)
      alert(error.response?.data?.message || 'Failed to cleanup duplicate users')
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FiShield />
      case 'mentor':
        return <FiUserCheck />
      default:
        return <FiUser />
    }
  }

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'role-badge admin'
      case 'mentor':
        return 'role-badge mentor'
      default:
        return 'role-badge user'
    }
  }

  // Filter by role first
  const roleFilteredUsers = filter === 'all' 
    ? users 
    : users.filter(u => u.role === filter)

  // Then filter by search query (name or email)
  const filteredUsers = searchQuery.trim() === ''
    ? roleFilteredUsers
    : roleFilteredUsers.filter(user => {
        const query = searchQuery.toLowerCase().trim()
        const nameMatch = user.name?.toLowerCase().includes(query)
        const emailMatch = user.email?.toLowerCase().includes(query)
        return nameMatch || emailMatch
      })

  return (
    <div className="user-management">
      <div className="user-management-header">
        <div>
          <h1>User Management</h1>
          <p>Manage user roles and permissions</p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={handleCleanupDuplicates}
          title="Remove duplicate users (keeps oldest account for each email)"
        >
          <FiTrash2 />
          Clean Up Duplicates
        </button>
      </div>

      <div className="user-search-container">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="search-results-count">
            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="user-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Users ({users.length})
        </button>
        <button
          className={`filter-btn ${filter === 'user' ? 'active' : ''}`}
          onClick={() => setFilter('user')}
        >
          <FiUser /> Users ({users.filter(u => u.role === 'user').length})
        </button>
        <button
          className={`filter-btn ${filter === 'mentor' ? 'active' : ''}`}
          onClick={() => setFilter('mentor')}
        >
          <FiUserCheck /> Mentors ({users.filter(u => u.role === 'mentor').length})
        </button>
        <button
          className={`filter-btn ${filter === 'admin' ? 'active' : ''}`}
          onClick={() => setFilter('admin')}
        >
          <FiShield /> Admins ({users.filter(u => u.role === 'admin').length})
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {user.name?.charAt(0) || 'U'}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={getRoleBadgeClass(user.role)}>
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>
                      <div className="role-actions">
                        {user.id !== currentUser?.id && (
                          <>
                            {user.role !== 'user' && (
                              <button
                                className="action-btn upgrade"
                                onClick={() => handleRoleChange(user.id, 'user')}
                                title="Downgrade to User"
                              >
                                <FiArrowDown />
                                User
                              </button>
                            )}
                            {user.role !== 'mentor' && (
                              <button
                                className="action-btn upgrade"
                                onClick={() => handleRoleChange(user.id, 'mentor')}
                                title="Upgrade to Mentor"
                              >
                                <FiArrowUp />
                                Mentor
                              </button>
                            )}
                            {user.role !== 'admin' && (
                              <button
                                className="action-btn upgrade admin"
                                onClick={() => handleRoleChange(user.id, 'admin')}
                                title="Upgrade to Admin"
                              >
                                <FiShield />
                                Admin
                              </button>
                            )}
                          </>
                        )}
                        {user.id === currentUser?.id && (
                          <span className="current-user-badge">You</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserManagement
