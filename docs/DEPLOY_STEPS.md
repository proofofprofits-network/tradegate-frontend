 # ✅ Final Deployment Steps

## Step 1: Push to GitHub

```bash
# Make sure you're in the project root
cd "C:\Users\merkz\Documents\POP Network"

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Push to GitHub
git push
```

**Note:** Make sure you have a GitHub repository set up first!

---

## Step 2: Deploy Frontend to Netlify

### Option A: Connect GitHub (Recommended - Auto-deploys)

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login (email only, no phone!)
3. Click "Add new site" → "Import an existing project"
4. Click "Deploy with GitHub"
5. Authorize Netlify to access GitHub
6. Select your repository
7. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
8. Click "Deploy site"
9. Wait for build to complete

### Option B: Drag & Drop (Faster, but manual)

1. Build locally:
   ```bash
   npm run build
   ```
2. Go to netlify.com
3. Click "Add new site" → "Deploy manually"
4. Drag the `dist` folder
5. Done!

---

## Step 3: Deploy Backend to Railway

**You still need to deploy the backend separately!**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Settings:
   - **Root Directory**: `backend`
   - **Start Command**: `python app.py`
6. Add PostgreSQL database:
   - Click "+ New" → "Database" → "Add PostgreSQL"
7. Add Environment Variables:
   - Go to Variables tab
   - Add:
     ```
     SECRET_KEY=your-secret-key-here
     JWT_SECRET_KEY=your-jwt-secret-here
     ENCRYPTION_KEY=d9rpMSvjH5pkMAyKT4wJpQ1eF_subKgqAIi8bo-u0y0=
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     CORS_ORIGINS=https://your-site.netlify.app
     ```
8. Copy your Railway URL (e.g., `https://xxx.railway.app`)

---

## Step 4: Connect Frontend to Backend

1. Go back to Netlify dashboard
2. Go to your site → Site settings → Environment variables
3. Add:
   ```
   VITE_API_URL=https://your-railway-url.railway.app/api
   ```
   (Replace with your actual Railway URL)
4. Go to Deploys tab
5. Click "Trigger deploy" → "Clear cache and deploy site"

---

## Step 5: Test Everything

1. Visit your Netlify URL
2. Try to sign up/login
3. Check if API calls work
4. Test admin panel

---

## Summary Checklist

- [ ] Pushed code to GitHub
- [ ] Deployed frontend to Netlify
- [ ] Deployed backend to Railway
- [ ] Added environment variables to Railway
- [ ] Added `VITE_API_URL` to Netlify
- [ ] Updated `CORS_ORIGINS` in Railway
- [ ] Tested the site

---

**You're done when all checkboxes are checked!** 🎉
