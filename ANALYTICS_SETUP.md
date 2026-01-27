# Website Analytics Setup

## Google Analytics 4 Configuration

I've added Google Analytics 4 tracking to your website. Here's what you need to do to activate it:

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" 
4. Enter your account name (e.g., "William's Portfolio")
5. Enter property name (e.g., "william-golovlev.github.io")
6. Select your time zone and currency
7. Click "Next" and answer the business questions
8. Click "Create" and accept the terms

### Step 2: Get Your Measurement ID
1. After creating the property, you'll see a "Measurement ID" (format: G-XXXXXXXXXX)
2. Copy this ID

### Step 3: Update the Tracking Code
1. Open `_layouts/default.html`
2. Find the Google Analytics section (around line 49)
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID in both places:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-YOUR_ACTUAL_ID');
   </script>
   ```

### Step 4: Verify Installation
1. Save the file and push to GitHub
2. Visit your website
3. In Google Analytics, go to "Realtime" → "Overview"
4. You should see "1" in the "Users right now" section

## What You'll Be Able to Track

- **Number of visitors** (unique users)
- **Page views** (which pages are most popular)
- **Session duration** (how long people stay)
- **Geographic location** (where visitors are from)
- **Traffic sources** (how people find your site)
- **Device types** (desktop, mobile, tablet)
- **Real-time activity** (who's on your site right now)

## Privacy Note

The tracking is anonymous and doesn't collect personal information. It's industry standard for website analytics and perfect for a portfolio site to see if recruiters are visiting!
