# 🏆 Top 3 Mentors Feature

## Overview

The homepage now displays the **top 3 verified mentorships** automatically, ranked using a smart filtering algorithm that considers multiple factors.

## Smart Filtering Algorithm

The ranking system uses a **weighted scoring** approach:

- **Success Rate: 40%** - Most important factor (0-100%)
- **Average Rating: 25%** - Quality indicator (0-5 stars, converted to 0-100)
- **Total Payouts: 20%** - Proven profitability ($0-$1M+)
- **Total Students: 15%** - Popularity and trust indicator (0-1000+)

### How It Works

1. Each mentorship gets a composite score (0-100)
2. Scores are calculated using the weighted formula
3. Top 3 highest scores are displayed on the homepage
4. Rankings update automatically when metrics change

## Image Upload Feature

Admins can now upload images for each mentorship:

### How to Add Images

1. **Go to Admin Panel**
   - Login as admin
   - Navigate to Admin Panel

2. **Edit or Create Mentorship**
   - Click "Edit" on existing mentorship
   - Or click "Add New Mentorship"

3. **Upload Image**
   - Scroll to "Mentor Image" field
   - Click "Choose File" and select an image
   - Supported formats: JPG, PNG, GIF
   - Max file size: 5MB
   - Image preview will appear

4. **Save Changes**
   - Click "Update" or "Create"
   - Image is stored as base64 in database

### Image Display

- **On Homepage**: Images appear in the top 3 mentorships section
- **Fallback**: If no image, shows gradient avatar with initial
- **Responsive**: Images scale properly on all devices

## Homepage Display

The "Verified Mentors" section now shows:

- ✅ **Top 3 mentorships** (automatically ranked)
- 🖼️ **Mentor images** (if uploaded)
- ⭐ **Average rating**
- 📈 **Success rate**
- 👥 **Total students**
- 💰 **Total payouts**
- 💵 **Price**

## API Endpoint

**Public Endpoint** (no auth required):
```
GET /api/mentorships/top
```

Returns top 3 mentorships ranked by the smart algorithm.

## Example Scoring

### Mentorship A:
- Success Rate: 95%
- Rating: 4.8 (96/100)
- Payouts: $500,000 (50/100)
- Students: 200 (20/100)
- **Score**: 95×0.4 + 96×0.25 + 50×0.2 + 20×0.15 = **71.9**

### Mentorship B:
- Success Rate: 85%
- Rating: 4.5 (90/100)
- Payouts: $200,000 (20/100)
- Students: 500 (50/100)
- **Score**: 85×0.4 + 90×0.25 + 20×0.2 + 50×0.15 = **70.0**

Mentorship A would rank higher!

## Tips for Best Results

1. **Keep Metrics Updated**: Regularly update success rates, ratings, and payouts
2. **Use Quality Images**: Upload professional images (recommended: 400x300px or larger)
3. **Optimize Images**: Compress images before upload to reduce file size
4. **Complete Profiles**: Fill in all metrics for accurate rankings

---

**Note**: The algorithm automatically recalculates when you update mentorship metrics in the admin panel.
