# Railway PostgreSQL Schema Setup Script
# Chạy schema SQL trên PostgreSQL của Railway

param(
    [string]$PostgresUrl = $env:DATABASE_URL,
    [string]$SchemaFile = "./postgres-schema.sql"
)

# Kiểm tra input
if ([string]::IsNullOrEmpty($PostgresUrl)) {
    Write-Host "ERROR: DATABASE_URL không tìm thấy!" -ForegroundColor Red
    Write-Host "Cách sử dụng:" -ForegroundColor Yellow
    Write-Host "  .\setup-railway-postgres.ps1 -PostgresUrl 'postgresql://user:pass@host:port/db'" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Yellow
    Write-Host "hoặc set environment variable:" -ForegroundColor Yellow
    Write-Host "  `$env:DATABASE_URL = 'postgresql://user:pass@host:port/db'" -ForegroundColor Cyan
    exit 1
}

if (-not (Test-Path $SchemaFile)) {
    Write-Host "ERROR: File $SchemaFile không tìm thấy!" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Bắt đầu setup PostgreSQL trên Railway..." -ForegroundColor Green
Write-Host "📁 Schema file: $SchemaFile" -ForegroundColor Cyan
Write-Host "🔌 Database URL: $($PostgresUrl -replace ':[^@]*@', ':***@')" -ForegroundColor Cyan
Write-Host ""

# Chạy psql command
try {
    # Dùng psql để import schema
    $psqlContent = Get-Content $SchemaFile -Raw
    
    # Escape single quotes cho PowerShell
    $psqlContent = $psqlContent -replace "'", "''"
    
    Write-Host "⏳ Đang chạy schema..." -ForegroundColor Yellow
    $output = psql $PostgresUrl -f $SchemaFile
    
    Write-Host "✅ Schema setup thành công!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Kết quả:" -ForegroundColor Cyan
    Write-Host $output
}
catch {
    Write-Host "❌ Lỗi khi chạy schema: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Hoàn tất! PostgreSQL trên Railway đã sẵn sàng." -ForegroundColor Green
