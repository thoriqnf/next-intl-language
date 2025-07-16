import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

// Log environment variables (masked for security)
console.log('🔐 Auth Environment Check:', {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 10)}...` : 'MISSING',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? `${process.env.GITHUB_CLIENT_ID.substring(0, 10)}...` : 'MISSING',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET'
});

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/demo/day-7/session-3/simple',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔑 SIGNIN CALLBACK:', {
        provider: account?.provider,
        userId: user?.id,
        userEmail: user?.email,
        accountType: account?.type,
        profileId: profile?.id
      });
      
      try {
        // Allow sign in
        return true
      } catch (error) {
        console.error('❌ SIGNIN ERROR:', error);
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 REDIRECT CALLBACK:', {
        url,
        baseUrl,
        redirectTo: baseUrl + '/demo/day-7/session-3/simple'
      });
      
      // Always redirect to simple page for OAuth flows
      return baseUrl + '/demo/day-7/session-3/simple'
    },
    async session({ session, token }) {
      console.log('👤 SESSION CALLBACK:', {
        sessionUser: session?.user?.email,
        tokenProvider: token?.provider,
        tokenSub: token?.sub
      });
      
      if (token) {
        session.user.id = token.sub
        session.user.provider = token.provider
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log('🎫 JWT CALLBACK:', {
        hasToken: !!token,
        hasUser: !!user,
        hasAccount: !!account,
        provider: account?.provider,
        accountType: account?.type,
        accessToken: account?.access_token ? 'PRESENT' : 'MISSING'
      });
      
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.provider = account.provider
        // Log account details for debugging
        console.log('📱 ACCOUNT DETAILS:', {
          provider: account.provider,
          type: account.type,
          hasAccessToken: !!account.access_token,
          hasRefreshToken: !!account.refresh_token,
          expiresAt: account.expires_at
        });
      }
      return token
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('🎉 SIGNIN EVENT:', {
        provider: account.provider,
        success: true,
        userEmail: user.email
      });
    },
    async signOut({ session, token }) {
      console.log('👋 SIGNOUT EVENT:', {
        userEmail: session?.user?.email
      });
    },
    async error({ error, message }) {
      console.error('🚨 AUTH ERROR EVENT:', {
        error: error.message,
        message,
        stack: error.stack
      });
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}