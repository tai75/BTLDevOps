# API Testing Script for Railway Deployment (PowerShell)
# Usage: .\test-api-railway.ps1 -BackendUrl "https://your-backend-url.railway.app"
# Example: .\test-api-railway.ps1

param(
    [string]$BackendUrl = "http://localhost:4000",
    [string]$FrontendUrl = "https://your-frontend-url.railway.app"
)

Write-Host "🧪 BTLDevOps API Testing Suite" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend URL: $BackendUrl" -ForegroundColor Yellow
Write-Host "Frontend URL: $FrontendUrl" -ForegroundColor Yellow
Write-Host ""

$testCount = 0
$passCount = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Endpoint,
        [string]$Data = ""
    )
    
    $script:testCount++
    Write-Host "Test $testCount`: $Name ... " -NoNewline
    
    try {
        $url = "$BackendUrl$Endpoint"
        
        if ($Method -eq "GET" -or [string]::IsNullOrEmpty($Data)) {
            $response = Invoke-WebRequest -Uri $url -Method $Method -ContentType "application/json" -ErrorAction Stop
        }
        else {
            $response = Invoke-WebRequest -Uri $url -Method $Method -Body $Data -ContentType "application/json" -ErrorAction Stop
        }
        
        $httpCode = $response.StatusCode
        $body = $response.Content | ConvertFrom-Json
        
        if ($httpCode -ge 200 -and $httpCode -lt 300) {
            Write-Host "✓ PASS" -ForegroundColor Green -NoNewline
            Write-Host " (HTTP $httpCode)" -ForegroundColor Gray
            Write-Host "  Response: $(($body | ConvertTo-Json -Compress) -replace '^', '  ' | Select-Object -First 1)" -ForegroundColor Gray
            $script:passCount++
        }
        else {
            Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
            Write-Host " (HTTP $httpCode)" -ForegroundColor Gray
            Write-Host "  Response: $($response.Content)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
        Write-Host " (Error)" -ForegroundColor Gray
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# 1. Health Check
Write-Host "📋 1. HEALTH CHECK" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Test-Endpoint "GET /api/health" "GET" "/api/health"

# 2. Get Services
Write-Host "📋 2. GET SERVICES" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Test-Endpoint "GET /api/services" "GET" "/api/services"

# 3. Get Bookings (empty)
Write-Host "📋 3. GET BOOKINGS" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Test-Endpoint "GET /api/bookings" "GET" "/api/bookings"

# 4. Create Booking
Write-Host "📋 4. CREATE BOOKING" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
$bookingData = @{
    fullName = "Test Customer"
    email = "test@example.com"
    phone = "555-0123"
    servicePackageId = 1
    serviceAddress = "123 Demo Street"
    preferredDate = "2026-05-15"
    preferredTime = "09:00"
    numberOfRooms = 2
    notes = "Test booking"
} | ConvertTo-Json

Test-Endpoint "POST /api/bookings" "POST" "/api/bookings" $bookingData

# 5. Get Bookings (should have 1 now)
Write-Host "📋 5. GET BOOKINGS AFTER CREATE" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Test-Endpoint "GET /api/bookings (after create)" "GET" "/api/bookings"

# Summary
Write-Host ""
Write-Host "📊 TEST SUMMARY" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host "Total Tests: $testCount"
Write-Host "Passed: " -NoNewline
Write-Host "$passCount" -ForegroundColor Green
Write-Host "Failed: " -NoNewline
Write-Host "$($testCount - $passCount)" -ForegroundColor Red

Write-Host ""
if ($passCount -eq $testCount) {
    Write-Host "✅ ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "✨ Frontend should be accessible at:" -ForegroundColor Cyan
    Write-Host "   $FrontendUrl" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🎉 Deployment is working correctly!" -ForegroundColor Green
}
else {
    Write-Host "❌ SOME TESTS FAILED" -ForegroundColor Red
    Write-Host ""
    Write-Host "⚠️  Please check:" -ForegroundColor Yellow
    Write-Host "  1. Backend service is running" -ForegroundColor Gray
    Write-Host "  2. MySQL database is connected" -ForegroundColor Gray
    Write-Host "  3. Environment variables are set correctly" -ForegroundColor Gray
    Write-Host "  4. Check Railway logs for errors" -ForegroundColor Gray
}
Write-Host ""
