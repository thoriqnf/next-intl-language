"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Session2Demo() {
  const { data: session, status } = useSession();
  const [showDebug, setShowDebug] = useState(false);
  
  // Check if OAuth is properly configured
  const isOAuthConfigured = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && 
    !process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.includes('YOUR_OAUTH_CLIENT_ID_HERE');

  const AuthFlowStep = ({ step, title, description, isActive, isCompleted }) => (
    <div className={`p-4 rounded-lg border ${
      isActive ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' :
      isCompleted ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' :
      'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isCompleted ? 'bg-green-500 text-white' :
          isActive ? 'bg-blue-500 text-white' :
          'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
        }`}>
          {isCompleted ? '✓' : step}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Demo Header */}
      <div className="bg-gray-800 border-b border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Day 7 Session 2 Demo</h1>
            <p className="text-xl text-gray-300 mb-6">
              Next.js 15+ Authentication System with NextAuth.js
            </p>
            <div className="flex justify-center items-center gap-4">
              <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                🔐 Authentication
              </span>
              <span className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                🛡️ Route Protection
              </span>
              <span className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                👤 Session Management
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* OAuth Setup Notice */}
      <div className="bg-yellow-900 border-b border-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-yellow-800 rounded-lg p-6 border border-yellow-600">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-200 mb-2">
                  OAuth Setup Required
                </h3>
                <p className="text-yellow-100 mb-4">
                  To test the authentication, you need to set up Google OAuth 2.0 credentials. 
                  The current configuration uses placeholder values.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">Quick Setup:</h4>
                    <ol className="text-sm text-yellow-100 space-y-1">
                      <li>1. Go to <a href="https://console.cloud.google.com/" target="_blank" className="underline text-yellow-300">Google Cloud Console</a></li>
                      <li>2. Create OAuth 2.0 Client IDs</li>
                      <li>3. Add redirect URI: <code className="bg-yellow-700 px-1 rounded">http://localhost:3000/api/auth/callback/google</code></li>
                      <li>4. Update <code className="bg-yellow-700 px-1 rounded">.env.local</code> with credentials</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">Resources:</h4>
                    <ul className="text-sm text-yellow-100 space-y-1">
                      <li>📖 <a href="/GOOGLE-OAUTH-SETUP.md" target="_blank" className="underline text-yellow-300">Detailed Setup Guide</a></li>
                      <li>🎭 <a href="/demo/day-7/session-2/mock" className="underline text-yellow-300">Try Mock Authentication</a></li>
                      <li>🧪 <a href="/demo/day-7/session-2/test" className="underline text-yellow-300">Test Configuration</a></li>
                      <li>🔍 <span className="cursor-pointer underline text-yellow-300" onClick={() => setShowDebug(!showDebug)}>Debug Info</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Auth Status */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🔍 Current Authentication Status</h2>
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
              >
                {showDebug ? 'Hide' : 'Show'} Debug Info
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-600 rounded p-4">
                <h3 className="font-semibold mb-2">Session Status</h3>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm ${
                  status === 'loading' ? 'bg-yellow-500 text-black' :
                  status === 'authenticated' ? 'bg-green-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {status === 'loading' && '⏳'}
                  {status === 'authenticated' && '✅'}
                  {status === 'unauthenticated' && '❌'}
                  {status}
                </div>
              </div>
              
              <div className="bg-gray-600 rounded p-4">
                <h3 className="font-semibold mb-2">User</h3>
                <p className="text-sm">
                  {session?.user?.name || 'Not logged in'}
                </p>
              </div>
              
              <div className="bg-gray-600 rounded p-4">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm">
                  {session?.user?.email || 'No email available'}
                </p>
              </div>
            </div>

            {showDebug && (
              <div className="bg-black rounded p-4 mt-4">
                <h4 className="font-semibold mb-2">Debug Information</h4>
                <pre className="text-xs text-green-300 overflow-x-auto">
                  {JSON.stringify({ status, session }, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Authentication Flow Visualization */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">🏠 Authentication Flow</h2>
          <p className="text-center text-gray-300 mb-8">
            Think of authentication like a security system for your house
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AuthFlowStep
              step="1"
              title="🚪 Login Page"
              description="User arrives at the front door"
              isActive={status === 'unauthenticated'}
              isCompleted={status === 'authenticated'}
            />
            <AuthFlowStep
              step="2"
              title="🔑 Google OAuth"
              description="User provides credentials"
              isActive={status === 'loading'}
              isCompleted={status === 'authenticated'}
            />
            <AuthFlowStep
              step="3"
              title="🛡️ NextAuth.js"
              description="Security system verifies identity"
              isActive={status === 'loading'}
              isCompleted={status === 'authenticated'}
            />
            <AuthFlowStep
              step="4"
              title="🏡 Protected App"
              description="Access granted to secure areas"
              isActive={false}
              isCompleted={status === 'authenticated'}
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">🎮 Try It Yourself</h2>
          
          {status === 'loading' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-300">Loading authentication status...</span>
              </div>
            </div>
          )}

          {status === 'unauthenticated' && (
            <div className="max-w-md mx-auto bg-gray-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">You're Not Logged In</h3>
                <p className="text-gray-300 mb-6">
                  Experience the authentication flow by signing in with Google
                </p>
              </div>
              
              <button
                onClick={() => signIn('google')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                Sign In with Google
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  This will redirect you to Google's secure login page
                </p>
              </div>
            </div>
          )}

          {status === 'authenticated' && (
            <div className="max-w-md mx-auto bg-green-900 border border-green-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2">Welcome, {session.user?.name}!</h3>
                <p className="text-green-300 mb-6">
                  You're successfully authenticated. Now you can access protected areas!
                </p>
              </div>
              
              <div className="space-y-3">
                <a
                  href="/demo/day-7/session-2/dashboard"
                  className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  🏠 Visit Protected Dashboard
                </a>
                
                <button
                  onClick={() => signOut()}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">✨ Authentication Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="font-semibold mb-2">Secure Login</h3>
              <p className="text-sm text-gray-400">Google OAuth integration for secure authentication</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold mb-2">Route Protection</h3>
              <p className="text-sm text-gray-400">Protect pages and control access to content</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="font-semibold mb-2">Session Management</h3>
              <p className="text-sm text-gray-400">Maintain user state across page navigation</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-400">Instant UI updates based on auth status</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">💻 How It Works</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-blue-400">Client-Side Authentication</h3>
              <pre className="text-sm text-green-400 overflow-x-auto">
{`import { useSession, signIn, signOut } from "next-auth/react"

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
}`}
              </pre>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-purple-400">Server-Side Protection</h3>
              <pre className="text-sm text-green-400 overflow-x-auto">
{`import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  )
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-gray-400">Built with Next.js 15 + NextAuth.js</span>
          </div>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/" className="text-blue-400 hover:text-blue-300">← Back to Home</a>
            <a href="/demo/day-7/session-1" className="text-gray-400 hover:text-white">Session 1: APIs</a>
            <a href="/demo/day-7/session-3" className="text-gray-400 hover:text-white">Session 3: i18n</a>
          </div>
        </div>
      </footer>
    </div>
  );
}