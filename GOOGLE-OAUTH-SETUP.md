# 🔐 Google OAuth Setup Guide for NextAuth.js

This guide will help you set up proper Google OAuth 2.0 credentials for the Session 2 authentication demo.

## 🚨 Important: API Key vs OAuth Credentials

**Current Issue**: You have a Google API key (`AIzaSyA-qg3d6ghJeo3vHi_Z5QgcFBR2DP2ucMo`), but NextAuth.js requires OAuth 2.0 credentials.

| Type | Purpose | Format | Use Case |
|------|---------|--------|----------|
| **API Key** | Server-to-server API calls | `AIza...` | Calling Google Maps, YouTube APIs |
| **OAuth Client ID** | User authentication | `123...apps.googleusercontent.com` | User sign-in/sign-up |
| **OAuth Client Secret** | OAuth security | Random string | Secure OAuth flow |

## 📋 Step-by-Step OAuth Setup

### Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your existing project (or create a new one)
3. Navigate to **APIs & Services** → **Credentials**

### Step 2: Enable Required APIs

1. Go to **APIs & Services** → **Library**
2. Search for and enable:
   - **Google+ API** (for basic profile info)
   - **People API** (recommended for profile data)

### Step 3: Create OAuth 2.0 Credentials

1. In **Credentials**, click **+ CREATE CREDENTIALS**
2. Select **OAuth 2.0 Client IDs**
3. If prompted, configure the OAuth consent screen first:
   - **User Type**: External (for testing)
   - **App name**: "NextAuth Demo" (or your preferred name)
   - **User support email**: Your email
   - **Developer contact**: Your email
   - **Scopes**: Add `../auth/userinfo.email` and `../auth/userinfo.profile`
   - **Test users**: Add your email for testing

### Step 4: Configure OAuth Client

1. **Application type**: Web application
2. **Name**: "NextAuth.js Demo Client"
3. **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `http://localhost:3001` (backup port)
4. **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3001/api/auth/callback/google`

### Step 5: Copy Credentials

After creation, you'll see:
- **Client ID**: `123456789-abcdef.apps.googleusercontent.com`
- **Client Secret**: `GOCSPz-random_string_here`

**Download the JSON file** for backup!

## 🔧 Update Your Environment

Replace the contents of your `.env.local` file:

```bash
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth 2.0 Credentials (REPLACE THESE!)
GOOGLE_CLIENT_ID=YOUR_OAUTH_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_OAUTH_CLIENT_SECRET_HERE

# Optional: Keep your API key for other Google services
GOOGLE_API_KEY=AIzaSyA-qg3d6ghJeo3vHi_Z5QgcFBR2DP2ucMo
```

### Generate a Secure NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

## ✅ Testing Your Setup

### 1. Restart Your Development Server

```bash
npm run dev
```

### 2. Test the Authentication Flow

1. Visit: `http://localhost:3000/demo/day-7/session-2`
2. Click **"Sign In with Google"**
3. You should be redirected to Google's OAuth screen
4. Grant permissions and return to your app
5. You should see your profile information

### 3. Verify Protected Routes

1. Visit: `http://localhost:3000/demo/day-7/session-2/dashboard`
2. Should redirect to Google sign-in if not authenticated
3. After sign-in, should display the protected dashboard

## 🐛 Troubleshooting Common Issues

### Error: "OAuth Error"

**Cause**: Incorrect Client ID/Secret or redirect URI mismatch

**Solution**:
1. Double-check your Client ID and Secret in `.env.local`
2. Verify redirect URI exactly matches: `http://localhost:3000/api/auth/callback/google`
3. Ensure no extra spaces or characters

### Error: "Access blocked: This app's request is invalid"

**Cause**: OAuth consent screen not properly configured

**Solution**:
1. Go to **OAuth consent screen** in Google Console
2. Ensure app is published or add yourself as a test user
3. Add required scopes: `userinfo.email` and `userinfo.profile`

### Error: "redirect_uri_mismatch"

**Cause**: Redirect URI doesn't match Google Console configuration

**Solution**:
1. Check the exact error message for the URI it received
2. Add that exact URI to **Authorized redirect URIs** in Google Console
3. Common URIs to add:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3001/api/auth/callback/google` (if using port 3001)

### Error: "App domain is not verified"

**Cause**: Domain verification required for production

**Solution**:
- For development: Add your email as a test user
- For production: Complete domain verification process

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to version control
- ✅ Use different credentials for development/production
- ✅ Rotate secrets regularly
- ✅ Use strong, random NextAuth secrets

### OAuth Configuration
- ✅ Restrict redirect URIs to your domains only
- ✅ Use HTTPS in production
- ✅ Regularly review OAuth consent screen permissions
- ✅ Monitor usage in Google Cloud Console

### API Key Security
- ✅ Restrict your API key to specific APIs and domains
- ✅ Use different keys for different environments
- ✅ Monitor API usage for unexpected activity

## 🎯 Expected Results

After proper setup, you should have:

1. **Working Google Sign-In** - Users can authenticate with their Google accounts
2. **Session Persistence** - Login state maintained across page reloads
3. **Protected Routes** - Dashboard only accessible when authenticated
4. **User Profile Data** - Name, email, and profile picture displayed
5. **Secure Sign-Out** - Clean session termination

## 🆘 Need Help?

### Quick Debug Checklist

- [ ] OAuth Client ID format: `xxxxx.apps.googleusercontent.com`
- [ ] OAuth Client Secret is not empty
- [ ] Redirect URI exactly matches Google Console
- [ ] APIs are enabled (Google+ API, People API)
- [ ] Your email is added as test user
- [ ] `.env.local` file is in project root
- [ ] Development server restarted after `.env.local` changes

### Debug Page

Visit the test page to see detailed debug information:
`http://localhost:3000/demo/day-7/session-2/test`

This page shows:
- Current environment variables (safely masked)
- Session status and data
- Component functionality tests

---

## 🔄 Quick Setup Summary

1. **Google Console** → **Credentials** → **Create OAuth 2.0 Client IDs**
2. **Application type**: Web application
3. **Redirect URI**: `http://localhost:3000/api/auth/callback/google`
4. **Copy Client ID & Secret** to `.env.local`
5. **Restart dev server** and test!

**Time needed**: ~5-10 minutes for first-time setup

---

**Need immediate help?** Check the troubleshooting section or create a new OAuth client to start fresh.