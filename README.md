# BTLDevOps - House Cleaning Booking System

A full-stack DevOps project demonstrating a complete software system deployment with CI/CD pipeline, Docker containerization, and cloud deployment.

**Project Status:** ✅ Development Complete | 🚀 Ready for Deployment

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)

## 🎯 Overview

**House Cleaning Booking System** - A web application that allows customers to:
- Browse available cleaning service packages
- Book cleaning services with date/time scheduling
- View booking history
- Learn about services and contact information

### Key DevOps Features
✅ **CI/CD Pipeline** - GitHub Actions workflow for automated testing & building  
✅ **Containerization** - Docker containers for all services (Frontend, Backend, MySQL)  
✅ **Database** - MySQL with pre-configured schema  
✅ **Full-Stack** - React frontend + Node.js/Express backend  
✅ **Production-Ready** - Environment-based configuration, error handling, health checks

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose Stack                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Frontend    │  │   Backend    │  │    MySQL     │      │
│  │ (React/Nginx)│  │(Node/Express)│  │  (Database)  │      │
│  │  :5173 (dev) │  │   :4000      │  │   :3306      │      │
│  │  :80 (prod)  │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│       ↓                ↓                    ↓                │
│    VITE_API_URL   CORS_ORIGIN         DB_VARS              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
BTLDevOps/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── pages/              # 4 main pages (Home, Booking, About, Contact)
│   │   ├── components/         # NavBar component
│   │   ├── App.tsx             # Router setup
│   │   └── main.tsx
│   ├── Dockerfile              # Multi-stage build for production
│   ├── nginx.conf              # Nginx config for serving static files
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/             # API endpoints
│   │   │   ├── health.ts       # GET /api/health
│   │   │   ├── services.ts     # GET /api/services
│   │   │   └── bookings.ts     # GET/POST /api/bookings
│   │   ├── db.ts               # MySQL connection pool
│   │   ├── config/env.ts       # Environment configuration
│   │   ├── app.ts              # Express app setup
│   │   └── server.ts           # Server entry point
│   ├── test/                   # Unit tests
│   ├── Dockerfile              # Node multi-stage build
│   ├── package.json
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD pipeline
│
├── docker-compose.yml          # Local development stack
├── docker-compose.prod.yml     # Production stack
├── mysql-schema.sql            # Database schema + seed data
├── .env.example                # Environment variables template
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x or higher
- Docker & Docker Compose
- Git

### Local Development (Docker)

1. **Clone and setup**
   ```bash
   git clone https://github.com/tai75/BTLDevOps.git
   cd BTLDevOps
   cp .env.example .env
   ```

2. **Start all services**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - MySQL: localhost:3306

4. **Check service health**
   ```bash
   curl http://localhost:4000/api/health
   ```

### Local Development (Direct Node)

1. **Install dependencies**
   ```bash
   npm install
   npm --prefix frontend install
   npm --prefix backend install
   ```

2. **Setup database** (requires MySQL running)
   ```bash
   mysql -u root -p < mysql-schema.sql
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

4. **Run services**
   ```bash
   npm --prefix frontend run dev    # Terminal 1
   npm --prefix backend run dev     # Terminal 2
   ```

## 🧪 Development

### Available Commands

**Root level:**
```bash
npm install                 # Install all dependencies
npm run build              # Build both frontend and backend
npm run build:frontend     # Build frontend only
npm run build:backend      # Build backend only
npm run lint:frontend      # Lint frontend code
npm run lint:backend       # Lint backend code
npm run test:backend       # Run backend tests
```

**Frontend:**
```bash
cd frontend
npm run dev                # Start dev server with HMR
npm run build              # Production build
npm run lint               # ESLint
npm run preview            # Preview production build
```

**Backend:**
```bash
cd backend
npm run dev                # Start with hot reload (tsx watch)
npm run build              # Compile TypeScript
npm run start              # Run compiled app
npm run test               # Run tests
npm run lint               # ESLint
```

### Code Quality

- **Linting**: ESLint configured for frontend (React) and backend (Node)
- **Testing**: Backend uses Node test runner (`node:test`)
- **TypeScript**: Strict mode enabled for type safety
- **Formatting**: ESLint handles code formatting

## 📊 Testing

### Backend Tests

```bash
npm --prefix backend run test
```

Tests include:
- ✓ GET /api/health endpoint
- ✓ GET / root endpoint
- ✓ Database connection validation

### CI/CD Testing

GitHub Actions automatically runs all tests on:
- Push to `main` or `dev` branch
- Pull requests to `main` or `dev`

Pipeline steps:
1. Dependency installation
2. Frontend linting
3. Backend linting
4. Backend unit tests
5. Frontend build
6. Backend build
7. Docker image build (validation)

## 🚢 Deployment

### Railway (Recommended)

Railway makes deployment effortless with auto-scaling and managed services.

**Quick Deploy:**
1. Go to https://railway.app/dashboard
2. New Project → Deploy from GitHub repo
3. Select `BTLDevOps` repo
4. Railway auto-detects `docker-compose.yml`
5. Set environment variables for MySQL, Backend, Frontend
6. Deploy!

**Detailed guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Vercel (Frontend Only)

If you want to deploy only the React frontend to Vercel:

1. Create a new Vercel project from this repository.
2. Set the **Root Directory** to `frontend`.
3. Keep the default Vite build settings.
4. Add the frontend environment variable `VITE_API_URL` to point to your backend API.

The file [frontend/vercel.json](frontend/vercel.json) keeps React Router working on refresh or direct navigation.

### Other Options

- **Docker VPS**: Self-hosted with `docker-compose.prod.yml`
- **Render**: Connect GitHub, deploy backend + frontend separately
- **AWS/GCP/Azure**: Deploy Docker images to container services

## 📡 API Documentation

### Health Check
```
GET /api/health
Response: { status: "ok", databaseConnected: true, timestamp: "..." }
```

### Get Service Packages
```
GET /api/services
Response: [
  { id: 1, name: "Basic Clean", price: 50, duration: 2 },
  { id: 2, name: "Deep Clean", price: 100, duration: 4 },
  { id: 3, name: "Move-in/Move-out", price: 150, duration: 6 }
]
```

### Get All Bookings
```
GET /api/bookings
Response: [
  { id, customerId, serviceId, bookingDate, status, ... }
]
```

### Create Booking
```
POST /api/bookings
Body: {
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "555-1234",
  serviceId: 1,
  bookingDate: "2026-05-10",
  notes: "Allergic to bleach"
}
Response: { id, customerId, serviceId, status: "pending", ... }
```

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend** | React + TypeScript | 19.x + 6.x |
| **Frontend Build** | Vite | 8.x |
| **Backend** | Node.js + Express | 22.x + 5.x |
| **Backend Runtime** | Node.js | 22-alpine |
| **Database** | MySQL | 8.0 |
| **Frontend Server** | Nginx | 1.27-alpine |
| **Container** | Docker | Latest |
| **Orchestration** | Docker Compose | Latest |
| **CI/CD** | GitHub Actions | Built-in |

## 📝 Environment Variables

Required for production deployment:

```env
# Frontend
VITE_API_URL=https://api.yourdomain.com

# Backend
PORT=4000
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
DB_HOST=mysql-service
DB_PORT=3306
DB_USER=housecleaner
DB_PASSWORD=secure-password
DB_NAME=house_cleaning_booking
DB_ROOT_PASSWORD=root-secure-password

# Production
FRONTEND_PORT=80
```

## 🔍 Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs -f
docker-compose logs backend
docker-compose logs mysql
```

### Database connection error
```bash
# Verify MySQL is running and accessible
docker-compose ps
docker-compose exec mysql mysql -u housecleaner -p -e "SELECT 1;"
```

### Frontend can't reach backend
- Check `VITE_API_URL` environment variable
- Verify backend container is running
- Check CORS settings in backend

### Port conflicts
- Change ports in `docker-compose.yml` or `.env`
- Kill existing processes: `lsof -i :5173` (Linux/Mac)

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Docker Documentation](https://docs.docker.com)
- [Railway Docs](https://docs.railway.app)
- [MySQL Documentation](https://dev.mysql.com/doc)

## 📄 License

This project is part of a DevOps course assignment.

## 👤 Author

Created as a DevOps course project demonstrating full-stack deployment practices.

---

**Questions or Issues?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides or open an issue on GitHub.
