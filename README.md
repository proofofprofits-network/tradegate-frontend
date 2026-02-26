# TradeGate

A modern website for TradeGate - a community dedicated to verifying legitimate trading mentors who actually make money and trade what they teach.

## Quick Start

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Documentation

All documentation has been moved to the `docs/` folder. See `docs/START_HERE.md` for setup instructions.

## Features

- Modern UI with dark/light theme switching
- User authentication and dashboard
- Admin panel for managing mentorships
- Verified mentors display with smart ranking
- Image uploads for mentorships
- Membership types (Monthly/Lifetime/Both)

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Backend**: Flask, SQLAlchemy, JWT
- **Database**: SQLite (dev) / PostgreSQL (production)
