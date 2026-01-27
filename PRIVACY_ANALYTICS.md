# Analytics Configuration

## 🔒 Privacy-Protected Analytics Setup

Your Google Analytics ID is now protected! Here's how it works:

### Current Setup
- **Analytics code is conditional** - only loads if `site.google_analytics` is set
- **ID is stored in `_config.yml`** - not hardcoded in HTML
- **Public repo shows commented out ID** - your actual ID stays private

### To Enable Analytics (When Ready)

1. **Uncomment the line in `_config.yml`:**
   ```yaml
   # Change this:
   # google_analytics: G-ZX2FEFY8V7
   
   # To this:
   google_analytics: G-ZX2FEFY8V7
   ```

2. **Deploy your site** - analytics will start tracking

### For Local Development
- Keep the ID commented out while developing
- Only uncomment when you're ready to deploy

### Alternative: Environment Variables
For maximum security, you can also use environment variables:
```yaml
google_analytics: {{ site.env.GOOGLE_ANALYTICS_ID }}
```

### Benefits
- ✅ **Public repo has no exposed analytics ID**
- ✅ **Easy to enable/disable tracking**
- ✅ **Professional setup for production**
- ✅ **Secure development workflow**

Now you can safely commit and push your code without exposing your analytics tracking ID!
