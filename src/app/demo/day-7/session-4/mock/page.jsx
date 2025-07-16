"use client";

import { useState, useEffect } from "react";

export default function MockAuthDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing mock session on load
  useEffect(() => {
    const mockSession = localStorage.getItem('mockAuthSession');
    if (mockSession) {
      const sessionData = JSON.parse(mockSession);
      setIsAuthenticated(true);
      setUser(sessionData.user);
    }
  }, []);

  const mockSignIn = async () => {
    setIsLoading(true);
    
    // Simulate OAuth flow delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUser = {
      id: "mock-user-123",
      name: "Demo User",
      email: "demo@example.com",
      image: "https://via.placeholder.com/64/4F46E5/FFFFFF?text=DU",
      provider: "Mock Google OAuth"
    };
    
    // Store mock session
    const sessionData = {
      user: mockUser,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      accessToken: "mock-access-token-" + Date.now()
    };
    
    localStorage.setItem('mockAuthSession', JSON.stringify(sessionData));
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const mockSignOut = () => {
    localStorage.removeItem('mockAuthSession');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🎭 Mock Authentication Demo</h1>
            <p className="text-xl text-gray-300 mb-6">
              Experience the authentication flow without real OAuth setup
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded text-sm">
              <span>🧪</span>
              Demo Mode - No Real Google Authentication
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-blue-900 border-b border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-blue-800 rounded-lg p-6 border border-blue-600">
            <div className="flex items-start gap-4">
              <div className="text-3xl">ℹ️</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-200 mb-2">
                  Mock Authentication System
                </h3>
                <p className="text-blue-100 mb-4">
                  This demo simulates the authentication flow without requiring real Google OAuth credentials. 
                  Perfect for understanding the concepts before setting up real authentication.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-200 mb-2">What This Demo Shows:</h4>
                    <ul className="text-sm text-blue-100 space-y-1">
                      <li>• Authentication state management</li>
                      <li>• Login/logout user flows</li>
                      <li>• Protected content patterns</li>
                      <li>• Session persistence (localStorage)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-200 mb-2">For Real OAuth:</h4>
                    <ul className="text-sm text-blue-100 space-y-1">
                      <li>📖 <a href="/GOOGLE-OAUTH-SETUP.md" target="_blank" className="underline text-blue-300">Setup Guide</a></li>
                      <li>🔐 <a href="/demo/day-7/session-2" className="underline text-blue-300">Real OAuth Demo</a></li>
                      <li>🧪 <a href="/demo/day-7/session-2/test" className="underline text-blue-300">Test Configuration</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">🔍 Current Mock Session Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-600 rounded p-4">
                <h3 className="font-semibold mb-2">Authentication Status</h3>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm ${
                  isLoading ? 'bg-yellow-500 text-black' :
                  isAuthenticated ? 'bg-green-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {isLoading && '⏳'}
                  {isAuthenticated && '✅'}
                  {!isAuthenticated && !isLoading && '❌'}
                  {isLoading ? 'Signing in...' : isAuthenticated ? 'Authenticated' : 'Not authenticated'}
                </div>
              </div>
              
              <div className="bg-gray-600 rounded p-4">
                <h3 className="font-semibold mb-2">User</h3>
                <p className="text-sm">
                  {user?.name || 'No user session'}
                </p>
              </div>
              
              <div className="bg-gray-600 rounded p-4">
                <h3 className="font-semibold mb-2">Session Type</h3>
                <p className="text-sm text-blue-300">
                  Mock localStorage session
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">🎮 Try the Mock Authentication</h2>
          
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto bg-gray-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Mock Sign In</h3>
                <p className="text-gray-300 mb-6">
                  Click below to simulate the Google OAuth authentication flow
                </p>
              </div>
              
              <button
                onClick={mockSignIn}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isLoading 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Simulating Google OAuth...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Mock Sign In with Google
                  </>
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  This simulates a 2-second OAuth flow delay
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-green-900 border border-green-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2">Welcome, {user?.name}!</h3>
                <p className="text-green-300 mb-6">
                  Mock authentication successful! You can now access protected areas.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-800 rounded p-4">
                  <h4 className="font-semibold mb-2">Mock User Profile</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user?.image}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-green-300">{user?.email}</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-200">
                    Provider: {user?.provider}
                  </p>
                </div>
                
                <button
                  onClick={mockSignOut}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  🚪 Mock Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mock vs Real Comparison */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">🆚 Mock vs Real Authentication</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-blue-900 border border-blue-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span>🎭</span>
                Mock Authentication (Current)
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">No external dependencies</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Works immediately</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Demonstrates auth patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  <span className="text-sm">Uses localStorage (not secure)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span className="text-sm">No real user verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span className="text-sm">Demo purposes only</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-900 border border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                <span>🔐</span>
                Real OAuth Authentication
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Secure Google verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Real user data</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Production ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-sm">Industry standard security</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  <span className="text-sm">Requires OAuth setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠️</span>
                  <span className="text-sm">5-minute configuration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-bold mb-4">🔗 Explore Other Demos</h3>
          <div className="space-x-4">
            <a
              href="/demo/day-7/session-2"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              🔐 Real OAuth Demo
            </a>
            <a
              href="/demo/day-7/session-1"
              className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              📡 Session 1: APIs
            </a>
            <a
              href="/demo/day-7/session-3"
              className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              🌍 Session 3: i18n
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            🎭 Mock authentication demo - For educational purposes only
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Ready for real authentication? Follow the OAuth setup guide!
          </p>
        </div>
      </footer>
    </div>
  );
}