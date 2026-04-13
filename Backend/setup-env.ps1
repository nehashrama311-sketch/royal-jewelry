# setup-env.ps1
# Windows PowerShell script to create .env file

Write-Host "🔧 Creating .env file..." -ForegroundColor Cyan

$envContent = @"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://root:root@cluster0.mope8mq.mongodb.net/royal-jewellery?retryWrites=true&w=majority
"@

# Create .env file
$envFile = ".env"

if (Test-Path $envFile) {
    Write-Host "⚠️  .env file already exists!" -ForegroundColor Yellow
    $confirm = Read-Host "Do you want to overwrite it? (y/n)"
    if ($confirm -ne "y") {
        Write-Host "❌ Cancelled" -ForegroundColor Red
        exit
    }
}

$envContent | Out-File -Encoding UTF8 -FilePath $envFile -Force

Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📄 File location: " -ForegroundColor Cyan -NoNewline
Write-Host "$(Get-Location)\.env" -ForegroundColor White
Write-Host ""
Write-Host "📋 Content:" -ForegroundColor Cyan
Get-Content $envFile | Write-Host
Write-Host ""
Write-Host "🚀 You can now run: npm start" -ForegroundColor Green