# Deploying Astrivya Backend to Render

This guide walks you through deploying the Astrivya backend API to Render.com.

---

## Prerequisites

1. ✅ GitHub account with your code pushed
2. ✅ Render account (free) - [render.com](https://render.com)
3. ✅ Supabase project set up
4. ✅ Resend API key ready

---

## Step-by-Step Deployment

### 1. Push Backend Code to GitHub

First, make sure your backend code is in a GitHub repository. If it's not already:

```bash
# Navigate to your project root
cd /Users/jakkuamruth/Desktop/UIs-astrivya-web/new/Web-Marketing

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Astrivya backend"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/astrivya-backend.git
git branch -M main
git push -u origin main
```

### 2. Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest)

### 3. Create New Web Service

1. **Dashboard** → Click "New +" → **Web Service**

2. **Connect Repository:**
   - Click "Connect account" if needed
   - Select your repository: `astrivya-backend` (or whatever you named it)
   - Click "Connect"

3. **Configure Service:**

   | Setting | Value |
   |---------|-------|
   | **Name** | `astrivya-backend` |
   | **Region** | Choose closest to your users (e.g., Oregon) |
   | **Branch** | `main` |
   | **Root Directory** | `backend` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |

4. **Select Plan:**
   - Choose **Free** (or paid if needed)
   - Free tier limitations:
     - Sleeps after 15 min of inactivity
     - Wakes up on first request (may take 30s)

### 4. Configure Environment Variables

**CRITICAL**: Before deploying, add all required environment variables:

Click **"Advanced"** → **Environment Variables** → Add the following:

```bash
NODE_ENV=production

ALLOWED_ORIGINS=https://astrivya.ai,https://www.astrivya.ai

# Generate strong secret (run in terminal):
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_generated_secret_here

JWT_EXPIRES_IN=7d

OTP_EXPIRY_MINUTES=10

# From Supabase Dashboard → Settings → API
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key

# From Resend Dashboard → API Keys
RESEND_API_KEY=re_your_resend_api_key
```

**How to add each variable:**
1. Click "Add Environment Variable"
2. Enter **Key** and **Value**
3. Repeat for all 8 variables

### 5. Deploy!

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Run `npm install`
   - Run `npm start`
   - Show you the logs

### 6. Monitor Deployment

Watch the **Logs** tab:

✅ **Successful deployment looks like:**
```
✅ CORS configured for: [ 'https://astrivya.ai', 'https://www.astrivya.ai' ]
✅ All required environment variables are configured
✅ Database connection established

════════════════════════════════════════════════════════════
🚀 Astrivya Backend Server Started Successfully
════════════════════════════════════════════════════════════
📡 Port: 3001
📊 Environment: production
🔐 JWT Expiry: 7d
⏰ OTP Expiry: 10 minutes
🌐 CORS Origins: 2 configured
════════════════════════════════════════════════════════════
```

❌ **If you see errors**, check:
- All environment variables are set correctly
- No typos in variable names
- Supabase credentials are correct

### 7. Get Your Backend URL

Once deployed successfully:

1. Copy your backend URL from the top of the page
   - Format: `https://astrivya-backend.onrender.com`
   - Or custom domain if you added one

2. **Test it:**
   ```bash
   curl https://astrivya-backend.onrender.com/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-11-24T...",
     "service": "astrivya-backend"
   }
   ```

---

## Connect Frontend to Backend

### 1. Update Vercel Environment Variable

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Settings → Environment Variables
3. Add/Update:
   ```
   REACT_APP_API_URL=https://astrivya-backend.onrender.com
   ```
4. Save
5. Deployments → Redeploy latest

### 2. Update Backend CORS (if needed)

If you haven't already, ensure your Vercel frontend URL is in `ALLOWED_ORIGINS`:

1. Render Dashboard → Your Service → Environment
2. Edit `ALLOWED_ORIGINS`:
   ```
   https://astrivya.ai,https://www.astrivya.ai,https://your-vercel-app.vercel.app
   ```
3. Save (this will auto-redeploy)

---

## Testing

### 1. Test Health Endpoint
```bash
curl https://astrivya-backend.onrender.com/health
```

### 2. Test Waitlist Registration
Go to your frontend: `https://astrivya.ai`
1. Fill in the waitlist form
2. Submit
3. Check your email for OTP
4. Verify OTP

### 3. Check Logs
Render Dashboard → Logs tab
- Watch for any errors
- Confirm OTP emails are being sent

---

## Troubleshooting

### "Missing environment variable" error
- Double-check all 8 environment variables are set in Render
- Click "Manual Deploy" → "Clear build cache & deploy"

### CORS errors
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Check for typos (no trailing slashes)

### Database connection failed
- Verify Supabase credentials
- Check Supabase project is running
- Run the setup SQL in Supabase

### Email not sending
- Verify Resend API key
- Check domain is verified in Resend
- Check Render logs for error details

### Service sleeping (Free tier)
- First request after 15 min may take 30s to wake up
- Upgrade to paid plan to prevent sleeping
- Or use a cron job to ping `/health` every 10 minutes

---

## Custom Domain (Optional)

### On Render:
1. Settings → Custom Domains
2. Add your domain: `api.astrivya.ai`
3. Follow DNS configuration instructions

### Update Frontend:
```
REACT_APP_API_URL=https://api.astrivya.ai
```

---

## Monitoring & Logs

### View Logs:
- Render Dashboard → Logs tab
- Real-time logs of all requests

### Set up Alerts:
- Render Dashboard → Notifications
- Get notified of deployment failures

### Check Metrics:
- Render Dashboard → Metrics tab
- CPU, Memory, Request rate

---

## Cost Optimization

### Free Tier:
- ✅ Good for testing
- ⚠️ Sleeps after 15 min
- ⚠️ 750 hours/month limit

### Upgrade ($7/month):
- ✅ No sleeping
- ✅ More resources
- ✅ Better performance

---

## Security Checklist

- [ ] All environment variables set
- [ ] JWT_SECRET is 32+ characters
- [ ] CORS only includes your domains (no `*`)
- [ ] Supabase RLS policies configured
- [ ] Resend domain verified
- [ ] HTTPS enabled (automatic on Render)

---

## Next Steps After Deployment

1. ✅ Test full signup flow
2. ✅ Monitor logs for 24 hours
3. ✅ Set up uptime monitoring (UptimeRobot, etc.)
4. ✅ Configure domain if desired
5. ✅ Set up staging environment (optional)

---

## Support

- **Render Issues**: [render.com/docs](https://render.com/docs)
- **Deployment Help**: team@astrivya.ai

---

**Your backend will be live at**: `https://astrivya-backend.onrender.com` 🚀
