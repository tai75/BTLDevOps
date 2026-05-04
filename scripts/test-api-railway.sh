#!/bin/bash
# API Testing Script for Railway Deployment
# Usage: ./test-api-railway.sh <BACKEND_URL>
# Example: ./test-api-railway.sh https://btldevops-prod-backend.railway.app

set -e

BACKEND_URL=${1:-"http://localhost:4000"}
FRONTEND_URL="https://btldevops-prod-frontend.railway.app" # Update with your Railway URL

echo "🧪 BTLDevOps API Testing Suite"
echo "=============================="
echo ""
echo "Backend URL: $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_count=0
pass_count=0

# Helper function to test endpoints
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    
    ((test_count++))
    echo -n "Test $test_count: $name ... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BACKEND_URL$endpoint" \
            -H "Content-Type: application/json")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BACKEND_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [[ $http_code =~ ^[23][0-9]{2}$ ]]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code)"
        ((pass_count++))
        echo "  Response: $(echo $body | cut -c1-100)..."
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $http_code)"
        echo "  Response: $body"
    fi
    echo ""
}

# 1. Health Check
echo "📋 1. HEALTH CHECK"
echo "=================="
test_endpoint "GET /api/health" "GET" "/api/health"
echo ""

# 2. Get Services
echo "📋 2. GET SERVICES"
echo "=================="
test_endpoint "GET /api/services" "GET" "/api/services"
echo ""

# 3. Get Bookings (empty)
echo "📋 3. GET BOOKINGS"
echo "=================="
test_endpoint "GET /api/bookings" "GET" "/api/bookings"
echo ""

# 4. Create Booking
echo "📋 4. CREATE BOOKING"
echo "==================="
booking_data='{
  "customerName": "Test Customer",
  "customerEmail": "test@example.com",
  "customerPhone": "555-0123",
  "serviceId": 1,
  "bookingDate": "2026-05-15",
  "notes": "Test booking"
}'
test_endpoint "POST /api/bookings" "POST" "/api/bookings" "$booking_data"
echo ""

# 5. Get Bookings (should have 1 now)
echo "📋 5. GET BOOKINGS AFTER CREATE"
echo "================================"
test_endpoint "GET /api/bookings (after create)" "GET" "/api/bookings"
echo ""

# Summary
echo "📊 TEST SUMMARY"
echo "==============="
echo "Total Tests: $test_count"
echo "Passed: ${GREEN}$pass_count${NC}"
echo "Failed: ${RED}$((test_count - pass_count))${NC}"
echo ""

if [ $pass_count -eq $test_count ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED!${NC}"
    echo ""
    echo "✨ Frontend should be accessible at:"
    echo "   $FRONTEND_URL"
    echo ""
    echo "🎉 Deployment is working correctly!"
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    echo ""
    echo "⚠️  Please check:"
    echo "  1. Backend service is running"
    echo "  2. MySQL database is connected"
    echo "  3. Environment variables are set correctly"
    echo "  4. Check Railway logs for errors"
    exit 1
fi
