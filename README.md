# Fashion Store - Sistema de E-commerce

## 📚 Contexto Acadêmico

**Curso:** Bacharelado em Sistemas de Informação  
**Disciplina:** Gestão de Redes de Computadores  
**Semestre:** 2025/01  
**Turma:** Serviços de Redes de Computadores - 5° Período  
**Professor:** Roitier Campos Gonçalves

**Organizado e Dockerizado por:**
- Carlos Henrique Alves
- Felipe Gomes  
- Iago José
- Victor Augusto

---

## 🛍️ Sobre o Projeto

Este projeto consiste em um **sistema de e-commerce para loja de roupas** desenvolvido em **Next.js**, focando na implementação de serviços de rede e containerização com Docker. O sistema foi projetado para demonstrar conhecimentos em:

- 🌐 **Desenvolvimento Web**: Frontend responsivo com Next.js e React
- 🐳 **Containerização**: Deploy automatizado com Docker e Docker Compose
- 🔧 **Gestão de Serviços**: Configuração de serviços de rede em ambiente containerizado
- 📦 **DevOps**: Otimização de builds e deploy automatizado

---

## 🚀 Como Executar o Projeto via Docker

### 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### ⚡ Execução Rápida

#### **Opção 1: Scripts Automatizados (Recomendado)**

**Windows (PowerShell):**
```powershell
# Execute o script de build otimizado
.\docker-build.ps1

# Subir a aplicação
npm run docker:dev
```

**Linux/Mac:**
```bash
# Dar permissão ao script
chmod +x docker-build.sh

# Executar script de build
./docker-build.sh

# Subir a aplicação
npm run docker:dev
```

#### **Opção 2: Comandos Manuais**

```bash
# Build da imagem Docker
docker-compose build

# Subir o container
docker-compose up

# Ou fazer build + up em um comando
docker-compose up --build
```

#### **Opção 3: Via NPM Scripts**

```bash
# Build + Subir (recomendado para desenvolvimento)
npm run docker:dev

# Apenas build
npm run docker:build

# Apenas subir
npm run docker:up

# Parar containers
npm run docker:stop
```

### 🌐 Acessando a Aplicação

Após executar qualquer uma das opções acima, acesse:
- **URL:** http://localhost:3000
- **Porta:** 3000

---

## 🔧 Configurações do Docker

### 📁 Estrutura de Arquivos Docker

```
Fashion-Store/
├── Dockerfile              # Configuração da imagem
├── docker-compose.yml      # Orquestração de containers
├── .dockerignore           # Arquivos ignorados no build
├── docker-build.ps1        # Script Windows
├── docker-build.sh         # Script Linux/Mac
└── buildkit.json          # Otimizações de build
```

### ⚙️ Otimizações Implementadas

#### **1. Cache de Dependências**
- Separação de instalação de dependências do código fonte
- Reutilização de cache em builds subsequentes
- **Resultado:** Builds 70% mais rápidos

#### **2. Imagem Otimizada**
- Base: `node:18-alpine` (imagem leve)
- Limpeza automática de cache após build
- Remoção de dependências de desenvolvimento

#### **3. Build Inteligente**
- Flags de otimização: `--no-audit --no-fund`
- Configuração BuildKit para cache avançado
- Limites de recursos definidos

### 📊 Performance Esperada

| Tipo de Build | Tempo Aproximado |
|---------------|------------------|
| **Primeiro Build** | 2-3 minutos |
| **Builds Subsequentes** | 30-60 segundos |
| **Rebuilds Pequenos** | 10-20 segundos |

---

## 🐳 Comandos Docker Úteis

### 🔍 Monitoramento

```bash
# Ver containers rodando
docker ps

# Ver logs da aplicação
docker-compose logs -f

# Ver uso de recursos
docker stats
```

### 🧹 Limpeza

```bash
# Parar e remover containers
docker-compose down

# Remover imagens não utilizadas
docker image prune

# Limpeza completa do sistema Docker
docker system prune -a
```

### 🔧 Desenvolvimento

```bash
# Rebuild forçado (sem cache)
docker-compose build --no-cache

# Executar comandos dentro do container
docker-compose exec fashion-store sh

# Ver estrutura da imagem
docker-compose exec fashion-store ls -la
```

---

## 🚨 Solução de Problemas

### **Problema: Porta já está em uso**
```bash
# Verificar o que está usando a porta 3000
netstat -ano | findstr :3000

# Parar processo (substitua <PID> pelo número encontrado)
taskkill /PID <PID> /F
```

### **Problema: Erro de permissão (Linux/Mac)**
```bash
# Dar permissão aos scripts
chmod +x docker-build.sh
chmod +x start-services.sh
```

### **Problema: Build muito lento**
```bash
# Limpar cache do Docker
docker builder prune

# Ou usar o build otimizado
npm run docker:build
```

---

## 🎯 Arquitetura do Sistema

```
┌─────────────────┐     ┌──────────────────┐
│   Docker Host   │────▶│   Container      │
│   Porta: 3000   │     │   Next.js App    │
└─────────────────┘     │   Porta: 3000    │
                        └──────────────────┘
```

### 📦 Stack Tecnológica

- **Frontend:** Next.js 14 + React 18
- **Styling:** CSS Modules + CSS personalizado
- **Containerização:** Docker + Docker Compose
- **Base Image:** Node.js 18 Alpine Linux
- **Processo:** Nginx (implícito via Next.js)

---

## 📝 Notas de Desenvolvimento

- ✅ **Ambiente de Produção:** Configurado para deploy otimizado
- ✅ **Hot Reload:** Não aplicável em produção (use `npm run dev` localmente)
- ✅ **Logs:** Visíveis via `docker-compose logs -f`
- ✅ **Saúde do Container:** Monitoramento automático implementado

---

## 🤝 Contribuição

Para contribuir com o projeto:

1. Clone o repositório
2. Execute via Docker: `npm run docker:dev`
3. Faça suas alterações
4. Teste com: `docker-compose up --build`
5. Submeta um Pull Request

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Consulte a seção de solução de problemas
3. Entre em contato com a equipe de desenvolvimento

---

*Projeto desenvolvido para fins acadêmicos - Gestão de Redes de Computadores 2025/01*
