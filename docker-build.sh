#!/bin/bash

echo "🚀 Iniciando build otimizado..."

docker-compose build --no-cache --quiet fashion-store

echo "✅ Build concluído!"
echo "🌐 Para subir o app: docker-compose up"
echo "📱 Acesse: http://localhost:3000"
