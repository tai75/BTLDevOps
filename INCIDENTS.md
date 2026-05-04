# QA & Incident Documentation

## Overview
This document records incidents, bugs, and issues encountered during development and deployment, including root cause analysis and resolution.

---

## Incident #1: Docker Desktop Not Running

**Date:** 2026-05-04  
**Severity:** High  
**Status:** Resolved

### Description
When attempting to run `docker-compose up -d --build`, the command failed with:
```
failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine
check if the path is correct and if the daemon is running
```

### Root Cause
Docker Desktop service was not running in the background. The docker daemon was not initialized.

### Impact
- Cannot build or run containerized services
- Blocking development and testing
- CI/CD pipeline would fail on Docker build steps

### Resolution
1. Started Docker Desktop application
2. Waited for daemon to initialize (~30 seconds)
3. Re-ran `docker-compose up -d --build`
4. All services started successfully

### Lesson Learned
- Always verify Docker daemon is running before container operations
- Use `docker ps` to quickly check daemon status
- Can automate Docker Desktop startup with scripts or task scheduler

### Prevention
- Add Docker daemon health check in CI/CD pipeline
- Document Docker Desktop startup requirements in README
- Consider using Docker for Windows WSL2 backend for seamless integration

---

## Incident #2: MySQL Port Conflict (3306 Already in Use)

**Date:** 2026-05-04  
**Severity:** Medium  
**Status:** Resolved

### Description
When running Docker Compose with MySQL service, received error:
```
Error response from daemon: ports are not available
exposing port TCP 0.0.0.0:3306 -> 127.0.0.1:0: listen tcp 0.0.0.0:3306
bind: Only one usage of each socket address (protocol/network address/port) normally permitted
```

### Root Cause
MySQL or another database service was already listening on port 3306 from a previous container or local installation. The port mapping in `docker-compose.yml` exposed port 3306 to the host, causing conflict.

### Impact
- MySQL container failed to start
- Backend services could not connect to database
- Full stack deployment blocked

### Resolution
1. **Immediate fix:** Removed host port mapping from `docker-compose.yml`:
   ```yaml
   # Before (conflicting)
   ports:
     - '3306:3306'
   
   # After (container-only)
   # Service accessible via internal network at mysql:3306
   ```

2. **Verification:** Ran `docker-compose ps` to confirm MySQL container running
3. **Testing:** Backend successfully connected via `mysql:3306` (internal network)

### Lesson Learned
- In containerized environments, services often don't need host port exposure
- Internal Docker networks provide service discovery (`service_name:port`)
- Only expose ports that external clients need (frontend, backend API)
- Database services can be completely internal

### Prevention
- Use internal Docker networks for inter-service communication
- Document port exposure requirements in architecture docs
- Use `docker-compose config` to validate configuration before deployment

---

## Incident #3: TypeScript Export Conflict in health.ts

**Date:** 2026-05-04  
**Severity:** Medium  
**Status:** Resolved

### Description
Backend build failed with error:
```
error TS2323: Cannot redeclare exported variable 'createHealthRouter'
Multiple exports with the same name "createHealthRouter"
```

File `backend/src/routes/health.ts` had:
```typescript
export function createHealthRouter(...) { ... }
export { createHealthRouter }  // Duplicate export!
export const healthRouter = createHealthRouter(...)
```

### Root Cause
During refactoring, a duplicate export statement was accidentally added. Named function export + explicit re-export caused TypeScript to complain about duplicate exports.

### Impact
- Backend build failed
- CI/CD pipeline blocked
- Cannot test or deploy backend services

### Resolution
Removed the duplicate export line:
```typescript
export function createHealthRouter(...) { ... }
// Removed: export { createHealthRouter }
export const healthRouter = createHealthRouter(checkDatabaseConnection)
```

### Lesson Learned
- ESLint should catch duplicate exports (linting before build)
- Code review would have caught this immediately
- TypeScript compiler gives clear error messages for such issues
- Test files help validate export correctness early

### Prevention
- Enable ESLint rule `no-duplicate-imports` (or equivalent)
- Run linting before committing: `npm run lint`
- Use IDE to detect export issues before compilation
- Add pre-commit hooks to enforce lint checks

---

## Incident #4: Unused Variable Warnings in Backend

**Date:** 2026-05-04  
**Severity:** Low  
**Status:** Resolved

### Description
Backend linting produced warnings about unused variables:
```
'_next' is defined but never used (@typescript-eslint/no-unused-vars)
```

In `src/app.ts`, the error handler middleware had:
```typescript
app.use((error: unknown, _request, response, _next: express.NextFunction) => {
  void _next  // Unused!
  // error handling code
})
```

### Root Cause
Express error handler middleware requires 4 parameters (including `next`), but `next` was not used. Developer added `void _next` as a workaround instead of removing the parameter.

### Impact
- Code quality issues (unused code)
- ESLint warnings in CI/CD
- Violates clean code principles

### Resolution
Removed unused `_next` parameter entirely:
```typescript
app.use((error: unknown, _request, response) => {
  // error handling code - 3 params sufficient
})
```

### Lesson Learned
- Express error handler can work with just 3 parameters if `next` not needed
- Using `void` is a TypeScript anti-pattern for unused parameters
- ESLint should be configured to catch unused variables
- Code review should enforce clean code practices

### Prevention
- Configure TypeScript strict mode: `noUnusedParameters: true`
- Run linting as part of development workflow: `npm run lint`
- Use IDE warnings (underline unused variables)
- Review ESLint output before committing

---

## Incident #5: React Router Import Error

**Date:** 2026-05-04  
**Severity:** Medium  
**Status:** Resolved

### Description
Frontend build failed with:
```
error TS2307: Cannot find module 'react-router-dom'
```

The frontend needed to implement routing for multiple pages (Home, Booking, About, Contact) but `react-router-dom` dependency was not installed.

### Root Cause
During project setup, `react-router-dom` was not included in initial dependencies. When implementing multi-page navigation with React Router, the import failed at build time.

### Impact
- Frontend build blocked
- Cannot implement page navigation
- Demo features unavailable

### Resolution
1. Installed dependency:
   ```bash
   npm --prefix frontend install react-router-dom@6.14.1 @types/react-router-dom -D
   ```

2. Implemented routing in `src/App.tsx`:
   ```typescript
   import { BrowserRouter, Routes, Route } from 'react-router-dom'
   ```

3. Created pages: Home, Booking, About, Contact
4. Added NavBar component with route links
5. Frontend build successful

### Lesson Learned
- External dependencies must be declared before use
- Development should include dependency planning upfront
- npm install output should be reviewed for success
- Type definitions needed for TypeScript + third-party libraries

### Prevention
- Plan dependencies before starting development
- Use `npm ls` to verify installed packages
- Add dependencies to `package.json` during feature planning
- Use `npm audit` to check for missing deps

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Incidents | 5 |
| High Severity | 1 |
| Medium Severity | 3 |
| Low Severity | 1 |
| Resolved | 5 (100%) |
| Time to Resolution | 5-30 mins avg |

## Categories

- **Infrastructure**: Docker daemon (1)
- **Configuration**: Port conflicts (1)
- **Code Quality**: Unused variables, duplicate exports (2)
- **Dependencies**: Missing packages (1)

## Recommendations for Future Deployments

1. ✅ **Automation**: Use CI/CD to catch build issues early
2. ✅ **Linting**: Enable and enforce ESLint rules before commits
3. ✅ **Testing**: Run full test suite in pre-commit hooks
4. ✅ **Documentation**: Keep deployment guides updated with lessons learned
5. ✅ **Monitoring**: Add health checks and logging for production services

---

*Last Updated: 2026-05-04*  
*All incidents resolved and documented*
