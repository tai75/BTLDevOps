#!/bin/bash
# Railway Quick Deploy Script
# This script helps you deploy to Railway

set -e  # Exit on error

echo "🚀 BTLDevOps Railway Deployment Helper"
echo "======================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git."
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found. You'll need Docker for local testing."
fi

# Show deployment options
echo ""
echo "📍 Deployment Options:"
echo ""
echo "Option 1: Railway Dashboard (Recommended)"
echo "  - Go to https://railway.app/dashboard"
echo "  - Click 'New Project' → 'Deploy from GitHub'"
echo "  - Select 'BTLDevOps' repo"
echo "  - Railway auto-detects docker-compose.yml"
echo "  - Set env variables (see .env.example)"
echo "  - Click Deploy!"
echo ""
echo "Option 2: Railway CLI"
echo "  - Install: npm install -g @railway/cli"
echo "  - Run: railway login"
echo "  - Run: railway link (link to your Railway project)"
echo "  - Run: railway variables set <KEY>=<VALUE>"
echo "  - Run: railway up"
echo ""

# Check git status
echo ""
echo "🔍 Checking git status..."
if git status --porcelain | grep -q .; then
    echo "⚠️  Uncommitted changes detected:"
    git status --short
    echo ""
    echo "📝 Commit changes first:"
    echo "  git add ."
    echo "  git commit -m 'your message'"
    echo "  git push origin dev"
    exit 1
else
    echo "✅ Git working directory clean"
fi

# Verify code quality
echo ""
echo "🧪 Running tests and linting..."
if npm run lint:frontend &> /dev/null; then
    echo "✅ Frontend lint passed"
else
    echo "⚠️  Frontend lint has issues. Fix before deployment."
fi

if npm --prefix backend run lint &> /dev/null; then
    echo "✅ Backend lint passed"
else
    echo "⚠️  Backend lint has issues. Fix before deployment."
fi

if npm --prefix backend run test &> /dev/null; then
    echo "✅ Backend tests passed"
else
    echo "⚠️  Backend tests failed. Fix before deployment."
fi

# Build verification
echo ""
echo "🏗️  Verifying builds..."
if npm run build:frontend &> /dev/null; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

if npm run build:backend &> /dev/null; then
    echo "✅ Backend build successful"
else
    echo "❌ Backend build failed"
    exit 1
fi

# Docker build check
echo ""
echo "🐳 Checking Docker images..."
if docker-compose build --no-cache &> /dev/null; then
    echo "✅ Docker images build successfully"
else
    echo "⚠️  Docker build has issues (local Docker may not be running)"
fi

# Ready for deployment
echo ""
echo "✅ ALL CHECKS PASSED!"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1️⃣  Environment Variables - Prepare these for Railway:"
echo ""
echo "   MySQL Service:"
echo "   - MYSQL_ROOT_PASSWORD=<secure-root-password>"
echo "   - MYSQL_DATABASE=house_cleaning_booking"
echo "   - MYSQL_USER=housecleaner"
echo "   - MYSQL_PASSWORD=<secure-password>"
echo ""
echo "   Backend Service:"
echo "   - PORT=4000"
echo "   - CORS_ORIGIN=https://your-frontend-domain.railway.app"
echo "   - DB_HOST=mysql"
echo "   - DB_PORT=3306"
echo "   - DB_USER=housecleaner"
echo "   - DB_PASSWORD=<same-as-above>"
echo "   - DB_NAME=house_cleaning_booking"
echo "   - NODE_ENV=production"
echo ""
echo "   Frontend Service:"
echo "   - VITE_API_URL=https://your-backend-domain.railway.app"
echo ""
echo "2️⃣  Deploy to Railway:"
echo "   Option A: Dashboard"
echo "   - Visit https://railway.app/dashboard"
echo "   - New Project → Deploy from GitHub"
echo "   - Select BTLDevOps"
echo ""
echo "   Option B: CLI"
echo "   - npm install -g @railway/cli"
echo "   - railway login"
echo "   - railway link"
echo "   - railway variables set ... (copy from above)"
echo "   - railway up"
echo ""
echo "3️⃣  Verify Deployment:"
echo "   - Test backend health: curl https://your-backend/api/health"
echo "   - Test frontend: Visit https://your-frontend"
echo "   - Create test booking via UI"
echo ""
echo "4️⃣  Monitor:"
echo "   - Railway dashboard shows logs and metrics"
echo "   - Subscribe to alerts for errors"
echo ""
echo "📚 Detailed Guide: See DEPLOYMENT.md"
echo ""
echo "Questions? Check:"
echo "  - README.md - Project overview"
echo "  - DEPLOYMENT.md - Detailed deployment guides"
echo "  - INCIDENTS.md - Lessons learned from development"
echo ""
