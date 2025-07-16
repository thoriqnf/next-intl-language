# 🔐 NextAuth.js OAuth Setup Guide

Complete guide for setting up Google and GitHub authentication with NextAuth.js

## 📁 Current File Structure

We are using **Day 7 Session 3** (NOT Session 2):

```
src/app/demo/day-7/session-3/simple/page.jsx  ← Main authentication page
lib/auth.js                                   ← NextAuth configuration
.env.local                                    ← Environment variables
```

### 🔄 What Changed
- **Old**: `/demo/day-7/session-2/auth/signin` (complex page, removed)
- **New**: `/demo/day-7/session-3/simple` (clean interface with both login states)

## 🚨 Current Issue: GitHub OAuth Callback Error

### Error Message:
```
[next-auth][error][OAUTH_CALLBACK_ERROR] 
no access token provided {
  error: [Error [OAuthCallbackError]: no access token provided],
  providerId: 'github'
}
```

### Root Cause:
Your GitHub OAuth app redirect URI doesn't match the current setup.

## 🛠️ Quick Fix for GitHub OAuth

### Step 1: Update GitHub OAuth App Settings

1. **Go to GitHub Settings:**
   - GitHub.com → Settings → Developer settings → OAuth Apps
   - Or direct link: https://github.com/settings/applications

2. **Find Your OAuth App:**
   - Client ID: `Ov23liqk4KV86AwWd4Mb`

3. **Update Authorization Callback URL:**
   ```
   http://localhost:3000/api/auth/callback/github
   ```

4. **Verify App Settings:**
   - Application name: (any name)
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Step 2: Restart Development Server
```bash
npm run dev
# or
yarn dev
```

## 📋 Complete Setup Guide

### 1. Environment Variables (`.env.local`)

Current configuration:
```env
# NextAuth.js Configuration
NEXTAUTH_SECRET=/WUdLiWiwyZqvSYUkNbXGHCCPpPu2MMAsqd01dJs/gA=
NEXTAUTH_URL=http://localhost:3000

# Google OAuth 2.0 Credentials ✅ Working
GOOGLE_CLIENT_ID=1051204369137-emm3o1cdq6rmv11bgfbb0u6j2jlna3tl.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# GitHub OAuth 2.0 Credentials ❌ Needs redirect URI fix
GITHUB_CLIENT_ID=Ov23liqk4KV86AwWd4Mb
GITHUB_CLIENT_SECRET=737611bdf61433dae56074eba97f5515a0eb815d
```

### 2. Google OAuth Setup (Already Working ✅)

Your Google OAuth is configured correctly with:
- **Redirect URI**: `http://localhost:3000/api/auth/callback/google`
- **Status**: ✅ Working

### 3. GitHub OAuth Setup (Needs Fix ❌)

#### Create GitHub OAuth App:
1. Go to https://github.com/settings/applications
2. Click "New OAuth App"
3. Fill in details:
   - **Application name**: `NextAuth Demo App`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Save and copy Client ID and Client Secret

#### Update Existing App:
1. Find app with Client ID: `Ov23liqk4KV86AwWd4Mb`
2. Edit settings
3. Update **Authorization callback URL** to: `http://localhost:3000/api/auth/callback/github`

## 🎯 Authentication Flow

### Current Setup:
```
User visits: http://localhost:3000/demo/day-7/session-3/simple
↓
Clean login interface (Google + GitHub buttons)
↓ 
User clicks provider → OAuth flow → NextAuth callback
↓
Redirect back to: /demo/day-7/session-3/simple (with session)
↓
Show authenticated user profile
```

### File Responsibilities:
- **`/simple/page.jsx`**: Handles both login UI and success UI
- **`/lib/auth.js`**: NextAuth configuration and callbacks
- **`.env.local`**: OAuth credentials and secrets

## 🔧 Troubleshooting

### 1. "no access token provided" Error

**Cause**: GitHub OAuth app redirect URI mismatch

**Fix**: Update GitHub OAuth app Authorization callback URL to:
```
http://localhost:3000/api/auth/callback/github
```

### 2. "OAUTH_CALLBACK_ERROR" General

**Debug Steps**:
1. Check browser Network tab for failed requests
2. Verify environment variables are loaded
3. Check OAuth app status (active/approved)
4. Clear browser cache and cookies
5. Restart development server

### 3. Redirect Loop

**Cause**: Callback URL configuration issue

**Fix**: Ensure NextAuth redirect and OAuth app callback URLs match exactly

### 4. Google Works but GitHub Doesn't

**Cause**: Different OAuth app configurations

**Check**:
- Google callback: `http://localhost:3000/api/auth/callback/google` ✅
- GitHub callback: `http://localhost:3000/api/auth/callback/github` ❌

## 🧪 Testing Authentication

### 1. Test Google OAuth:
1. Visit: `http://localhost:3000/demo/day-7/session-3/simple`
2. Click "Continue with Google"
3. Should redirect and show profile info

### 2. Test GitHub OAuth:
1. Visit: `http://localhost:3000/demo/day-7/session-3/simple`
2. Click "Continue with GitHub"
3. Should redirect and show profile info

### 3. Debug Mode:
Enable debug logging in `/lib/auth.js`:
```javascript
debug: process.env.NODE_ENV === 'development'
```

## 📂 Project Structure

```
day-2-next/
├── .env.local                          # OAuth credentials
├── lib/auth.js                         # NextAuth config
├── src/app/
│   ├── api/auth/[...nextauth]/route.js # NextAuth API route
│   └── demo/day-7/session-3/
│       ├── page.jsx                    # Demo page
│       └── simple/page.jsx             # 🎯 Main auth page
└── AUTH-SETUP-README.md                # This file
```

## 🔄 Migration Notes

### What We Changed:
1. **Removed**: Complex signin page at `/session-2/auth/signin`
2. **Simplified**: Single page handles login + success states
3. **Updated**: Auth config points to `/session-3/simple`
4. **Enhanced**: Error handling and debug mode

### Current Status:
- ✅ Google OAuth: Working perfectly
- ❌ GitHub OAuth: Needs redirect URI fix
- ✅ Clean UI: Single page with both states
- ✅ Error handling: Enhanced debugging

## 🚀 Next Steps

1. **Fix GitHub OAuth**: Update redirect URI as described above
2. **Test Both Providers**: Verify Google and GitHub work
3. **Optional**: Set up production OAuth apps for deployment

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify `.env.local` variables are loaded
3. Ensure OAuth apps are active and approved
4. Clear browser cache and restart server

---

**Last Updated**: July 16, 2025  
**Version**: Session 3 Simple Auth  
**Status**: Google ✅ | GitHub ❌ (redirect URI fix needed)