# Astrivya Production Deployment Guide

## Overview
This guide covers deploying the Astrivya marketing website to production at `https://astrivya.ai/`.

**⚠️ IMPORTANT: This application requires proper environment configuration. There are NO fallback values - all environment variables MUST be set or the application will fail with detailed error messages.**

## Architecture
- **Frontend**: React app deployed on Vercel
- **Backend**: Node.js/Express API (deploy separately to Railway, Render, or similar)
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend API

---

## Environment Variables

### Frontend (.env)

Copy `.env.example` to `.env` and configure:

```bash
# REQUIRED - Backend API URL
REACT_APP_API_URL=https://your-backend-api.com
```

**If this variable is not set, the app will throw an error with setup instructions in the console.**

### Backend (.env)

Copy `backend/.env.example` to `backend/.env` and configure all variables. See the example file for detailed documentation.

All 8 environment variables are **REQUIRED**:
- `NODE_ENV`
- `ALLOWED_ORIGINS`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `OTP_EXPIRY_MINUTES`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `RESEND_API_KEY`

**If any variable is missing, the server will refuse to start and display a detailed error message with setup instructions.**

---

## Frontend Deployment (Vercel)

### Prerequisites
1. Vercel account
2. GitHub repository connected to Vercel

### Steps

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

#### 2. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Create React App

#### 3. Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend-url.com` | Production |

> **Note**: Replace `https://your-backend-url.com` with your actual backend API URL once deployed.

#### 4. Deploy
- Vercel will automatically deploy on push to main
- Custom domain: Add `astrivya.ai` in Vercel → Settings → Domains

---

## Backend Deployment

### Recommended Platforms
- **Railway** (easiest, free tier available)
- **Render** (good free tier)
- **Heroku** (paid)
- **AWS/GCP** (advanced)

### Environment Variables Required

Copy from `backend/.env.production.example` and set these in your hosting platform:

```bash
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://astrivya.ai,https://www.astrivya.ai
JWT_SECRET=<generate-strong-secret>
JWT_EXPIRES_IN=7d
OTP_EXPIRY_MINUTES=10
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-key>
RESEND_API_KEY=<your-resend-key>
```

### Railway Deployment Example

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   cd backend
   railway init
   ```

3. **Add Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set ALLOWED_ORIGINS=https://astrivya.ai,https://www.astrivya.ai
   # ... add all other variables
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Get Backend URL**
   ```bash
   railway domain
   ```
   Use this URL as `REACT_APP_API_URL` in Vercel.

---

## Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Run the SQL from `backend/scripts/setup-database.sql` in Supabase SQL Editor
4. Get your project URL and anon key from Settings → API
5. Add to backend environment variables

---

## Email Setup (Resend)

1. Go to [resend.com](https://resend.com)
2. Add and verify your domain `astrivya.ai`
3. Create API key
4. Add to backend environment variables as `RESEND_API_KEY`
5. Update `from` email in `backend/routes/auth.js` to use your verified domain

---

## Production Checklist

### Before Deployment
- [ ] All environment variables configured
- [ ] Supabase database set up
- [ ] Resend domain verified
- [ ] Backend deployed and tested
- [ ] Frontend `REACT_APP_API_URL` points to backend
- [ ] CORS configured correctly in backend

### After Deployment
- [ ] Test waitlist registration flow
- [ ] Test OTP email delivery
- [ ] Test sign-in flow
- [ ] Check all links work
- [ ] Verify social media links
- [ ] Test on mobile devices
- [ ] Check page load performance
- [ ] Verify SSL certificate

---

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` in backend includes your frontend URL
- Check both `https://astrivya.ai` and `https://www.astrivya.ai` are included

### API Not Responding
- Verify backend is running: visit `https://your-backend-url/health`
- Check backend logs for errors
- Ensure environment variables are set correctly

### Emails Not Sending
- Verify Resend API key is correct
- Check domain is verified in Resend dashboard
- Review backend logs for email errors

### Build Failures
- Run `npm run build` locally first
- Check for any console errors
- Ensure all dependencies are in `package.json`

---

## Local Development

To run locally with production-like setup:

```bash
# Frontend
npm start  # Uses .env.development

# Backend
cd backend
npm start  # Uses .env
```

---

## Monitoring

### Recommended Tools
- **Vercel Analytics**: Built-in, enable in dashboard
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Uptime Robot**: Uptime monitoring

---

## Security Notes

1. **Never commit `.env` files** - they're gitignored
2. **Rotate secrets regularly** - especially JWT_SECRET
3. **Use strong JWT secrets** - minimum 32 characters
4. **Enable rate limiting** - already configured in backend
5. **Keep dependencies updated** - run `npm audit` regularly

---

## Support

For issues, contact: team@astrivya.ai
