Write-Host "🚀 Iniciando build otimizado..." -ForegroundColor Green

docker-compose build --parallel fashion-store

Write-Host "✅ Build concluído!" -ForegroundColor Green
Write-Host "🌐 Para subir o app: docker-compose up" -ForegroundColor Yellow
Write-Host "📱 Acesse: http://localhost:3000" -ForegroundColor Cyan
