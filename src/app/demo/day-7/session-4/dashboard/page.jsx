import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">🏠 Protected Dashboard</h1>
              <p className="text-gray-300">
                This page is only accessible to authenticated users
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Authenticated as:</p>
              <p className="font-semibold">{session.user?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-900 border-b border-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="font-semibold text-green-300">Secure Area</h3>
              <p className="text-sm text-green-200">
                This content is protected by server-side authentication
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">
              Welcome back, {session.user?.name}!
            </h2>
            <p className="text-blue-200 text-lg">
              You've successfully accessed a protected area of the application.
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>👤</span>
              Your Profile
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-lg">{session.user?.name}</h4>
                  <p className="text-gray-400">{session.user?.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-600">
                <div>
                  <p className="text-sm text-gray-400">User ID</p>
                  <p className="font-mono text-sm">{session.user?.id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Login Method</p>
                  <p className="text-sm">Google OAuth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>🔍</span>
              Session Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Session Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Authentication Method</p>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">🔐</span>
                  <span>NextAuth.js + Google Provider</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">Protection Level</p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🛡️</span>
                  <span>Server-side Verification</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-600">
                <p className="text-sm text-gray-400 mb-2">Raw Session Data</p>
                <pre className="text-xs bg-black rounded p-3 overflow-x-auto text-green-300">
                  {JSON.stringify(
                    {
                      name: session.user?.name,
                      email: session.user?.email,
                      id: session.user?.id,
                      expires: session.expires,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Features Demonstration */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>✨</span>
            Protected Features Demo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold mb-1">Analytics</h4>
              <p className="text-sm text-gray-400">
                View your personal analytics dashboard
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                View Stats
              </button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚙️</div>
              <h4 className="font-semibold mb-1">Settings</h4>
              <p className="text-sm text-gray-400">
                Manage your account preferences
              </p>
              <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm">
                Open Settings
              </button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold mb-1">Messages</h4>
              <p className="text-sm text-gray-400">
                Access your private messages
              </p>
              <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                View Messages
              </button>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-yellow-300 flex items-center gap-2">
            <span>🔒</span>
            How This Page is Protected
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-200 mb-2">Server-Side Protection</h4>
              <ul className="text-sm text-yellow-100 space-y-1">
                <li>• Session checked before page renders</li>
                <li>• Automatic redirect if not authenticated</li>
                <li>• No content exposed to unauthorized users</li>
                <li>• Server-side session validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-200 mb-2">Code Implementation</h4>
              <div className="bg-black rounded p-3 text-xs">
                <pre className="text-green-300">
{`const session = await getServerSession(authOptions);

if (!session) {
  redirect('/api/auth/signin');
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <div className="space-x-4">
            <a
              href="/demo/day-7/session-2"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Auth Demo
            </a>
            <a
              href="/api/auth/signout"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              🚪 Sign Out
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            🛡️ This page demonstrates server-side route protection with NextAuth.js
          </p>
        </div>
      </footer>
    </div>
  );
}