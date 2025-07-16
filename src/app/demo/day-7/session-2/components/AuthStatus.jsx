"use client";

import { useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <span>📊</span>
        Authentication Status
      </h3>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Status:</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            status === 'authenticated' ? 'bg-green-500 text-white' :
            status === 'loading' ? 'bg-yellow-500 text-black' :
            'bg-red-500 text-white'
          }`}>
            {status}
          </span>
        </div>
        
        {session && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">User:</span>
              <span className="text-sm font-medium">{session.user?.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Email:</span>
              <span className="text-sm font-medium">{session.user?.email}</span>
            </div>
          </>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Provider:</span>
          <span className="text-sm">Google OAuth</span>
        </div>
      </div>
    </div>
  );
}