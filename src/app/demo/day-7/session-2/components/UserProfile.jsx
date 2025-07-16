"use client";

import { useSession } from "next-auth/react";

export default function UserProfile({ showDetails = true }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-32"></div>
              <div className="h-3 bg-gray-600 rounded w-48"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-600 rounded"></div>
            <div className="h-3 bg-gray-600 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 text-center">
        <div className="text-4xl mb-4">👤</div>
        <h3 className="font-semibold mb-2">No User Session</h3>
        <p className="text-gray-400 text-sm">
          Please sign in to view your profile information
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>👤</span>
        User Profile
      </h3>
      
      <div className="flex items-start gap-4 mb-6">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
        )}
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-white mb-1">
            {session.user?.name}
          </h4>
          <p className="text-gray-400 mb-2">{session.user?.email}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-green-400">Authenticated</span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-3 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">User ID</p>
              <p className="text-sm font-mono bg-gray-800 rounded px-2 py-1">
                {session.user?.id || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Provider</p>
              <p className="text-sm bg-blue-900 text-blue-300 rounded px-2 py-1">
                Google OAuth
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-1">Session Expires</p>
            <p className="text-sm font-mono bg-gray-800 rounded px-2 py-1">
              {session.expires ? new Date(session.expires).toLocaleString() : 'N/A'}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">Permissions</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">View profile information</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">Access protected routes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">Use authenticated APIs</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}