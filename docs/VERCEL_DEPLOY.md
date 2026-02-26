# 🚀 Deploying POP Network to Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```

## Deployment Options

### Option 1: Deploy Frontend Only (Recommended for Start)

Since Vercel's serverless functions have limitations with Flask, I recommend:

1. **Deploy Frontend to Vercel**
2. **Deploy Backend Separately** to:
   - Railway (recommended for Flask)
   - Render
   - Heroku
   - Or any Python hosting service

### Option 2: Full Stack on Vercel (Advanced)

Vercel supports Python serverless functions, but Flask needs special configuration.

## Step-by-Step: Frontend Deployment

### 1. Prepare for Deployment

```bash
# Make sure you're in the project root
cd "C:\Users\merkz\Documents\POP Network"

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
   - Or drag and drop the project folder
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
6. Click "Deploy"

### 3. Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? pop-network (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

## Backend Deployment (Separate Service)

### Recommended: Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repo or deploy from folder
4. Add Python service
5. Set environment variables in Railway dashboard:
   ```
   SECRET_KEY=your-secret-key
   JWT_SECRET_KEY=your-jwt-secret
   ENCRYPTION_KEY=your-encryption-key
   DATABASE_URL=postgresql://... (Railway provides this)
   CORS_ORIGINS=https://your-vercel-app.vercel.app
   ```
6. Update frontend `VITE_API_URL` to Railway URL

### Alternative: Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect repository
4. Settings:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && python app.py`
5. Add environment variables
6. Deploy

## Environment Variables Setup

### Frontend (Vercel)
- `VITE_API_URL` - Your backend API URL (e.g., `https://your-backend.railway.app/api`)

### Backend (Railway/Render/etc)
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT secret key
- `ENCRYPTION_KEY` - Encryption key (from ENCRYPTION_KEY.txt)
- `DATABASE_URL` - Database connection string
- `CORS_ORIGINS` - Your Vercel frontend URL

## Important Notes

1. **Database**: For production, use PostgreSQL (Railway/Render provide this)
2. **Update CORS**: Make sure `CORS_ORIGINS` includes your Vercel domain
3. **Update API URL**: Update `VITE_API_URL` in Vercel environment variables
4. **HTTPS**: Both frontend and backend should use HTTPS in production

## Quick Deploy Commands

```bash
# Build frontend
npm run build

# Deploy to Vercel
vercel --prod

# Or use Vercel dashboard for easier setup
```

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` is set correctly
- Verify CORS settings in backend
- Check backend is running and accessible

### Build fails
- Make sure all dependencies are in `package.json`
- Check Node.js version (Vercel uses Node 18+ by default)

### Backend errors
- Check environment variables are set
- Verify database connection
- Check logs in Railway/Render dashboard

---

**Need help?** Check Vercel docs: https://vercel.com/docs
