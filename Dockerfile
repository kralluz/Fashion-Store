# Dockerfile - Fashion Store Frontend (Otimizado)
FROM node:18-alpine

WORKDIR /app

# 1. Cache de dependências - copia apenas package.json primeiro
COPY package*.json ./
RUN npm ci --only=production --silent --no-audit --no-fund

# 2. Copia código apenas depois das dependências
COPY . .

# 3. Build otimizado
RUN npm run build

# 4. Remove arquivos desnecessários após build
RUN rm -rf node_modules/.cache \
    && rm -rf .next/cache \
    && npm prune --production

# Expor porta
EXPOSE 3000

# Start simples (sem healthcheck para acelerar)
CMD ["npm", "start"]
