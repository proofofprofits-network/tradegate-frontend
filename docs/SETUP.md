# POP Network - Complete Setup Guide

## Quick Start

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
echo "VITE_RECAPTCHA_SITE_KEY=your-site-key-here" >> .env

# Start development server
npm run dev
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Generate encryption key
python -c "from cryptography.fernet import Fernet; print('ENCRYPTION_KEY=' + Fernet.generate_key().decode())"

# Create .env file with the generated key
# Add other required variables (see backend/.env.example)

# Start Flask server
python app.py
```

### 3. reCAPTCHA Setup

1. Go to https://www.google.com/recaptcha/admin
2. Create a new site (reCAPTCHA v2)
3. Copy the Site Key to frontend `.env` as `VITE_RECAPTCHA_SITE_KEY`
4. Copy the Secret Key to backend `.env` as `RECAPTCHA_SECRET_KEY`

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Default Admin: admin@popnetwork.com / admin123

## Features Overview

### User Features
- ✅ Sign up with reCAPTCHA verification
- ✅ Login with secure authentication
- ✅ Dashboard with mentorship listings
- ✅ Sort mentorships by:
  - Popularity (most students)
  - Price (lowest to highest)
  - Results (success rate)
  - Payouts (total mentor payouts)
- ✅ Personal settings page
- ✅ Password change functionality

### Admin Features
- ✅ View all mentorships (including paused/inactive)
- ✅ Add new mentorships
- ✅ Edit mentorship details
- ✅ Pause/Activate mentorships
- ✅ Delete mentorships
- ✅ Full CRUD operations

### Security Features
- ✅ Encrypted database storage (emails)
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ reCAPTCHA bot protection
- ✅ CORS protection
- ✅ Role-based access control

## Troubleshooting

### Backend won't start
- Check that all dependencies are installed: `pip install -r requirements.txt`
- Verify `.env` file exists with all required variables
- Check that port 5000 is not in use

### Frontend can't connect to backend
- Verify `VITE_API_URL` in frontend `.env` matches backend URL
- Check CORS settings in backend `app.py`
- Ensure backend is running on port 5000

### reCAPTCHA not working
- Verify both Site Key and Secret Key are set correctly
- Check that keys match (same reCAPTCHA account)
- For development, you can use test keys (see reCAPTCHA docs)

### Database issues
- Delete `pop_network.db` and restart backend to recreate
- Check that encryption key is set correctly
- Verify database path in `DATABASE_URL`

## Production Deployment

### Important Security Notes

1. **Change Default Admin Password**
   - Log in as admin
   - Change password in settings
   - Or update in database directly

2. **Generate Strong Keys**
   - Use strong, random values for:
     - `SECRET_KEY`
     - `JWT_SECRET_KEY`
     - `ENCRYPTION_KEY`

3. **Environment Variables**
   - Never commit `.env` files
   - Use secure environment variable management
   - Different keys for production vs development

4. **Database**
   - Use PostgreSQL or MySQL in production
   - Update `DATABASE_URL` accordingly
   - Regular backups recommended

5. **HTTPS**
   - Always use HTTPS in production
   - Update CORS origins to production domain
   - Secure cookies for JWT tokens

## API Documentation

See `backend/README.md` for detailed API endpoint documentation.
