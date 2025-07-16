"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/demo/day-7/session-2';

  useEffect(() => {
    // Check for error in URL params
    const error = searchParams.get('error');
    if (error) {
      setError(error);
    }
  }, [searchParams]);

  const handleSignIn = async (provider) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await signIn(provider, {
        callbackUrl,
        redirect: false,
      });
      
      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Main Sign In Card */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">
              Sign in to access the protected demo area
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-red-400">❌</span>
                <span className="text-red-300 text-sm">
                  {error === 'OAuthSignin' && 'Error connecting to Google. Please try again.'}
                  {error === 'OAuthCallback' && 'Error during Google authentication.'}
                  {error === 'OAuthCreateAccount' && 'Could not create account.'}
                  {error === 'EmailCreateAccount' && 'Could not create account.'}
                  {error === 'Callback' && 'Authentication callback error.'}
                  {error === 'OAuthAccountNotLinked' && 'Account not linked. Please try a different method.'}
                  {error === 'EmailSignin' && 'Check your email for the sign in link.'}
                  {error === 'CredentialsSignin' && 'Sign in failed. Check your credentials.'}
                  {error === 'SessionRequired' && 'Please sign in to access this page.'}
                  {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'OAuthAccountNotLinked', 'EmailSignin', 'CredentialsSignin', 'SessionRequired'].includes(error) && error}
                </span>
              </div>
            </div>
          )}

          {/* Sign In Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleSignIn('google')}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Continue with Google
                </div>
              )}
            </button>

            <button
              onClick={() => handleSignIn('github')}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 border border-gray-600 ${
                isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-900 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">🐙</span>
                  Continue with GitHub
                </div>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <span>🛡️</span>
              Secure Authentication
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Powered by NextAuth.js</li>
              <li>• Uses Google & GitHub OAuth 2.0</li>
              <li>• No passwords stored</li>
              <li>• Secure session management</li>
            </ul>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-yellow-900 border border-yellow-600 rounded-lg">
            <h3 className="text-sm font-semibold text-yellow-300 mb-2 flex items-center gap-2">
              <span>🧪</span>
              Demo Environment
            </h3>
            <p className="text-xs text-yellow-200">
              This is a demonstration of NextAuth.js authentication. 
              In a production environment, you would configure proper Google and GitHub OAuth credentials.
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <div className="space-x-4 text-sm">
            <a
              href="/demo/day-7/session-2"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Demo
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </a>
          </div>
        </div>

        {/* Authentication Flow Info */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            🔄 Authentication Flow
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span className="text-gray-300 text-sm">Choose Google or GitHub sign-in</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-gray-300 text-sm">Redirect to provider's secure login</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-gray-300 text-sm">Provider verifies your identity</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span className="text-gray-300 text-sm">Return to protected dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}