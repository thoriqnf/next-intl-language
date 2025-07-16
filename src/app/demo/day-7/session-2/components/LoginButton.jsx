"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function LoginButton({ 
  showUserInfo = false,
  variant = "default" // "default", "large", "compact"
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  if (session) {
    return (
      <div className={`${variant === 'compact' ? 'flex items-center gap-2' : 'space-y-2'}`}>
        {showUserInfo && (
          <div className={`${variant === 'compact' ? 'flex items-center gap-2' : 'space-y-1'}`}>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full border border-gray-600"
              />
            )}
            <div className={variant === 'compact' ? '' : 'text-center'}>
              <p className="text-sm font-medium">{session.user?.name}</p>
              {variant !== 'compact' && (
                <p className="text-xs text-gray-400">{session.user?.email}</p>
              )}
            </div>
          </div>
        )}
        
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className={`${
            variant === 'large' ? 'px-6 py-3 text-lg' :
            variant === 'compact' ? 'px-3 py-1 text-sm' :
            'px-4 py-2'
          } bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing out...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>🚪</span>
              Sign Out
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`${
        variant === 'large' ? 'px-8 py-4 text-xl' :
        variant === 'compact' ? 'px-3 py-1 text-sm' :
        'px-6 py-3 text-lg'
      } bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Signing in...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>🚀</span>
          Sign In with Google
        </div>
      )}
    </button>
  );
}