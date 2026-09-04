# syntax=docker/dockerfile:1.4

# ========================================
# Stage 1: Base de desenvolvimento
# ========================================
FROM node:20-alpine AS base
WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apk add --no-cache python3 make g++

# Copiar arquivos de dependências
COPY package*.json ./

# ========================================
# Stage 2: Dependências de produção
# ========================================
FROM base AS deps-production
RUN npm ci --only=production && \
    npm cache clean --force

# ========================================
# Stage 3: Todas as dependências (incluindo dev)
# ========================================
FROM base AS deps-all
RUN npm ci && npm cache clean --force

# ========================================
# Stage 4: Build da aplicação
# ========================================
FROM deps-all AS build
COPY . .
RUN npm run build

# ========================================
# Stage 5: Imagem final de produção
# ========================================
FROM node:20-alpine AS production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copiar apenas arquivos necessários
COPY --from=deps-production /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.sequelizerc ./.sequelizerc

# Criar diretório de uploads com permissões
RUN mkdir -p uploads/images && chown -R nodejs:nodejs uploads

# Variáveis de ambiente padrão
ENV NODE_ENV=production \
    APP_PORT=3001

EXPOSE 3001

# Usar usuário não-root
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })" || exit 1

CMD ["node", "dist/server.js"]

# ========================================
# Stage 6: Imagem de desenvolvimento
# ========================================
FROM deps-all AS development

WORKDIR /app
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]