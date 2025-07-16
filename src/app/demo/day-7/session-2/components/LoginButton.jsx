"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function LoginButton({ 
  showUserInfo = false,
  variant = "default", // "default", "large", "compact"
  provider = "google" // "google", "github", "both"
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (providerName) => {
    setIsLoading(true);
    try {
      await signIn(providerName);
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

  if (provider === "both") {
    return (
      <div className="space-y-3">
        <button
          onClick={() => handleSignIn('google')}
          disabled={isLoading}
          className={`${
            variant === 'large' ? 'px-8 py-4 text-xl' :
            variant === 'compact' ? 'px-3 py-1 text-sm' :
            'px-6 py-3 text-lg'
          } w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>🚀</span>
              Sign In with Google
            </div>
          )}
        </button>
        
        <button
          onClick={() => handleSignIn('github')}
          disabled={isLoading}
          className={`${
            variant === 'large' ? 'px-8 py-4 text-xl' :
            variant === 'compact' ? 'px-3 py-1 text-sm' :
            'px-6 py-3 text-lg'
          } w-full bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold border border-gray-600`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>🐙</span>
              Sign In with GitHub
            </div>
          )}
        </button>
      </div>
    );
  }

  const isGitHub = provider === "github";
  const buttonText = isGitHub ? "Sign In with GitHub" : "Sign In with Google";
  const buttonIcon = isGitHub ? "🐙" : "🚀";
  const buttonColors = isGitHub 
    ? "bg-gray-800 hover:bg-gray-900 border border-gray-600" 
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <button
      onClick={() => handleSignIn(provider)}
      disabled={isLoading}
      className={`${
        variant === 'large' ? 'px-8 py-4 text-xl' :
        variant === 'compact' ? 'px-3 py-1 text-sm' :
        'px-6 py-3 text-lg'
      } ${buttonColors} text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Signing in...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span>{buttonIcon}</span>
          {buttonText}
        </div>
      )}
    </button>
  );
}