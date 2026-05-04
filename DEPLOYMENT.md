# Deployment Guide

## Railway Deployment

[Railway](https://railway.app/) is a modern deployment platform that makes it easy to deploy full-stack applications.

### Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub account with this repo
- Docker (for local testing)

### Option 1: Deploy via Railway UI (Recommended)

1. **Connect GitHub to Railway**
   - Go to https://railway.app/dashboard
   - Click "Create New Project" → "Deploy from GitHub repo"
   - Select this repo (`BTLDevOps`)
   - Railway will auto-detect the structure

2. **Configure Services**
   - Railway detects `docker-compose.yml` automatically
   - Services created: `mysql`, `backend`, `frontend`

3. **Set Environment Variables**
   - For each service, set the required env vars:
   
   **MySQL:**
   ```
   MYSQL_ROOT_PASSWORD=<strong-password>
   MYSQL_DATABASE=house_cleaning_booking
   MYSQL_USER=housecleaner
   MYSQL_PASSWORD=<strong-password>
   ```
   
   **Backend:**
   ```
   PORT=4000
   CORS_ORIGIN=https://your-frontend-url.railway.app
   DB_HOST=mysql
   DB_PORT=3306
   DB_USER=housecleaner
   DB_PASSWORD=<same-as-above>
   DB_NAME=house_cleaning_booking
   NODE_ENV=production
   ```
   
   **Frontend:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Click "Deploy" 
   - Railway builds Docker images and starts services
   - Services are exposed on Railway domains

### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Set environment variables
railway variables set DB_PASSWORD=your-password
railway variables set CORS_ORIGIN=https://your-domain
# ... set all vars

# Deploy
railway up
```

### Option 3: Deploy to VPS/Docker Host

Use `docker-compose.prod.yml` for production deployment:

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with production values
nano .env

# Pull latest code
git pull origin main

# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# Check services
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f backend
```

## Health Check

After deployment, verify services:

```bash
# Test backend health
curl https://your-backend-url/api/health

# Test API endpoints
curl https://your-backend-url/api/services
curl https://your-backend-url/api/bookings

# Test frontend
curl https://your-frontend-url
```

## Troubleshooting

### MySQL Connection Failed
- Check `DB_HOST`, `DB_USER`, `DB_PASSWORD` match between services
- Verify MySQL service is healthy: `docker-compose logs mysql`

### Frontend Cannot Reach Backend
- Verify `VITE_API_URL` in frontend env vars
- Check CORS settings in backend (`CORS_ORIGIN`)
- Ensure backend service is running

### Deploy Fails
- Check build logs: View in Railway dashboard
- Ensure all env vars are set
- Verify Docker images build locally: `docker-compose -f docker-compose.prod.yml build`

## CI/CD Integration

GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
- Runs on every push to `main` and `dev`
- Lints, tests, and builds the project
- Optionally deploys to Railway (advanced setup)

To add auto-deploy to Railway:
1. Generate Railway API token in dashboard settings
2. Add `RAILWAY_TOKEN` as GitHub secret
3. Extend CI workflow with Railway deploy step

## Scaling

### Database
- Railway managed MySQL scales automatically
- For large deployments, consider dedicated MySQL service

### Backend
- Railway auto-scales based on CPU/memory
- Add replicas for high availability

### Frontend
- Static files cached via CDN
- No additional scaling needed
