# 🚨 URGENT: Fix 401 OAuth Error

## Problem
You're getting "OAuth client was not found" error because the **redirect URI** isn't configured in your Google OAuth client.

## ✅ Quick Fix (2 minutes)

### Step 1: Configure Redirect URIs
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth client: `863578905324-u8qv0rsqs0cjq8ehaftjtcdfucm9rs6u.apps.googleusercontent.com`
4. In **Authorized redirect URIs**, click **+ ADD URI** and add:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3001/api/auth/callback/google
   ```
5. Click **SAVE**

### Step 2: Configure OAuth Consent Screen (if needed)
1. Go to **OAuth consent screen** in the same console
2. If app is "In production", change to "Testing"
3. Under **Test users**, add your email: `thoriqnfaizal@gmail.com`
4. Click **SAVE**

### Step 3: Test
1. Restart your dev server: `npm run dev`
2. Visit: http://localhost:3000/demo/day-7/session-2
3. Click "Sign In with Google"
4. Should now work! ✅

## Why This Happens
Google OAuth requires explicit authorization of redirect URLs for security. Without the correct redirect URI, Google doesn't know where to send the authentication response, resulting in a 401 error.

## Expected Flow After Fix
1. Click "Sign In" → Redirects to Google
2. Google OAuth consent screen appears
3. Grant permissions
4. Redirected back to your app with authentication
5. User profile displays, protected routes accessible

Your credentials are correct - just need this redirect URI configuration!