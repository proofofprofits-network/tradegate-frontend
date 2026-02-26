# 🔧 Fix Render Deployment Error (Status 127)

## The Problem
Status 127 = "Command not found" - Render can't find gunicorn or the command is wrong.

## ✅ Solution: Update Render Settings

### Step 1: Check Your Render Service Settings

Go to your Render service → **Settings** tab

### Step 2: Verify These Settings

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
gunicorn app:app --bind 0.0.0.0:$PORT
```

**Root Directory:**
```
backend
```

**Python Version:**
- Should auto-detect, but you can set: `Python 3`

### Step 3: Make Sure requirements.txt Has Gunicorn

Your `backend/requirements.txt` should include:
```
gunicorn==21.2.0
```

### Step 4: Alternative Start Command (If Still Failing)

If the above doesn't work, try this start command instead:

```
python -m gunicorn app:app --bind 0.0.0.0:$PORT
```

Or:

```
python3 -m gunicorn app:app --bind 0.0.0.0:$PORT
```

### Step 5: Check Environment Variables

Make sure you have these set in Render:

```
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
CORS_ORIGINS=https://your-site.netlify.app
DATABASE_URL=sqlite:///instance/pop_network.db
```

### Step 6: Redeploy

1. Go to **Manual Deploy** tab
2. Click **"Deploy latest commit"**
3. Watch the logs for errors

---

## 🐛 Common Issues

### Issue: "gunicorn: command not found"
**Fix:** Make sure `gunicorn==21.2.0` is in `requirements.txt` and Root Directory is `backend`

### Issue: "No module named 'app'"
**Fix:** Root Directory MUST be `backend` (not root!)

### Issue: "Port already in use"
**Fix:** Make sure start command uses `$PORT` (Render sets this automatically)

### Issue: Database errors
**Fix:** Make sure `DATABASE_URL` is set to `sqlite:///instance/pop_network.db`

---

## 📋 Quick Checklist

- [ ] Root Directory = `backend`
- [ ] Build Command = `pip install -r requirements.txt`
- [ ] Start Command = `gunicorn app:app --bind 0.0.0.0:$PORT`
- [ ] `gunicorn==21.2.0` in requirements.txt
- [ ] All environment variables set
- [ ] Redeployed after changes

---

## 🆘 Still Not Working?

Check the **Logs** tab in Render - it will show the exact error message.

Common fixes:
1. Try: `python -m gunicorn app:app --bind 0.0.0.0:$PORT`
2. Make sure Root Directory is exactly `backend` (case-sensitive)
3. Check that `app.py` exists in the `backend` folder
