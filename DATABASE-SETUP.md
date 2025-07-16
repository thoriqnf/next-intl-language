# 📊 Database Setup Guide - PostgreSQL with Prisma

## 🎯 Overview
This guide helps you set up PostgreSQL database integration for user authentication data persistence.

## 📋 Prerequisites

### 1. Install PostgreSQL
**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE nextauth_db;

# Create user (optional)
CREATE USER nextauth_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nextauth_db TO nextauth_user;

# Exit
\q
```

## 🔧 Configuration

### 1. Update Environment Variables
Edit `.env.local` and update the DATABASE_URL:

```env
# Replace with your actual credentials
DATABASE_URL="postgresql://username:password@localhost:5432/nextauth_db"

# Example configurations:
# Local with postgres user:
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextauth_db"

# Local with custom user:
DATABASE_URL="postgresql://nextauth_user:your_password@localhost:5432/nextauth_db"

# Remote database:
DATABASE_URL="postgresql://username:password@your-host:5432/database_name"
```

### 2. Run Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## 📊 Database Schema

### Tables Created:
1. **User** - Store user profile information
2. **Account** - Store OAuth provider accounts
3. **Session** - Store user sessions
4. **VerificationToken** - Store email verification tokens

### User Table Fields:
- `id` - Unique user identifier
- `name` - User's display name
- `email` - User's email address (unique)
- `emailVerified` - Email verification timestamp
- `image` - Profile picture URL
- `provider` - OAuth provider (google/github)
- `providerId` - Provider's user ID
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

## 🔄 How It Works

### Authentication Flow:
1. User signs in with Google/GitHub
2. NextAuth checks if user exists in database
3. If new user: Creates User and Account records
4. If existing user: Updates user information
5. Creates new Session record
6. User data persists across browser sessions

### Code Integration:
- `lib/prisma.js` - Database client setup
- `lib/auth.js` - NextAuth with Prisma adapter
- `prisma/schema.prisma` - Database schema definition

## 🧪 Testing

### 1. Check Database Connection
```bash
# Test connection
npx prisma db push

# View data in Prisma Studio
npx prisma studio
```

### 2. Test Authentication
1. Start your Next.js app: `npm run dev`
2. Go to: `http://localhost:3000/demo/day-7/session-3/simple`
3. Sign in with Google or GitHub
4. Check Prisma Studio to see user data saved

### 3. Verify Data
After signing in, you should see:
- New record in `User` table
- New record in `Account` table
- New record in `Session` table

## 🔍 Troubleshooting

### Common Issues:

**1. Connection Error**
```
Error: P1001: Can't reach database server
```
**Solution:** Check PostgreSQL is running and connection details are correct

**2. Database Doesn't Exist**
```
Error: P1003: Database nextauth_db does not exist
```
**Solution:** Create the database first: `CREATE DATABASE nextauth_db;`

**3. Authentication Fails**
```
Error: P3018: A migration failed to apply
```
**Solution:** Reset database: `npx prisma migrate reset`

**4. Permission Denied**
```
Error: FATAL: permission denied for database
```
**Solution:** Grant permissions: `GRANT ALL PRIVILEGES ON DATABASE nextauth_db TO your_user;`

## 📚 Useful Commands

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Check migration status
npx prisma migrate status

# Format schema
npx prisma format
```

## 🚀 Production Deployment

### Environment Variables:
```env
# Production database URL
DATABASE_URL="postgresql://user:password@production-host:5432/database_name?sslmode=require"

# NextAuth configuration
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
```

### Deploy Steps:
1. Set up production PostgreSQL database
2. Update environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Deploy your application

## 📖 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Database Setup](https://next-auth.js.org/adapters/prisma)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Status:** ✅ Ready for use  
**Last Updated:** July 16, 2025  
**Version:** 1.0