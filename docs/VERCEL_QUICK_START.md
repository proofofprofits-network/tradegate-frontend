# ⚡ Quick Start: Deploy to Vercel

## 🎯 Recommended Setup

**Frontend → Vercel** | **Backend → Railway** (easiest and free)

## Step 1: Deploy Frontend to Vercel (5 minutes)

### Option A: Drag & Drop (Fastest)

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to vercel.com:**
   - Sign up/Login
   - Click "Add New Project"
   - Drag the `dist` folder onto the page
   - Done! Your site is live

### Option B: Git Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push
   ```

2. **Connect to Vercel:**
   - Go to vercel.com
   - Click "Add New Project"
   - Import from GitHub
   - Select your repository
   - Configure:
     - Framework: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Add Environment Variable:**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend.railway.app/api
     ```
   - (Update this after deploying backend)

## Step 2: Deploy Backend to Railway (10 minutes)

1. **Go to railway.app:**
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Service:**
   - Railway auto-detects Python
   - Settings:
     - **Root Directory**: `backend`
     - **Start Command**: `python app.py`

3. **Add Database:**
   - Click "+ New" → "Database" → "Add PostgreSQL"
   - Railway creates it automatically

4. **Add Environment Variables:**
   - Go to Variables tab
   - Add:
     ```
     SECRET_KEY=your-secret-key-change-this
     JWT_SECRET_KEY=your-jwt-secret-change-this
     ENCRYPTION_KEY=d9rpMSvjH5pkMAyKT4wJpQ1eF_subKgqAIi8bo-u0y0=
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     CORS_ORIGINS=https://your-vercel-app.vercel.app
     ```

5. **Get Backend URL:**
   - Railway provides a URL like: `https://xxx.railway.app`
   - Copy this URL

6. **Update Frontend:**
   - Go back to Vercel
   - Update `VITE_API_URL` to: `https://xxx.railway.app/api`
   - Redeploy (or wait for auto-deploy)

## ✅ You're Done!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.railway.app/api`

## 🔧 Quick Commands

```bash
# Build frontend locally
npm run build

# Deploy to Vercel (if using CLI)
vercel --prod
```

## 📝 Important Notes

1. **Database**: Railway provides PostgreSQL automatically
2. **CORS**: Make sure `CORS_ORIGINS` includes your Vercel URL
3. **HTTPS**: Both services use HTTPS automatically
4. **Free Tier**: Both Vercel and Railway have generous free tiers

## 🆘 Troubleshooting

**Frontend can't reach backend?**
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running (check Railway logs)
- Check CORS settings include your Vercel domain

**Backend errors?**
- Check Railway logs
- Verify all environment variables are set
- Make sure PostgreSQL is connected

---

**That's it! Your app should be live in ~15 minutes!** 🎉
