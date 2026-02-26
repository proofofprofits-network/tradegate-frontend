# POP Network Backend API

Flask-based REST API for POP Network with encrypted database storage.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Generate encryption key:
```python
from cryptography.fernet import Fernet
key = Fernet.generate_key()
print(key.decode())
```
Add this to your `.env` file as `ENCRYPTION_KEY`

4. Set up reCAPTCHA:
   - Get keys from https://www.google.com/recaptcha/admin
   - Add `RECAPTCHA_SECRET_KEY` to `.env`
   - Add `VITE_RECAPTCHA_SITE_KEY` to frontend `.env`

5. Run the server:
```bash
python app.py
```

The API will run on `http://localhost:5000`

## Default Admin Account

- Email: `admin@popnetwork.com`
- Password: `admin123`

**Change this immediately in production!**

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `PUT /api/auth/password` - Change password (requires auth)

### Mentorships
- `GET /api/mentorships?sort_by=popularity` - Get mentorships (requires auth)

### Admin
- `GET /api/admin/mentorships` - Get all mentorships (admin only)
- `POST /api/admin/mentorships` - Create mentorship (admin only)
- `PUT /api/admin/mentorships/<id>` - Update mentorship (admin only)
- `PATCH /api/admin/mentorships/<id>/status` - Update status (admin only)
- `DELETE /api/admin/mentorships/<id>` - Delete mentorship (admin only)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Encrypted database fields (emails)
- reCAPTCHA verification
- CORS protection
- Role-based access control
