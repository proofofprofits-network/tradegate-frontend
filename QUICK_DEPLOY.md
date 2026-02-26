# ⚡ Quick Deploy Guide (15 minutes)

## 🎯 Goal
Deploy frontend to Netlify + backend to Render (both FREE)

---

## 📦 Step 1: Push to GitHub (2 min)

```bash
git add .
git commit -m "Ready for deployment"
git push
```

---

## 🎨 Step 2: Deploy Frontend to Netlify (5 min)

1. Go to **netlify.com** → Sign up with GitHub
2. **"Add new site"** → **"Import from Git"**
3. Select your repo
4. Settings:
   - Build: `npm run build`
   - Publish: `dist`
5. **Deploy!** ✅
6. Copy your Netlify URL (e.g., `your-site-123.netlify.app`)

---

## 🔧 Step 3: Deploy Backend to Render (8 min)

1. Go to **render.com** → Sign up with GitHub
2. **"New +"** → **"Web Service"**
3. Connect your repo
4. Settings:
   - **Name**: `tradegate-backend`
   - **Root Directory**: `backend` ⚠️ IMPORTANT!
   - **Environment**: `Python 3`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `gunicorn app:app --bind 0.0.0.0:$PORT`

5. **Environment Variables** (click "Advanced"):
   ```
   SECRET_KEY=make-a-random-long-string-here
   JWT_SECRET_KEY=make-another-random-long-string-here
   ENCRYPTION_KEY=paste-from-backend/ENCRYPTION_KEY.txt
   CORS_ORIGINS=https://your-site-123.netlify.app
   DATABASE_URL=sqlite:///instance/pop_network.db
   ```

6. **Create Web Service** → Wait 5-10 min
7. Copy your Render URL (e.g., `tradegate-backend.onrender.com`)

---

## 🔗 Step 4: Connect Frontend to Backend (2 min)

1. Go back to **Netlify** → Your site
2. **Site settings** → **Environment variables**
3. Add:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.onrender.com/api`
4. **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## ✅ Done!

- Frontend: `https://your-site-123.netlify.app`
- Backend: `https://your-backend.onrender.com`

Test it: Visit your Netlify URL and try signing up! 🎉

---

## 🆘 Troubleshooting

**CORS Error?**
- Make sure `CORS_ORIGINS` in Render includes your Netlify URL exactly

**404 on API calls?**
- Check `VITE_API_URL` ends with `/api`
- Redeploy Netlify after changing variables

**Backend not starting?**
- Check Render logs
- Make sure Root Directory is `backend` (not root!)

---

**Need more details?** See `DEPLOYMENT_COMPLETE_GUIDE.md`
