# Day 7 Session 2: NextAuth.js Authentication Demo

Complete authentication system implementation using NextAuth.js with Google OAuth for Next.js 15+.

## 🚀 Demo URLs

- **Main Demo**: http://localhost:3000/demo/day-7/session-2
- **Mock Authentication** ⭐: http://localhost:3000/demo/day-7/session-2/mock (Works now!)
- **Protected Dashboard**: http://localhost:3000/demo/day-7/session-2/dashboard
- **Custom Sign-in**: http://localhost:3000/demo/day-7/session-2/auth/signin
- **Component Test**: http://localhost:3000/demo/day-7/session-2/test

## 🛠️ Setup Requirements

### 1. Environment Variables

The `.env.local` file has been created with basic configuration:

```bash
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=AIzaSyA-qg3d6ghJeo3vHi_Z5QgcFBR2DP2ucMo
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Google OAuth Setup

**Important**: The provided credential appears to be a Google API key, not OAuth credentials. For full functionality:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API" 
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to `.env.local`

## 📁 File Structure

```
src/app/demo/day-7/session-2/
├── page.jsx                    # Main authentication demo
├── dashboard/
│   └── page.jsx               # Protected route example
├── auth/
│   └── signin/
│       └── page.jsx           # Custom sign-in page
├── components/
│   ├── AuthStatus.jsx         # Authentication status display
│   ├── LoginButton.jsx        # Reusable login/logout button
│   └── UserProfile.jsx        # User profile component
└── test/
    └── page.jsx              # Component testing page

lib/
└── auth.js                   # NextAuth.js configuration

src/app/api/auth/[...nextauth]/
└── route.js                  # NextAuth.js API route

src/components/
└── AuthProvider.jsx         # Session provider wrapper
```

## 🎯 Features Demonstrated

### Authentication Flow
- **Google OAuth Integration** - Secure third-party authentication
- **Session Management** - Persistent login state across pages
- **Route Protection** - Server-side authentication checks
- **Custom Sign-in Pages** - Branded authentication experience

### Security Features
- **Server-side Protection** - Pages protected at the server level
- **Session Validation** - Automatic session verification
- **Secure Redirects** - Proper callback handling
- **Error Handling** - Comprehensive error states

### User Experience
- **Real-time Updates** - Instant UI changes based on auth state
- **Loading States** - Smooth authentication transitions
- **Responsive Design** - Works on all device sizes
- **Debug Information** - Developer-friendly session details

## 🧪 Testing the Demo

### 1. Basic Authentication
1. Visit the main demo page
2. Click "Sign In with Google"
3. Complete the OAuth flow
4. Observe the real-time UI updates

### 2. Protected Routes
1. While logged out, try to visit `/dashboard`
2. You'll be redirected to sign-in
3. After authentication, you'll access the dashboard
4. Test sign-out functionality

### 3. Component Testing
1. Visit the test page: `/test`
2. Test different button variants
3. View debug information
4. Verify all components work correctly

## 💻 Code Examples

### Client-Side Authentication Check
```javascript
import { useSession, signIn, signOut } from "next-auth/react"

function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <p>Loading...</p>
  
  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

### Server-Side Route Protection
```javascript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return <div>Protected content for {session.user?.name}</div>
}
```

## 🔧 Configuration Details

### NextAuth.js Configuration (`lib/auth.js`)
- Google OAuth provider setup
- Custom sign-in page routing
- Session and JWT callbacks
- Secure secret configuration

### API Routes (`src/app/api/auth/[...nextauth]/route.js`)
- NextAuth.js handler setup
- GET and POST method exports
- Integration with auth configuration

### Session Provider (`src/components/AuthProvider.jsx`)
- Wraps the entire app with session context
- Enables useSession hook throughout the app
- Client-side session management

## 🎨 UI Components

### AuthStatus Component
- Displays current authentication status
- Shows user information when logged in
- Real-time status updates

### LoginButton Component
- Multiple size variants (default, large, compact)
- Optional user information display
- Loading states during authentication

### UserProfile Component
- Complete user profile display
- Session details and permissions
- Debug information for developers

## 🚨 OAuth Credential Issue & Solutions

### ✅ RESOLVED: OAuth Credentials Configured
Real Google OAuth 2.0 credentials have been set up and configured:
- **Client ID**: `863578905324-u8qv0rsqs0cjq8ehaftjtcdfucm9rs6u.apps.googleusercontent.com`
- **Client Secret**: Securely configured in `.env.local`
- **Status**: ✅ Ready for authentication testing

### Quick Solutions

#### ✅ COMPLETED: Real OAuth Setup 
1. ✅ **OAuth credentials created** in Google Cloud Console
2. ✅ **Environment configured** with real Client ID and Secret
3. ✅ **NextAuth secret generated** securely
4. 🧪 **Ready for testing** - Visit: http://localhost:3001/demo/day-7/session-2

#### Option 2: Try Mock Authentication (Works Now) 🎭
- **Demo URL**: http://localhost:3000/demo/day-7/session-2/mock
- **No setup required** - works immediately
- **Simulates OAuth flow** using localStorage
- **Perfect for learning** authentication concepts

### Troubleshooting Guide

#### "Configuration Error" Issues
```bash
# Check your .env.local file
GOOGLE_CLIENT_ID=your-real-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-real-client-secret
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
```

#### "OAuth Error" in Browser
1. **Verify redirect URI** in Google Console matches exactly:
   - `http://localhost:3000/api/auth/callback/google`
2. **Check OAuth consent screen** is configured
3. **Add yourself as test user** during development

#### "App Domain Not Verified"
- **Development**: Add your email as test user in OAuth consent screen
- **Production**: Complete domain verification process

## 🚨 Important Notes

1. **OAuth vs API Key**: Use OAuth credentials for authentication, keep API key for other Google services
2. **Production Setup**: Replace `NEXTAUTH_SECRET` with a secure random string
3. **Secure Configuration**: Never commit `.env.local` to version control
4. **HTTPS Requirements**: Google OAuth requires HTTPS in production

## 🎯 Learning Outcomes

After using this demo, you'll understand:

- ✅ NextAuth.js setup and configuration
- ✅ Google OAuth integration 
- ✅ Server-side route protection
- ✅ Client-side session management
- ✅ Custom authentication UI
- ✅ Error handling and debugging
- ✅ Security best practices

## 🔗 Related Sessions

- **Session 1**: API Route Handlers and CRUD operations
- **Session 3**: Internationalization (i18n) with next-intl

---

**Built with Next.js 15+ and NextAuth.js** | **Dark Theme Edition** | **Learning Demo**