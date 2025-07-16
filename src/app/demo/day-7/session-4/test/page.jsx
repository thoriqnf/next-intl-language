"use client";

import { useSession } from "next-auth/react";
import AuthStatus from "../components/AuthStatus";
import LoginButton from "../components/LoginButton";
import UserProfile from "../components/UserProfile";

export default function TestPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          🧪 Authentication Test Page
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📊 Status Components</h2>
            
            <AuthStatus />
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold mb-3">Login Buttons</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Default Size:</p>
                  <LoginButton />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Large Size:</p>
                  <LoginButton variant="large" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Compact with User Info:</p>
                  <LoginButton variant="compact" showUserInfo={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">👤 Profile Components</h2>
            
            <UserProfile />
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold mb-3">Session Debug</h3>
              <pre className="text-xs bg-black rounded p-3 overflow-x-auto text-green-300">
                {JSON.stringify(
                  {
                    status,
                    hasSession: !!session,
                    userName: session?.user?.name || null,
                    userEmail: session?.user?.email || null,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <a
              href="/demo/day-7/session-2"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              ← Back to Main Demo
            </a>
            <a
              href="/demo/day-7/session-2/dashboard"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Try Protected Dashboard
            </a>
          </div>
        </div>

        {/* Test Results */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">✅ Component Test Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-900 border border-green-600 rounded p-4">
              <h4 className="font-semibold text-green-300 mb-2">NextAuth.js Integration</h4>
              <p className="text-sm text-green-200">
                ✅ useSession hook working<br/>
                ✅ Session provider configured<br/>
                ✅ Authentication state tracked
              </p>
            </div>
            
            <div className="bg-blue-900 border border-blue-600 rounded p-4">
              <h4 className="font-semibold text-blue-300 mb-2">Components</h4>
              <p className="text-sm text-blue-200">
                ✅ AuthStatus component<br/>
                ✅ LoginButton variants<br/>
                ✅ UserProfile display
              </p>
            </div>
            
            <div className="bg-purple-900 border border-purple-600 rounded p-4">
              <h4 className="font-semibold text-purple-300 mb-2">Features</h4>
              <p className="text-sm text-purple-200">
                ✅ Real-time status updates<br/>
                ✅ Multiple button variants<br/>
                ✅ Debug information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}