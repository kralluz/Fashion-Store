FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production --silent --no-audit --no-fund

COPY . .

RUN npm run build

RUN rm -rf node_modules/.cache \
    && rm -rf .next/cache \
    && npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
