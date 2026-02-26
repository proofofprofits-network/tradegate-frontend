# 🔧 Fix: API URL Configuration for Netlify

## The Problem
Your app is trying to connect to `localhost:5000` because the environment variable isn't set in Netlify.

## Quick Fix (2 minutes)

### Step 1: Get Your Backend URL
First, deploy your backend to Railway (or another service) and get the URL:
- Example: `https://your-app.railway.app`

### Step 2: Set Environment Variable in Netlify

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site

2. **Go to Site Settings**
   - Click "Site settings" in the left sidebar
   - Click "Environment variables" in the Build & deploy section

3. **Add Environment Variable**
   - Click "Add variable"
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app/api`
   - (Replace with your actual backend URL)
   - Click "Save"

4. **Redeploy**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - Wait for build to complete

### Step 3: Verify It Works

1. Visit your Netlify site
2. Open browser console (F12)
3. You should see: `API URL: https://your-backend-url.railway.app/api`
4. Try signing up - it should work!

---

## Alternative: If Backend Isn't Deployed Yet

If you haven't deployed the backend yet:

1. **Deploy backend first** (Railway/Render)
2. **Get the backend URL**
3. **Set `VITE_API_URL` in Netlify** (steps above)
4. **Redeploy frontend**

---

## Troubleshooting

### Still connecting to localhost?
- Make sure you added `VITE_API_URL` in Netlify
- Make sure you **redeployed** after adding the variable
- Check browser console for the actual API URL being used

### Getting CORS errors?
- Make sure `CORS_ORIGINS` in Railway includes your Netlify URL
- Format: `https://your-site.netlify.app`

### Can't find Environment Variables in Netlify?
- Go to: Site → Site settings → Build & deploy → Environment variables
- Or: Site → Deploys → (click on a deploy) → Deploy settings → Environment

---

**After setting the environment variable and redeploying, your app should work!** ✅
