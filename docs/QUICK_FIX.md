# Quick Fix for Database Migration Error

## The Problem
The database doesn't have the new columns (`monthly_price`, `lifetime_price`, `membership_type`) that were added to the model.

## Solution 1: Automatic Migration (Recommended)
Just restart your Flask server! The updated `init_db()` function will automatically add the missing columns.

```bash
# Stop your current server (Ctrl+C)
# Then restart:
python app.py
```

You should see messages like:
```
⚠ Adding monthly_price column...
✓ Added monthly_price column
⚠ Adding lifetime_price column...
✓ Added lifetime_price column
⚠ Adding membership_type column...
✓ Added membership_type column
```

## Solution 2: Manual Migration Script
If automatic migration doesn't work, run the migration script:

```bash
cd backend
python migrate_db.py
```

## Solution 3: Delete and Recreate Database (Loses Data)
If you don't have important data, you can delete the database and let it recreate:

```bash
cd backend
# Delete the database file
del pop_network.db
# Or on Linux/Mac:
# rm pop_network.db

# Then restart the server
python app.py
```

**Note:** This will delete all existing mentorships and users (except the default admin which gets recreated).

## After Migration
Once the migration is complete, you should be able to:
- Add new mentorships with membership types
- Edit existing mentorships
- See membership type badges on all pages

---

**The automatic migration should work when you restart the server!**
