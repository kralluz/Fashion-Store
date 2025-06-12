## 🎓 Contexto Acadêmico

**Curso:** Bacharelado em Sistemas de Informação  
**Disciplina:** Gestão de Redes de Computadores  
**Semestre:** 2025/01  

**Equipe:**
- Carlos Henrique Alves
- Felipe Gomes  
- Iago José
- Victor Augusto


# Fashion Store - Sistema de E-commerce

## ️ Sobre o Projeto

Sistema de **e-commerce para loja de roupas** desenvolvido em **Next.js** com foco em containerização Docker e serviços de rede.

---

## 🚀 Como Executar

### 📋 Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### ⚡ Execução Rápida

#### **Opção 1: Scripts Automatizados (Recomendado)**

**Windows:**
```powershell
.\docker-build.ps1    # Build otimizado
docker-compose up     # Executar aplicação
```

**Linux/Mac:**
```bash
chmod +x docker-build.sh
./docker-build.sh     # Build otimizado
docker-compose up     # Executar aplicação
```

#### **Opção 2: Comandos Diretos**
```bash
# Tudo em um comando
docker-compose up --build

# Ou usando NPM scripts
npm run docker:dev
npm run docker:build
npm run docker:up
npm run docker:stop
```

### 🌐 Acessar Aplicação
- **URL:** http://localhost:3000

---

## 🔧 Comandos Úteis

### � Monitoramento
```bash
docker-compose logs -f     # Ver logs
docker ps                  # Containers ativos
docker stats              # Uso de recursos
```

### 🧹 Limpeza
```bash
docker-compose down       # Parar containers
docker image prune        # Limpar imagens não usadas
docker system prune -a    # Limpeza completa
```

### �️ Desenvolvimento
```bash
docker-compose build --no-cache    # Build sem cache
docker-compose exec fashion-store sh    # Acessar container
```

---

## 🚨 Solução de Problemas

### Porta já em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000
kill -9 <PID>
```

### Build lento
```bash
docker builder prune      # Limpar cache
npm run docker:build     # Build otimizado
```

### Permissões (Linux/Mac)
```bash
chmod +x docker-build.sh
chmod +x *.sh
```

---

## 📦 Stack Tecnológica

- **Frontend:** Next.js 14 + React 18
- **Containerização:** Docker + Docker Compose  
- **Base Image:** Node.js 18 Alpine Linux
- **Styling:** CSS Modules

---

## � Estrutura do Projeto

```
Fashion-Store/
├── 🐳 Dockerfile              # Configuração da imagem
├── 🐙 docker-compose.yml     # Orquestração
├── 🖥️ docker-build.ps1      # Script Windows
├── 🐧 docker-build.sh       # Script Linux/Mac
├── 📝 README.md             # Orientações de uso
└── 📋 INFRASTRUCTURE-DETAILS.md  # Detalhes técnicos
```

---

## 🎓 Contexto Acadêmico

**Curso:** Bacharelado em Sistemas de Informação  
**Disciplina:** Gestão de Redes de Computadores  
**Semestre:** 2025/01  

**Equipe:**
- Carlos Henrique Alves
- Felipe Gomes  
- Iago José
- Victor Augusto

---

*Para detalhes técnicos da arquitetura, consulte [INFRASTRUCTURE-DETAILS.md](./INFRASTRUCTURE-DETAILS.md)*
