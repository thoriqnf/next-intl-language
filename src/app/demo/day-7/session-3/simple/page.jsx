"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SimplePage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);

  const addDebugLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = { timestamp, message, data };
    console.log(`🐛 [${timestamp}] ${message}`, data);
    setDebugInfo(prev => [...prev.slice(-9), logEntry]); // Keep last 10 entries
  };

  useEffect(() => {
    setMounted(true);
    addDebugLog('Component mounted');
  }, []);

  useEffect(() => {
    addDebugLog('Session status changed', { status, hasSession: !!session });
    if (session) {
      addDebugLog('Session data received', {
        email: session.user?.email,
        provider: session.user?.provider,
        hasImage: !!session.user?.image
      });
    }
  }, [session, status]);

  const handleImageError = () => {
    setImageError(true);
    addDebugLog('Profile image failed to load');
  };

  const handleSignIn = async (provider) => {
    addDebugLog(`Starting ${provider} sign-in`);
    try {
      const result = await signIn(provider, { 
        callbackUrl: '/demo/day-7/session-3/simple',
        redirect: false
      });
      addDebugLog(`SignIn result for ${provider}`, result);
      
      if (result?.error) {
        addDebugLog(`SignIn error for ${provider}`, result.error);
      } else if (result?.url) {
        addDebugLog(`Redirecting to ${provider} OAuth`, result.url);
        window.location.href = result.url;
      }
    } catch (error) {
      addDebugLog(`SignIn exception for ${provider}`, error.message);
      console.error('SignIn exception:', error);
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-green-400">
              ✅ Authentication Successful
            </h1>
            <p className="text-gray-300 mt-2">
              OAuth authentication completed successfully
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Welcome back!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Profile */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-400">User Profile</h3>
                
                <div className="flex items-center space-x-4">
                  {session.user.image && !imageError ? (
                    <img
                      src={session.user.image}
                      alt={`${session.user.name || 'User'} profile picture`}
                      className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover"
                      onError={handleImageError}
                      onLoad={() => setImageError(false)}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-gray-600 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email ? session.user.email.charAt(0).toUpperCase() : '👤'}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-400">Profile Picture</p>
                    <p className="text-green-400">
                      {session.user.image && !imageError 
                        ? `✓ Loaded from ${session.user.provider === 'github' ? 'GitHub' : session.user.provider === 'google' ? 'Google' : 'OAuth Provider'}` 
                        : '✓ Generated Avatar'}
                    </p>
                    {imageError && session.user.image && (
                      <p className="text-yellow-400 text-xs">⚠️ Using fallback avatar</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-medium">{session.user.name || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{session.user.email || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="font-mono text-sm bg-gray-700 p-2 rounded">
                      {session.user.id || 'Not available'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-400">Session Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Session Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Provider</p>
                    <div className="flex items-center space-x-2">
                      {session.user.provider === 'google' && (
                        <>
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="font-medium">Google OAuth 2.0</span>
                        </>
                      )}
                      {session.user.provider === 'github' && (
                        <>
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="font-medium">GitHub OAuth</span>
                        </>
                      )}
                      {!session.user.provider && (
                        <span className="font-medium">OAuth 2.0</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Authentication Method</p>
                    <p className="font-medium">OAuth Authorization Code Flow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  ← Go Back
                </button>
                
                <button
                  onClick={() => window.location.href = '/demo/day-7/session-3'}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Continue to Demo
                </button>
                
                <button
                  onClick={() => signOut({ callbackUrl: '/demo/day-7/session-2' })}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-yellow-400 mb-4">Debug Information</h3>
            
            {/* Real-time Debug Console */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-blue-400 mb-2">Real-time Debug Console</h4>
              <div className="bg-gray-900 p-3 rounded text-xs max-h-40 overflow-auto border border-gray-600">
                {debugInfo.map((log, index) => (
                  <div key={index} className="mb-1 text-green-400">
                    <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                    {log.data && <span className="text-blue-300"> {JSON.stringify(log.data)}</span>}
                  </div>
                ))}
                {debugInfo.length === 0 && (
                  <div className="text-gray-500">Debug logs will appear here...</div>
                )}
              </div>
            </div>
            
            {/* Session Data */}
            <details className="text-sm">
              <summary className="cursor-pointer text-gray-400 hover:text-white">
                View Session Data (for development)
              </summary>
              <pre className="mt-4 bg-gray-900 p-4 rounded text-xs overflow-auto border border-gray-600">
                {JSON.stringify(session, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-300 mb-6">
            You need to sign in to access this page.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleSignIn('google')}
              className="w-full flex items-center justify-center px-4 py-3 bg-white text-gray-900 rounded hover:bg-gray-100 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => handleSignIn('github')}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium border border-gray-700"
            >
              <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Choose your preferred sign-in method</p>
            </div>
            
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}