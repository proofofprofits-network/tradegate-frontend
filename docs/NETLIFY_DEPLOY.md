# 🚀 Deploy to Netlify (No Phone Required!)

## Quick Deploy - 3 Methods

### Method 1: Drag & Drop (Fastest - 2 minutes)

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to netlify.com:**
   - Sign up (email only, no phone!)
   - Click "Add new site" → "Deploy manually"
   - Drag the `dist` folder onto the page
   - **Done!** Your site is live at `random-name.netlify.app`

3. **Add Environment Variable:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend.railway.app/api`
   - Redeploy

---

### Method 2: Git Integration (Recommended - Auto-deploys)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Netlify"
   git push
   ```

2. **Connect to Netlify:**
   - Go to netlify.com
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Add Environment Variable:**
   - Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend.railway.app/api`
   - Redeploy

---

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login (no phone needed!)
netlify login

# Deploy
netlify deploy --prod
```

---

## Backend Setup (Railway - No Phone!)

1. **Go to railway.app**
2. **Sign up with GitHub** (no phone!)
3. **Deploy backend** (see main deployment guide)
4. **Get your Railway URL**
5. **Update `VITE_API_URL` in Netlify**

---

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS instructions

---

## That's It!

Your site will be live at: `your-site.netlify.app`

No phone verification needed! 🎉
