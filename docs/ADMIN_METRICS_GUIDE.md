# 📊 How to Update Mentorship Metrics

## Overview

As an admin, you can now update all mentorship metrics including:
- **Total Students** - Number of students enrolled
- **Average Rating** - Rating from 0.0 to 5.0
- **Success Rate** - Percentage from 0% to 100%
- **Total Payouts** - Total amount in dollars the mentor has received

## How to Update Metrics

### Method 1: Edit Existing Mentorship

1. **Login as Admin**
   - Go to http://localhost:3000/login
   - Use admin credentials: `admin@popnetwork.com` / `admin123`

2. **Navigate to Admin Panel**
   - Click "Admin Panel" link in the dashboard
   - Or go directly to http://localhost:3000/admin

3. **Edit a Mentorship**
   - Find the mentorship in the table
   - Click the **Edit** button (pencil icon)

4. **Update Metrics**
   - Scroll down to the "Metrics & Analytics" section
   - Update any of the following fields:
     - **Total Students**: Enter the number of students
     - **Average Rating**: Enter a value between 0.0 and 5.0
     - **Success Rate**: Enter a percentage between 0 and 100
     - **Total Payouts**: Enter the total payout amount in dollars

5. **Save Changes**
   - Click the "Update" button
   - The metrics will be saved and reflected in the dashboard

### Method 2: Add New Mentorship with Metrics

1. **Click "Add New Mentorship"**
2. **Fill in Basic Information**
   - Mentor Name
   - Specialty
   - Price
   - Description
   - Status

3. **Set Initial Metrics**
   - In the "Metrics & Analytics" section, you can set initial values
   - All metrics default to 0 if left empty

4. **Create Mentorship**
   - Click "Create" button

## Metric Field Details

### Total Students
- **Type**: Integer (whole number)
- **Range**: 0 or higher
- **Example**: `150` students

### Average Rating
- **Type**: Decimal number
- **Range**: 0.0 to 5.0
- **Step**: 0.1 (allows decimals like 4.5)
- **Example**: `4.7` stars

### Success Rate
- **Type**: Decimal number (percentage)
- **Range**: 0 to 100
- **Step**: 0.1 (allows decimals like 87.5%)
- **Example**: `92.5` (means 92.5% success rate)

### Total Payouts
- **Type**: Decimal number (currency)
- **Range**: 0 or higher
- **Step**: 0.01 (allows cents)
- **Example**: `125000.50` (means $125,000.50)

## Dashboard Impact

Once you update metrics, they will:

1. **Appear in the Dashboard**
   - Users will see updated metrics when viewing mentorships
   - Metrics are used for sorting and filtering

2. **Affect Sorting**
   - **By Results**: Sorted by Success Rate (highest first)
   - **By Payouts**: Sorted by Total Payouts (highest first)
   - **By Popularity**: Sorted by Total Students (most first)

3. **Update Statistics**
   - Dashboard stats cards will reflect the new totals
   - Average ratings will be recalculated

## Tips

- ✅ **Update Regularly**: Keep metrics current for accurate rankings
- ✅ **Verify Data**: Double-check numbers before saving
- ✅ **Use Decimals**: Ratings and success rates can have decimals (e.g., 4.7, 87.5%)
- ✅ **Currency Format**: Payouts can include cents (e.g., 125000.50)

## Example Workflow

1. Mentor receives new payout of $50,000
2. Admin logs in and goes to Admin Panel
3. Clicks Edit on that mentor's mentorship
4. Updates "Total Payouts" from $100,000 to $150,000
5. Updates "Total Students" from 100 to 125 (new enrollments)
6. Updates "Success Rate" from 85% to 87% (improved results)
7. Clicks "Update"
8. Dashboard immediately reflects new metrics

---

**Need Help?** Check the main README.md or START_HERE.md for setup instructions.
