# 📋 Detalhamento da Infraestrutura Docker - Fashion Store

Este documento explica linha por linha cada arquivo de infraestrutura Docker do projeto Fashion Store, desenvolvido para uso acadêmico com foco na containerização do frontend Next.js.

## 📁 Estrutura dos Arquivos de Infraestrutura

```
Fashion-Store/
├── 🐳 Dockerfile              # Receita de construção da imagem
├── 🐙 docker-compose.yml     # Orquestração do ambiente
├── ⚡ buildkit.json         # Configuração de otimização de cache
├── 🖥️ docker-build.ps1      # Script de build para Windows
└── 🐧 docker-build.sh       # Script de build para Linux/Mac
```

---

## 🐳 Dockerfile (Frontend Next.js)

O `Dockerfile` é o arquivo que define como construir a imagem Docker da aplicação. Cada linha tem um propósito específico:

### 📝 Análise Linha por Linha

```dockerfile
# Dockerfile - Fashion Store Frontend (Otimizado)
FROM node:18-alpine
```
**Explicação**: Define a imagem base usando Node.js 18 na distribuição Alpine Linux
- `node:18-alpine`: Versão otimizada e minimalista do Node.js
- Alpine Linux é 5-10x menor que imagens Ubuntu/Debian
- Reduz tempo de download e vulnerabilidades de segurança

```dockerfile
WORKDIR /app
```
**Explicação**: Define o diretório de trabalho dentro do container
- Todos os comandos subsequentes executarão em `/app`
- Organiza o filesystem e evita conflitos com arquivos do sistema

```dockerfile
# 1. Cache de dependências - copia apenas package.json primeiro
COPY package*.json ./
```
**Explicação**: Estratégia de cache otimizada - copia apenas arquivos de dependências
- `package*.json` inclui `package.json` e `package-lock.json`
- Docker criará uma layer separada para dependências
- Se o código mudar mas dependências não, essa layer será reutilizada

```dockerfile
RUN npm ci --only=production --silent --no-audit --no-fund
```
**Explicação**: Instala dependências de forma otimizada
- `npm ci`: Instalação "clean" baseada no package-lock.json (mais rápida que npm install)
- `--only=production`: Instala apenas dependências de produção (não devDependencies)
- `--silent`: Reduz logs verbosos
- `--no-audit`: Pula verificação de vulnerabilidades (acelera o build)
- `--no-fund`: Remove mensagens de funding desnecessárias

```dockerfile
# 2. Copia código apenas depois das dependências
COPY . .
```
**Explicação**: Copia todo o código fonte para o container
- Executado após instalação das dependências para otimizar cache
- Se apenas o código mudar, as dependências não serão reinstaladas

```dockerfile
# 3. Build otimizado
RUN npm run build
```
**Explicação**: Executa o build de produção do Next.js
- Compila o código para produção
- Otimiza assets, CSS, JavaScript
- Gera páginas estáticas quando possível

```dockerfile
# 4. Remove arquivos desnecessários após build
RUN rm -rf node_modules/.cache \
    && rm -rf .next/cache \
    && npm prune --production
```
**Explicação**: Limpeza pós-build para reduzir tamanho da imagem
- Remove cache do npm e Next.js que não será usado em produção
- `npm prune --production`: Remove dependências de desenvolvimento desnecessárias

```dockerfile
# Expor porta
EXPOSE 3000
```
**Explicação**: Documenta que a aplicação usa a porta 3000
- Não abre a porta (isso é feito no docker-compose.yml)
- Serve como documentação para outros desenvolvedores

```dockerfile
# Start simples (sem healthcheck para acelerar)
CMD ["npm", "start"]
```
**Explicação**: Define o comando padrão para iniciar a aplicação
- `npm start`: Executa o servidor Next.js em produção
- Formato array (exec form) é mais eficiente que string

---

## 🐙 docker-compose.yml (Orquestração)

O `docker-compose.yml` define como os serviços são executados e conectados.

### 📝 Análise Linha por Linha

```yaml
services:
```
**Explicação**: Inicia a definição dos serviços (containers) da aplicação

```yaml
  fashion-store:
```
**Explicação**: Nome do serviço principal da aplicação
- Pode ser referenciado por outros serviços ou scripts
- Define um container único para o frontend

```yaml
    build: 
      context: .
      dockerfile: Dockerfile
```
**Explicação**: Configuração de build da imagem
- `context: .`: Usa o diretório atual como contexto de build
- `dockerfile: Dockerfile`: Especifica qual Dockerfile usar

```yaml
      # Cache buildkit para builds mais rápidos
      cache_from:
        - node:18-alpine
```
**Explicação**: Otimização de cache para builds mais rápidos
- Instrui o Docker a usar a imagem base como fonte de cache
- Reduz tempo de rebuild quando apenas código muda

```yaml
    container_name: fashion-store-frontend
```
**Explicação**: Nome específico para o container
- Facilita identificação em comandos Docker
- Evita nomes aleatórios gerados automaticamente

```yaml
    ports:
      - "3000:3000"
```
**Explicação**: Mapeamento de portas
- `3000:3000`: Mapeia porta 3000 do host para porta 3000 do container
- Permite acesso via `http://localhost:3000`

```yaml
    environment:
      - NODE_ENV=production
      - HOSTNAME=0.0.0.0    # Restart apenas se necessário
```
**Explicação**: Variáveis de ambiente para o container
- `NODE_ENV=production`: Define ambiente de produção para Next.js
- `HOSTNAME=0.0.0.0`: Permite acesso de qualquer IP (necessário para Docker)

```yaml
    restart: unless-stopped
```
**Explicação**: Política de reinicialização do container
- Container reinicia automaticamente se parar por erro
- Não reinicia se for parado manualmente (`docker stop`)

```yaml
    # Sem limites para máxima performance em desenvolvimento
```
**Explicação**: Comentário explicando ausência de limites de recursos
- Em produção real, seria recomendado definir limites de CPU/memória
- Para uso acadêmico, máxima performance é priorizada

---

## ⚡ buildkit.json (Otimização de Cache)

Arquivo de configuração do Docker BuildKit para otimização avançada de cache.

### 📝 Análise Linha por Linha

```json
{
  "builder": {
```
**Explicação**: Configuração principal do builder Docker
- Define configurações globais para o processo de build

```json
    "gc": {
```
**Explicação**: Garbage Collection - limpeza automática de cache
- Gerencia automaticamente o espaço usado pelo cache do Docker

```json
      "defaultKeepStorage": "20GB",
```
**Explicação**: Limite padrão de armazenamento de cache
- Mantém até 20GB de cache para reutilização
- Balanceia performance vs. espaço em disco

```json
      "policy": [
```
**Explicação**: Políticas específicas de limpeza de cache
- Array de regras para diferentes cenários de limpeza

```json
        {"keepStorage": "10GB", "filter": ["unused-for=2400h"]},
```
**Explicação**: Primeira política de limpeza
- Mantém 10GB de cache não usado há 100 dias (2400h)
- Cache muito antigo é removido primeiro

```json
        {"keepStorage": "50GB", "filter": ["unused-for=3600h"]},
```
**Explicação**: Segunda política de limpeza
- Mantém 50GB de cache não usado há 150 dias (3600h)
- Permite mais cache para projetos menos ativos

```json
        {"keepStorage": "100GB", "all": true}
```
**Explicação**: Política final de emergência
- Limite absoluto de 100GB para todo tipo de cache
- Previne que o cache consuma todo o disco

---

## 🖥️ docker-build.ps1 (Script Windows)

Script PowerShell para automação de build no Windows.

### 📝 Análise Linha por Linha

```powershell
# Script PowerShell para build rápido
Write-Host "🚀 Iniciando build otimizado..." -ForegroundColor Green
```
**Explicação**: Mensagem de início com cores
- `Write-Host`: Comando PowerShell para output colorido
- `-ForegroundColor Green`: Define cor verde para visibilidade

```powershell
# Build com cache
docker-compose build --parallel fashion-store
```
**Explicação**: Executa build otimizado
- `docker-compose build`: Constrói apenas serviços que mudaram
- `--parallel`: Permite builds paralelos (útil para múltiplos serviços)
- `fashion-store`: Especifica apenas o serviço desejado

```powershell
Write-Host "✅ Build concluído!" -ForegroundColor Green
Write-Host "🌐 Para subir o app: docker-compose up" -ForegroundColor Yellow
Write-Host "📱 Acesse: http://localhost:3000" -ForegroundColor Cyan
```
**Explicação**: Mensagens informativas pós-build
- Guia o usuário sobre próximos passos
- Cores diferentes para diferentes tipos de informação
- URLs clicáveis para facilitar acesso

---

## 🐧 docker-build.sh (Script Linux/Mac)

Script Bash para automação de build em sistemas Unix.

### 📝 Análise Linha por Linha

```bash
#!/bin/bash
```
**Explicação**: Shebang - define o interpretador
- Instrui o sistema a usar bash para executar o script
- Necessário para execução direta (`./docker-build.sh`)

```bash
# Script para build rápido do Docker
echo "🚀 Iniciando build otimizado..."
```
**Explicação**: Mensagem informativa de início
- `echo`: Comando básico de output em bash
- Emojis funcionam em terminais modernos

```bash
# Build com cache e sem logs desnecessários
docker-compose build --no-cache --quiet fashion-store
```
**Explicação**: Build otimizado para Unix
- `--no-cache`: Força rebuild completo (diferente do Windows)
- `--quiet`: Reduz verbosidade dos logs
- Abordagem mais conservadora para garantir builds limpos

```bash
echo "✅ Build concluído!"
echo "🌐 Para subir o app: docker-compose up"
echo "📱 Acesse: http://localhost:3000"
```
**Explicação**: Instruções pós-build
- Orientações claras sobre próximos passos
- Consistente com a versão Windows

---

## 🎯 Fluxo de Funcionamento Integrado

### 1. **Processo de Build**
```
buildkit.json → Otimização de cache
Dockerfile → Construção da imagem
docker-compose.yml → Orquestração
Scripts → Automação do processo
```

### 2. **Ordem de Execução**
1. **BuildKit** lê configurações de cache
2. **Dockerfile** executa steps de build usando cache otimizado
3. **docker-compose.yml** orquestra o container final
4. **Scripts** automatizam todo o processo

### 3. **Otimizações Implementadas**

#### 🚀 **Performance**
- Cache em layers do Dockerfile
- BuildKit com garbage collection inteligente
- Builds paralelos quando possível
- Remoção de arquivos desnecessários

#### 📦 **Tamanho**
- Imagem Alpine Linux (minimalista)
- Apenas dependências de produção
- Limpeza pós-build automática

#### 🛠️ **Desenvolvedor**
- Scripts automatizados para diferentes SOs
- Mensagens coloridas e informativas
- Um comando para build completo

---

## 🎓 Considerações Acadêmicas

### **Conceitos de DevOps Demonstrados**
- **Containerização**: Isolamento e portabilidade da aplicação
- **Orquestração**: Gerenciamento de containers com docker-compose
- **Automação**: Scripts para diferentes plataformas
- **Otimização**: Cache inteligente e builds eficientes

### **Boas Práticas Aplicadas**
- **Multi-stage build implícito**: Separação de dependências e código
- **Security**: Execução como usuário não-root (Alpine padrão)
- **Maintainability**: Comentários explicativos em todos os arquivos
- **Cross-platform**: Suporte a Windows, Linux e Mac

### **Cenários de Uso**
- **Desenvolvimento**: `docker-compose up` para ambiente completo
- **Build rápido**: Scripts automatizados por plataforma
- **Produção**: Imagem otimizada e configurável
- **CI/CD**: Dockerfile pronto para pipelines de deploy

---

## 🔧 Comandos Úteis para Cada Arquivo

### **Dockerfile**
```bash
# Build manual da imagem
docker build -t fashion-store .

# Build com cache específico
docker build --cache-from=node:18-alpine -t fashion-store .
```

### **docker-compose.yml**
```bash
# Subir aplicação
docker-compose up -d

# Rebuild e subir
docker-compose up --build

# Ver logs
docker-compose logs -f fashion-store
```

### **Scripts de Build**
```bash
# Windows
.\docker-build.ps1

# Linux/Mac
chmod +x docker-build.sh
./docker-build.sh
```

### **BuildKit**
```bash
# Verificar espaço usado
docker system df

# Limpeza manual
docker builder prune --keep-storage=10GB
```

---

## 📚 Recursos Adicionais

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [BuildKit Advanced Features](https://docs.docker.com/build/buildkit/)

---

*Este documento foi criado para fins educacionais, demonstrando conceitos modernos de containerização e DevOps aplicados a uma aplicação Next.js.*
