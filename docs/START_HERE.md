# 🚀 POP Network - Quick Start Guide

## ✅ What's Ready

- ✅ Captcha removed (no longer required)
- ✅ Encryption key generated and configured
- ✅ Backend `.env` file created with all keys
- ✅ Everything ready to run!

## 📋 Step-by-Step Startup Instructions

### Step 1: Install Frontend Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

This will install all React dependencies.

### Step 2: Install Backend Dependencies

Open a **new terminal** (keep the first one open) and run:

```bash
cd backend
pip install -r requirements.txt
```

**Note:** If you're on Windows and `pip` doesn't work, try `pip3` or `python -m pip install -r requirements.txt`

### Step 3: Start the Backend Server

In the backend terminal, run:

```bash
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
```

**Keep this terminal open!** The backend needs to keep running.

### Step 4: Start the Frontend Server

Go back to your **first terminal** (the one in the project root) and run:

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

## 🎉 You're All Set!

### Default Admin Account
- **Email:** `admin@popnetwork.com`
- **Password:** `admin123`

**⚠️ Important:** Change this password after first login!

### What You Can Do Now

1. **Browse the website** - Check out the homepage
2. **Sign up** - Create a new account (no captcha needed!)
3. **Login** - Access the dashboard
4. **Admin Panel** - Login as admin to manage mentorships
5. **Settings** - Update your profile and password

## 🔧 Troubleshooting

### Backend won't start?
- Make sure Python 3.8+ is installed: `python --version`
- Check all dependencies installed: `pip list`
- Verify you're in the `backend` directory

### Frontend won't start?
- Make sure Node.js is installed: `node --version`
- Try deleting `node_modules` and running `npm install` again
- Check that port 3000 is not in use

### Can't connect frontend to backend?
- Make sure both servers are running
- Backend should be on port 5000
- Frontend should be on port 3000
- Check browser console for errors

### Database issues?
- Delete `backend/pop_network.db` and restart backend
- The database will be recreated automatically

## 📝 Next Steps

1. **Change admin password** - Login and update in Settings
2. **Add mentorships** - Use Admin Panel to add verified mentors
3. **Customize** - Update content, colors, and branding as needed

## 🛑 To Stop the Servers

Press `Ctrl + C` in each terminal window to stop the servers.

---

**Need help?** Check the main `README.md` for more detailed documentation.
