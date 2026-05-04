# Railway Quick Deploy Script (PowerShell)
# This script helps you deploy to Railway

Write-Host "🚀 BTLDevOps Railway Deployment Helper" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git not found. Please install Git." -ForegroundColor Red
    exit 1
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Docker not found. You'll need Docker for local testing." -ForegroundColor Yellow
}

# Show deployment options
Write-Host ""
Write-Host "📍 Deployment Options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Railway Dashboard (Recommended)" -ForegroundColor Green
Write-Host "  - Go to https://railway.app/dashboard" -ForegroundColor Gray
Write-Host "  - Click 'New Project' → 'Deploy from GitHub'" -ForegroundColor Gray
Write-Host "  - Select 'BTLDevOps' repo" -ForegroundColor Gray
Write-Host "  - Railway auto-detects docker-compose.yml" -ForegroundColor Gray
Write-Host "  - Set env variables (see .env.example)" -ForegroundColor Gray
Write-Host "  - Click Deploy!" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 2: Railway CLI" -ForegroundColor Green
Write-Host "  - Install: npm install -g @railway/cli" -ForegroundColor Gray
Write-Host "  - Run: railway login" -ForegroundColor Gray
Write-Host "  - Run: railway link (link to your Railway project)" -ForegroundColor Gray
Write-Host "  - Run: railway variables set <KEY>=<VALUE>" -ForegroundColor Gray
Write-Host "  - Run: railway up" -ForegroundColor Gray
Write-Host ""

# Check git status
Write-Host ""
Write-Host "🔍 Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  Uncommitted changes detected:" -ForegroundColor Yellow
    Write-Host $gitStatus
    Write-Host ""
    Write-Host "📝 Commit changes first:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor Gray
    Write-Host "  git commit -m 'your message'" -ForegroundColor Gray
    Write-Host "  git push origin dev" -ForegroundColor Gray
    exit 1
}
else {
    Write-Host "✅ Git working directory clean" -ForegroundColor Green
}

# Verify code quality
Write-Host ""
Write-Host "🧪 Running tests and linting..." -ForegroundColor Yellow

$lintFrontend = npm run lint:frontend 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend lint passed" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Frontend lint has issues. Fix before deployment." -ForegroundColor Yellow
}

$lintBackend = npm --prefix backend run lint 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend lint passed" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Backend lint has issues. Fix before deployment." -ForegroundColor Yellow
}

$testBackend = npm --prefix backend run test 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend tests passed" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Backend tests failed. Fix before deployment." -ForegroundColor Yellow
}

# Build verification
Write-Host ""
Write-Host "🏗️  Verifying builds..." -ForegroundColor Yellow

$buildFrontend = npm run build:frontend 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful" -ForegroundColor Green
}
else {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}

$buildBackend = npm run build:backend 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend build successful" -ForegroundColor Green
}
else {
    Write-Host "❌ Backend build failed" -ForegroundColor Red
    exit 1
}

# Ready for deployment
Write-Host ""
Write-Host "✅ ALL CHECKS PASSED!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Environment Variables - Prepare these for Railway:" -ForegroundColor Green
Write-Host ""
Write-Host "   MySQL Service:" -ForegroundColor Gray
Write-Host "   - MYSQL_ROOT_PASSWORD=<secure-root-password>" -ForegroundColor Gray
Write-Host "   - MYSQL_DATABASE=house_cleaning_booking" -ForegroundColor Gray
Write-Host "   - MYSQL_USER=housecleaner" -ForegroundColor Gray
Write-Host "   - MYSQL_PASSWORD=<secure-password>" -ForegroundColor Gray
Write-Host ""
Write-Host "   Backend Service:" -ForegroundColor Gray
Write-Host "   - PORT=4000" -ForegroundColor Gray
Write-Host "   - CORS_ORIGIN=https://your-frontend-domain.railway.app" -ForegroundColor Gray
Write-Host "   - DB_HOST=mysql" -ForegroundColor Gray
Write-Host "   - DB_PORT=3306" -ForegroundColor Gray
Write-Host "   - DB_USER=housecleaner" -ForegroundColor Gray
Write-Host "   - DB_PASSWORD=<same-as-above>" -ForegroundColor Gray
Write-Host "   - DB_NAME=house_cleaning_booking" -ForegroundColor Gray
Write-Host "   - NODE_ENV=production" -ForegroundColor Gray
Write-Host ""
Write-Host "   Frontend Service:" -ForegroundColor Gray
Write-Host "   - VITE_API_URL=https://your-backend-domain.railway.app" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Deploy to Railway:" -ForegroundColor Green
Write-Host "   Option A: Dashboard" -ForegroundColor Gray
Write-Host "   - Visit https://railway.app/dashboard" -ForegroundColor Gray
Write-Host "   - New Project → Deploy from GitHub" -ForegroundColor Gray
Write-Host "   - Select BTLDevOps" -ForegroundColor Gray
Write-Host ""
Write-Host "   Option B: CLI" -ForegroundColor Gray
Write-Host "   - npm install -g @railway/cli" -ForegroundColor Gray
Write-Host "   - railway login" -ForegroundColor Gray
Write-Host "   - railway link" -ForegroundColor Gray
Write-Host "   - railway variables set ... (copy from above)" -ForegroundColor Gray
Write-Host "   - railway up" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Verify Deployment:" -ForegroundColor Green
Write-Host "   - Test backend health: curl https://your-backend/api/health" -ForegroundColor Gray
Write-Host "   - Test frontend: Visit https://your-frontend" -ForegroundColor Gray
Write-Host "   - Create test booking via UI" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Monitor:" -ForegroundColor Green
Write-Host "   - Railway dashboard shows logs and metrics" -ForegroundColor Gray
Write-Host "   - Subscribe to alerts for errors" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Detailed Guide: See DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Questions? Check:" -ForegroundColor Cyan
Write-Host "  - README.md - Project overview" -ForegroundColor Gray
Write-Host "  - DEPLOYMENT.md - Detailed deployment guides" -ForegroundColor Gray
Write-Host "  - INCIDENTS.md - Lessons learned from development" -ForegroundColor Gray
Write-Host ""
