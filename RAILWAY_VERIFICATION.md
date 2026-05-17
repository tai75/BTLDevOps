# Railway Deployment Verification Checklist

Chúc mừng! Dự án đã deploy lên Railway ✅

## 🎯 Bước tiếp theo:

### 1️⃣ **Lấy Railway URLs của bạn**

Vào Railway Dashboard:
1. Go to https://railway.app/dashboard
2. Select project `BTLDevOps`
3. Copy URLs:
   - **Frontend**: `https://your-frontend-domain.railway.app`
   - **Backend**: `https://your-backend-domain.railway.app`

### 2️⃣ **Test toàn bộ endpoints**

Sử dụng PowerShell script:
```powershell
cd scripts
.\test-api-railway.ps1 -BackendUrl "https://your-backend-domain.railway.app"
```

Hoặc test manual từng endpoint:

#### Health Check:
```bash
curl https://your-backend-domain.railway.app/api/health
# Response: {"status":"ok","databaseConnected":true,"timestamp":"..."}
```

#### Get Services:
```bash
curl https://your-backend-domain.railway.app/api/services
# Response: [
#   {"id":1,"name":"Basic Clean","price":50,"duration":2},
#   ...
# ]
```

#### Get Bookings:
```bash
curl https://your-backend-domain.railway.app/api/bookings
# Response: []
```

#### Create Booking:
```bash
curl -X POST https://your-backend-domain.railway.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "555-1234",
    "serviceId": 1,
    "bookingDate": "2026-05-15",
    "notes": "Test booking"
  }'
# Response: {"id":1,"customerId":1,"serviceId":1,"status":"pending",...}
```

### 3️⃣ **Test Frontend UI**

1. Open: `https://your-frontend-domain.railway.app`
2. Verify pages load:
   - ✅ Home page (trang chủ)
   - ✅ Booking page (đặt lịch) - form to create booking
   - ✅ About page (giới thiệu)
   - ✅ Contact page (liên hệ)
   - ✅ NavBar visible with links
3. Create test booking:
   - Click "Đặt lịch"
   - Fill form with test data
   - Click Submit
   - Verify booking created

### 4️⃣ **Verify Data Persistence**

1. After creating booking via UI:
   ```bash
   curl https://your-backend-domain.railway.app/api/bookings
   # Should return the booking you just created
   ```

2. Verify database has data (via Railway MySQL service)

### 5️⃣ **Check Logs for Errors**

Railway Dashboard:
1. Go to Backend service
2. View "Logs" tab - should show:
   ```
   Server running on port 4000
   Database connection established
   ```
3. No errors should appear

### 6️⃣ **Finalize for Submission**

#### Merge dev → main:
```bash
git checkout main
git pull origin main
git merge dev --no-edit
git push origin main
```

#### Update Railway URLs in docs:
Edit `DEPLOYMENT.md` line ~250 and `SUBMISSION.md`:
```markdown
- **Deployed Application**: https://your-frontend-domain.railway.app
- **API Backend**: https://your-backend-domain.railway.app
```

#### Final commit:
```bash
git add DEPLOYMENT.md SUBMISSION.md
git commit -m "docs: update Railway deployment URLs"
git push origin main
```

---

## ✅ **Final Verification Checklist**

- [ ] Frontend loads at Railway URL
- [ ] NavBar displays with 4 links
- [ ] Home page shows booking info
- [ ] Booking page form works
- [ ] About page displays
- [ ] Contact page displays
- [ ] API health check responds ✓
- [ ] Can create booking via UI
- [ ] Booking data persists in DB
- [ ] No errors in Railway logs
- [ ] CI/CD workflow completed successfully
- [ ] All branches merged to main
- [ ] SUBMISSION.md updated with URLs
- [ ] GitHub repo ready for grading

---

## 📋 **Submission Deliverables**

Provide evaluator with:

1. **GitHub URL**: https://github.com/tai75/BTLDevOps
2. **Main branch**: Production-ready code
3. **Railway URLs**:
   - Frontend: `https://...railway.app`
   - Backend: `https://...railway.app`
4. **Demo workflow**:
   - Visit frontend → Create booking → Verify in database

---

## 🎓 **Key Points to Mention During Grading**

✅ **Full-stack deployment**:
- React frontend (4 pages + navbar)
- Node.js backend (3 API endpoints)
- MySQL database (auto-initialized)

✅ **CI/CD Pipeline**:
- GitHub Actions: lint → test → build
- Runs on every push/PR

✅ **Infrastructure as Code**:
- docker-compose.yml
- docker-compose.prod.yml
- Environment-based config

✅ **Problem-solving**:
- Documented 5 incidents with solutions
- Lessons learned integrated into code

✅ **Production-ready**:
- Error handling
- Health checks
- Scalable architecture

---

## 🚀 **If Issues Occur**

### Frontend not loading:
```bash
# Check Railway logs
# Verify VITE_API_URL env variable
# Check nginx serving index.html
curl -v https://your-frontend-domain.railway.app
```

### Backend returning errors:
```bash
# Check database connection
curl https://your-backend-domain.railway.app/api/health

# Check env variables in Railway dashboard
# Verify MySQL is running and initialized
```

### Booking not creating:
```bash
# Check backend logs for errors
# Verify POST request format
# Check database has required tables
```

---

## 📞 **Support Resources**

- [Railway Docs](https://docs.railway.app)
- [Project README](../README.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Incident Docs](../INCIDENTS.md)

---

**Status**: ✅ Ready for Submission  
**Next**: Follow checklist above → Submit to instructor

---
