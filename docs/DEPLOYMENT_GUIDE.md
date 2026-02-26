# 🚀 Complete Deployment Guide for POP Network

## Recommended Architecture

**Frontend (Vercel)** + **Backend (Railway/Render)** = Best Setup

## Part 1: Deploy Frontend to Vercel

### Method A: Via Vercel Dashboard (Easiest)

1. **Prepare your code:**
   ```bash
   # Make sure everything is committed to Git
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login
   - Click "Add New Project"

3. **Import Repository:**
   - Connect GitHub/GitLab/Bitbucket
   - Select your POP Network repository
   - Or use "Deploy" and drag your folder

4. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables:**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
   - (You'll update this after deploying backend)

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Method B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# For production
vercel --prod
```

## Part 2: Deploy Backend to Railway (Recommended)

### Why Railway?
- Easy Flask deployment
- Free PostgreSQL database included
- Simple environment variable management
- Auto-deploys from Git

### Steps:

1. **Go to Railway:**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your POP Network repository

3. **Add Python Service:**
   - Railway auto-detects Python
   - If not, click "+ New" → "Empty Service"
   - Add this in settings:
     - **Root Directory**: `backend`
     - **Start Command**: `python app.py`
     - **Build Command**: `pip install -r requirements.txt`

4. **Add PostgreSQL Database:**
   - Click "+ New" → "Database" → "Add PostgreSQL"
   - Railway creates database automatically

5. **Set Environment Variables:**
   - Go to your Python service → Variables
   - Add these (get values from your `.env` file):
     ```
     SECRET_KEY=your-secret-key-here
     JWT_SECRET_KEY=your-jwt-secret-here
     ENCRYPTION_KEY=d9rpMSvjH5pkMAyKT4wJpQ1eF_subKgqAIi8bo-u0y0=
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     CORS_ORIGINS=https://your-vercel-app.vercel.app
     ```
   - Note: `DATABASE_URL` uses Railway's variable reference

6. **Update Backend for Production:**
   - Railway provides PostgreSQL, so update `DATABASE_URL`
   - The migration will run automatically on first deploy

7. **Get Backend URL:**
   - Railway gives you a URL like: `https://your-app.railway.app`
   - Copy this URL

8. **Update Frontend:**
   - Go back to Vercel dashboard
   - Update environment variable:
     ```
     VITE_API_URL=https://your-app.railway.app/api
     ```
   - Redeploy frontend (or it auto-redeploys)

## Part 3: Update CORS Settings

In your Railway backend, make sure `CORS_ORIGINS` includes:
```
https://your-vercel-app.vercel.app,https://your-custom-domain.com
```

## Alternative: Render.com for Backend

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Settings:
   - **Name**: pop-network-backend
   - **Environment**: Python 3
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python app.py`
5. Add PostgreSQL database (free tier available)
6. Add environment variables
7. Deploy

## Environment Variables Checklist

### Frontend (Vercel)
- ✅ `VITE_API_URL` = Your backend URL + `/api`

### Backend (Railway/Render)
- ✅ `SECRET_KEY` = Random string
- ✅ `JWT_SECRET_KEY` = Random string  
- ✅ `ENCRYPTION_KEY` = Your encryption key
- ✅ `DATABASE_URL` = PostgreSQL connection string (auto-provided)
- ✅ `CORS_ORIGINS` = Your Vercel frontend URL(s)

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] Can login/signup
- [ ] API calls work (check browser console)
- [ ] Database persists data
- [ ] Admin panel accessible
- [ ] Images upload correctly
- [ ] All features working

## Custom Domain (Optional)

### Vercel:
1. Go to project settings → Domains
2. Add your domain
3. Follow DNS instructions

### Update CORS:
Add your custom domain to `CORS_ORIGINS` in backend

## Troubleshooting

### "Cannot connect to API"
- Check `VITE_API_URL` is correct
- Verify backend is running
- Check CORS settings

### "Database errors"
- Verify `DATABASE_URL` is set
- Check PostgreSQL is running
- Run migrations if needed

### "Build fails"
- Check Node.js version (Vercel uses 18+)
- Verify all dependencies in `package.json`
- Check build logs in Vercel dashboard

## Quick Reference

```bash
# Frontend build
npm run build

# Deploy frontend
vercel --prod

# Backend runs automatically on Railway/Render after Git push
```

---

**Your app will be live at:** `https://your-project.vercel.app`

**Backend API at:** `https://your-backend.railway.app/api`
