# Google OAuth Setup Guide

This guide walks you through setting up Google OAuth 2.0 for Kalakariaan.

## Prerequisites

- Google Account
- Project on Google Cloud Console

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Name: `kalakariaan`
4. Click **Create**

---

## Step 2: Enable OAuth API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for **Google+ API** (or **Google People API**)
3. Click on it and press **Enable**

> Note: If Google+ API is not available, use **Google People API** for user info.

---

## Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (for production) or **Internal** (for G Suite users)
3. Fill in:
   - **App name**: Kalakariaan
   - **User support email**: your email
   - **Developer contact email**: your email
4. Click **Save and Continue**
5. Skip Scopes (or add `email`, `profile` if needed)
6. Skip Test users (unless testing with specific accounts)
7. Click **Back to Dashboard**

---

## Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Kalakariaan Web`
5. **Authorized redirect URIs**:
   ```
   http://localhost:5000/api/auth/google/callback
   https://your-railway-app.railway.app/api/auth/google/callback
   ```
6. Click **Create**
7. Copy your:
   - **Client ID**
   - **Client Secret**

---

## Step 5: Configure Environment Variables

### Backend (.env)

```env
# Railway/Production
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=https://your-railway-app.railway.app/api/auth/google/callback
```

### Frontend (.env)

```env
# Vercel
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_API_URL=https://your-railway-app.railway.app/api
```

---

## Step 6: Add Authorized Domains (Production)

1. Go to **OAuth consent screen**
2. Click **Edit App**
3. Under **Authorized domains**, add:
   - `vercel.app` (your frontend)
   - `railway.app` (your backend)
4. Save

---

## Testing Locally

1. Start your backend: `cd server && npm run dev`
2. Start frontend: `npm run dev`
3. Use Google Sign-In button on login page
4. After successful auth, you'll be redirected to role selection

---

## Troubleshooting

### Error: "invalid_client"
- Verify Client ID and Secret are correct
- Check redirect URIs match exactly

### Error: "redirect_uri_mismatch"
- Ensure callback URL in Google Console matches your `.env`
- Check for trailing slashes

### Error: "access_denied"
- OAuth consent screen not fully configured
- Or app is in "Testing" mode and user not added as test user

---

## Security Notes

- Keep `GOOGLE_CLIENT_SECRET` secure - never commit to git
- Rotate secrets periodically
- Use environment variables in all deployments