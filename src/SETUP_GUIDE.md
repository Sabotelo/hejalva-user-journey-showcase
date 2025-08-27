# Business Profile & Demo Scheduling Setup Guide

## Database Setup

To enable the user profile and demo scheduling functionality, you need to run the SQL script in your Supabase database.

### Steps:

1. **Open your Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor

2. **Run the Database Script**
   - Copy the contents of `src/sql/create_tables.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

3. **Verify Tables Created**
   - Go to the Table Editor
   - You should see two new tables:
     - `user_profiles` - Stores business profile information
     - `demo_requests` - Stores demo scheduling requests

## Features Implemented

### ✅ User Profile Creation
- **Location**: Replaces the "Start Trial" button in the CTA section
- **Fields**:
  - Full Name (required)
  - Business Name (required)
  - Phone Number (required)
  - Email Address (required)
  - Business Category (required) - Dropdown with predefined categories
- **Categories Available**:
  - Restaurant
  - Hotel
  - Hair Salon
  - Retail Store
  - Professional Services
  - Healthcare
  - Education
  - Real Estate
  - Automotive
  - Beauty & Wellness
  - Fitness & Gym
  - Legal Services
  - Financial Services
  - Construction
  - Other

### ✅ Demo Scheduling
- **Location**: Replaces the "Schedule Demo" button in the CTA section
- **Features**:
  - Date picker (excludes weekends)
  - Time slot selection (9 AM - 5 PM in 30-minute intervals)
  - Contact information collection
  - Optional message field
  - Automatic status tracking (pending, confirmed, completed, cancelled)

### ✅ Cleaned Up Elements
- Removed external links that don't work:
  - Preview button from hero section
  - External trial and calendar links from CTA
- Kept existing contact form functionality
- Maintained phone, email, and location information display

## Business Categories

The system supports the following business categories:
- Restaurant
- Hotel  
- Hair Salon
- Retail Store
- Professional Services
- Healthcare
- Education
- Real Estate
- Automotive
- Beauty & Wellness
- Fitness & Gym
- Legal Services
- Financial Services
- Construction
- Other

## Database Schema

### user_profiles
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `business_name` (Text, Required)  
- `phone` (Text, Required)
- `email` (Text, Required)
- `business_category` (Text, Required)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### demo_requests
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `email` (Text, Required)
- `phone` (Text, Required)
- `business_name` (Text, Optional)
- `preferred_date` (Date, Required)
- `preferred_time` (Text, Required)
- `message` (Text, Optional)
- `status` (Text, Default: 'pending')
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Next Steps

1. Run the SQL script to create the database tables
2. Test the user profile creation form
3. Test the demo scheduling functionality
4. Review the submitted data in your Supabase dashboard
5. Share your sales pitch document to incorporate it into the website content

The website is now ready to collect business profiles and schedule demos!