# 🚀 Complete Deployment Guide - Frontend & Backend

## Overview
- **Frontend**: Deploy to Netlify (FREE)
- **Backend**: Deploy to Render (FREE) or Railway (FREE)

---

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Code pushed to GitHub**
3. **15-20 minutes**

---

## 🎨 PART 1: Deploy Frontend to Netlify

### Step 1: Push Code to GitHub

```bash
# If you haven't already
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up** (use GitHub - no phone needed!)
3. **Click "Add new site" → "Import an existing project"**
4. **Select your GitHub repository**
5. **Configure build settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Click **"Deploy site"**

6. **Wait for deployment** (2-3 minutes)
7. **Your site is live!** (e.g., `your-site-123.netlify.app`)

### Step 3: Add Environment Variable (After Backend is Deployed)

1. Go to **Site settings** → **Environment variables**
2. Click **"Add variable"**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com/api` (or Railway URL)
4. Click **"Save"**
5. Go to **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

---

## 🔧 PART 2: Deploy Backend to Render (FREE)

### Option A: Render (Recommended - Easiest)

#### Step 1: Prepare Backend

✅ Already done! Files are ready:
- `backend/Procfile` ✅
- `backend/requirements.txt` ✅ (includes gunicorn)

#### Step 2: Deploy to Render

1. **Go to [render.com](https://render.com)**
2. **Sign up** with GitHub (free)
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name**: `tradegate-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend` (important!)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`

6. **Environment Variables** (click "Advanced"):
   ```
   SECRET_KEY=your-secret-key-here-make-it-long-and-random
   JWT_SECRET_KEY=your-jwt-secret-key-here-make-it-long-and-random
   ENCRYPTION_KEY=your-encryption-key-from-ENCRYPTION_KEY.txt
   CORS_ORIGINS=https://your-site.netlify.app,https://your-site-123.netlify.app
   DATABASE_URL=sqlite:///instance/pop_network.db
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret-if-you-have-one
   ```

7. **Click "Create Web Service"**
8. **Wait 5-10 minutes** for first deployment
9. **Copy your URL** (e.g., `https://tradegate-backend.onrender.com`)

#### Step 3: Update Frontend

1. Go back to **Netlify**
2. **Site settings** → **Environment variables**
3. Update `VITE_API_URL` to: `https://your-backend.onrender.com/api`
4. **Redeploy** (Deploys → Trigger deploy)

---

### Option B: Railway (Alternative)

#### Step 1: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up** with GitHub
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Add Service** → Select your repo
6. **Configure:**
   - **Root Directory**: `backend`
   - Railway auto-detects Python

7. **Environment Variables** (Variables tab):
   ```
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   ENCRYPTION_KEY=your-encryption-key
   CORS_ORIGINS=https://your-site.netlify.app
   DATABASE_URL=sqlite:///instance/pop_network.db
   ```

8. **Settings** → **Generate Domain** (get your URL)
9. **Deploy** (automatic)

#### Step 2: Update Frontend

Same as Render - update `VITE_API_URL` in Netlify to your Railway URL.

---

## 🔐 Environment Variables Guide

### Backend Variables (Render/Railway)

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key | Generate random string |
| `JWT_SECRET_KEY` | JWT token secret | Generate random string |
| `ENCRYPTION_KEY` | Email encryption key | Copy from `backend/ENCRYPTION_KEY.txt` |
| `CORS_ORIGINS` | Allowed frontend URLs | `https://your-site.netlify.app` |
| `DATABASE_URL` | Database path | `sqlite:///instance/pop_network.db` |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret (optional) | Your reCAPTCHA secret |

### Frontend Variables (Netlify)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

---

## 🧪 Testing Your Deployment

### 1. Test Frontend
- Visit your Netlify URL
- Check browser console (F12) - should show API URL
- Try signing up/logging in

### 2. Test Backend
- Visit: `https://your-backend.onrender.com/api/mentorships/top`
- Should return JSON (even if empty)

### 3. Common Issues

**CORS Errors:**
- Make sure `CORS_ORIGINS` includes your Netlify URL
- Format: `https://your-site.netlify.app` (no trailing slash)

**404 Errors:**
- Check `VITE_API_URL` is set correctly in Netlify
- Make sure it ends with `/api`
- Redeploy after changing variables

**Database Issues:**
- Render/Railway uses persistent storage
- Database file is saved in `instance/` folder
- First deployment creates empty database

---

## 📝 Quick Checklist

### Frontend (Netlify)
- [ ] Code pushed to GitHub
- [ ] Site deployed on Netlify
- [ ] `VITE_API_URL` environment variable set
- [ ] Site redeployed after setting variable

### Backend (Render/Railway)
- [ ] Service created
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Service deployed and running
- [ ] URL copied

### Connection
- [ ] `VITE_API_URL` points to backend URL
- [ ] `CORS_ORIGINS` includes frontend URL
- [ ] Tested signup/login
- [ ] Tested API calls

---

## 🎉 You're Done!

Your app should now be live:
- **Frontend**: `https://your-site.netlify.app`
- **Backend**: `https://your-backend.onrender.com`

---

## 💡 Pro Tips

1. **Free Tier Limits:**
   - Render: Service sleeps after 15 min inactivity (wakes on request)
   - Railway: 500 hours/month free
   - Netlify: 100GB bandwidth/month

2. **Database Persistence:**
   - Both Render and Railway keep your database file
   - Backups: Download `pop_network.db` periodically

3. **Custom Domain:**
   - Netlify: Free custom domain support
   - Render: Free custom domain on paid plan

4. **Monitoring:**
   - Check Render/Railway logs if issues occur
   - Netlify shows build logs

---

## 🆘 Need Help?

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app

Good luck! 🚀
