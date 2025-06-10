# 🏗️ Arquitetura de Infraestrutura - Fashion Store

## 📝 Deploy Local Tradicional (Antes do Docker)

### Desenvolvimento Local
```bash
# Processo tradicional de desenvolvimento
npm install          # Instala todas as dependências (dev + prod)
npm run dev          # Servidor de desenvolvimento (porta 3000)
```

**Estrutura gerada:**
- `node_modules/` - Todas as dependências (incluindo dev)
- `.next/` - Cache e build de desenvolvimento
- Servidor de desenvolvimento com hot-reload

### Build de Produção Local
```bash
# Build para produção
npm run build        # Compila aplicação
npm start           # Servidor de produção
```

**Limitações do deploy local:**
- ❌ Dependência do ambiente Node.js local
- ❌ node_modules completo (incluindo devDependencies)
- ❌ Sem isolamento de ambiente
- ❌ Configuração manual em cada máquina

---

## 🐳 Arquitetura Dockerizada

### Configuração Next.js Standalone

**next.config.js:**
```javascript
const nextConfig = {
  output: 'standalone',  // ← Chave para otimização
}
```

### Como o Docker Funciona

#### 1. **Processo de Build**
Quando executa `npm run build` no Docker:

```
npm run build
    ↓
Next.js detecta output: 'standalone'
    ↓
Gera DUAS versões:
├── .next/                    ← Versão completa (desenvolvimento)
└── .next/standalone/         ← Versão otimizada (produção)
```

#### 2. **Estrutura Standalone Gerada**

```
.next/standalone/
├── server.js                 ← Servidor Node.js independente
├── .next/                    ← Build otimizado
├── node_modules/             ← Apenas dependências de produção
├── pages/                    ← Páginas copiadas
└── package.json              ← Package minificado
```

#### 3. **Execução no Docker**

```bash
CMD ["npm", "start"]
    ↓
Next.js detecta configuração standalone
    ↓
Automaticamente executa .next/standalone/server.js
    ↓
Servidor independente (não precisa do framework Next.js completo)
```

### Vantagens da Arquitetura Standalone

| Aspecto | Tradicional | Docker Standalone |
|---------|------------|-------------------|
| **Tamanho** | ~500MB+ | ~150MB |
| **Dependências** | Todas (dev+prod) | Apenas produção |
| **Startup** | ~3-5s | ~1-2s |
| **Runtime** | Framework completo | Servidor independente |
| **Portabilidade** | Dependente do ambiente | Container isolado |

### Detalhes Técnicos da Implementação

#### **Dockerfile Otimizado**
```dockerfile
# Multi-layer para cache
COPY package*.json ./           # Layer 1: Dependencies
RUN npm ci --only=production    
COPY . .                        # Layer 2: Source code
RUN npm run build               # Layer 3: Build (gera standalone)
CMD ["npm", "start"]            # Executa standalone automaticamente
```

#### **O que acontece internamente:**

1. **Build Time:**
   - Next.js analisa dependências usadas
   - Copia apenas arquivos necessários para standalone
   - Gera server.js otimizado
   - Remove código não utilizado (tree-shaking)

2. **Runtime:**
   - server.js atua como servidor HTTP independente
   - Serve arquivos estáticos diretamente
   - Não carrega framework Next.js completo
   - Menor uso de memória

#### **Comparação de Arquivos:**

**Desenvolvimento Local:**
```
node_modules/     ~200MB (todas deps)
.next/           ~50MB (cache + build)
Total: ~250MB
```

**Docker Standalone:**
```
.next/standalone/
├── node_modules/     ~30MB (só produção)
├── .next/           ~20MB (otimizado)
├── server.js        ~5KB (servidor independente)
Total: ~50MB
```

### Configuração de Orquestração

**docker-compose.yml:**
```yaml
services:
  fashion-store:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production     # Força modo produção
      - HOSTNAME=0.0.0.0       # Permite acesso externo
```

**Variáveis de ambiente específicas:**
- `NODE_ENV=production` → Ativa otimizações do Next.js
- `HOSTNAME=0.0.0.0` → Permite binding em todas as interfaces de rede

### Considerações Técnicas

#### **Processo de Inicialização**
1. Container inicia com `CMD ["npm", "start"]`
2. Next.js detecta `NODE_ENV=production`
3. Procura por configuração `standalone` no next.config.js
4. Automaticamente executa `.next/standalone/server.js`
5. Servidor HTTP independente na porta 3000

#### **Diferenças de Runtime**

| Desenvolvimento Local | Docker Standalone |
|----------------------|-------------------|
| Framework Next.js completo | Servidor HTTP minimalista |
| Hot-reload ativo | Sem hot-reload (produção) |
| DevTools disponíveis | Apenas runtime necessário |
| Todas as dependências | Apenas produção |

#### **Variáveis de Ambiente Críticas**
- `NODE_ENV=production` → Ativa otimizações do Next.js
- `HOSTNAME=0.0.0.0` → Permite acesso externo ao container
- `PORT=3000` → Porta do servidor (pode ser customizada)

---

*Documentação técnica da arquitetura de containerização Next.js standalone*
