#!/bin/bash

# Script para build rápido do Docker
echo "🚀 Iniciando build otimizado..."

# Build com cache e sem logs desnecessários
docker-compose build --no-cache --quiet fashion-store

echo "✅ Build concluído!"
echo "🌐 Para subir o app: docker-compose up"
echo "📱 Acesse: http://localhost:3000"
