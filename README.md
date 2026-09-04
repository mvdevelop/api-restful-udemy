# API RESTful - Node.js + TypeScript

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📚 Descrição

API RESTful completa com CRUD de usuários e alunos, autenticação JWT, upload de imagens e documentação Swagger/OpenAPI. Desenvolvida com foco em **boas práticas profissionais** e **código de produção**.

### ✨ Funcionalidades

- **🔐 Autenticação JWT** com bcrypt para hashing de senhas
- **📝 CRUD Completo** de usuários e alunos
- **🖼️ Upload de Imagens** com multer
- **📚 Documentação Swagger** acessível em `/api-docs`
- **✅ Validação de Dados** com Zod
- **🏥 Health Check** endpoint para monitoramento
- **📝 Logs Estruturados** com Pino
- **🐳 Docker Ready** para fácil deploy

### 🛠️ Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| **Node.js + Express** | Runtime e framework web |
| **TypeScript** | Superset JavaScript com tipos |
| **Sequelize + MariaDB** | ORM e banco de dados |
| **JWT + Bcrypt** | Autenticação e segurança |
| **Zod** | Validação de schema |
| **Pino** | Logging estruturado |
| **Swagger/OpenAPI** | Documentação da API |
| **Docker** | Containerização |

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose (opcional)
- MariaDB ou MySQL (ou usar Docker)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/mvdevelop/api-restful-udemy.git
cd api-restful-udemy

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais
```

### Variáveis de Ambiente (.env)

```env
# Server
APP_PORT=3001
APP_URL=http://localhost:3001
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=sua_senha
DATABASE=api_restful

# JWT
TOKEN_SECRET=seu_secret_aqui
TOKEN_EXPIRATION=7d
```

### Scripts Disponíveis

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Verificar tipos TypeScript
npm run typecheck

# Verificar código (ESLint)
npm run lint

# Formatar código (Prettier)
npm run format

# Rodar testes
npm test

# Build de produção
npm run build

# Iniciar produção
npm start
```

---

## 🐳 Docker

### Desenvolvimento com Docker Compose

```bash
# Subir todos os serviços (API + MariaDB + Adminer)
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar serviços
docker-compose down
```

### Build de Produção

```bash
# Build da imagem
docker build -t api-restful --target production .

# Run com variáveis de ambiente
docker run -p 3001:3001 \
  -e DATABASE_HOST=host.docker.internal \
  -e TOKEN_SECRET=your-secret \
  api-restful
```

### Serviços Disponíveis

| Serviço | URL |
|---------|-----|
| API | http://localhost:3001 |
| Swagger Docs | http://localhost:3001/api-docs |
| Adminer (BD) | http://localhost:8080 |

---

## 📡 Endpoints da API

### Autenticação

```bash
# Login - Obter token JWT
curl -X POST http://localhost:3001/tokens \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@email.com","password":"senha123"}'
```

### Usuários

```bash
# Criar usuário
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","password":"senha123"}'

# Atualizar usuário (requer token)
curl -X PUT http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"nome":"João Atualizado"}'

# Deletar usuário (requer token)
curl -X DELETE http://localhost:3001/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Alunos

```bash
# Listar todos os alunos
curl http://localhost:3001/alunos

# Obter aluno por ID
curl http://localhost:3001/alunos/1

# Criar aluno (requer token)
curl -X POST http://localhost:3001/alunos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"nome":"Maria","sobrenome":"Santos","email":"maria@email.com","idade":25}'

# Atualizar aluno (requer token)
curl -X PUT http://localhost:3001/alunos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"idade":26}'

# Deletar aluno (requer token)
curl -X DELETE http://localhost:3001/alunos/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Upload de Fotos

```bash
# Enviar foto (requer token)
curl -X POST http://localhost:3001/fotos \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -F "foto=@/caminho/para/imagem.jpg" \
  -F "aluno_id=1"
```

### Monitoramento

```bash
# Health check
curl http://localhost:3001/health
```

---

## 📂 Estrutura do Projeto

```
api-restful-udemy/
├── src/
│   ├── config/          # Configurações (DB, logger, swagger, multer)
│   ├── controllers/     # Lógica de negócio (CRUD)
│   ├── database/       # Conexão e migrations
│   ├── middlewares/     # Interceptadores (auth, validation, errors)
│   ├── models/         # Modelos Sequelize
│   ├── routes/          # Definição de rotas
│   ├── validators/      # Schemas Zod
│   ├── utils/          # Utilitários (AppError)
│   ├── types/          # Definições TypeScript
│   ├── app.ts          # Configuração do Express
│   └── server.ts       # Entry point
├── tests/              # Testes unitários
├── uploads/            # Arquivos uploadados
├── docker-compose.yml  # Orquestração Docker
├── Dockerfile         # Build da imagem
├── tsconfig.json      # Configuração TypeScript
└── package.json
```

---

## 🔒 Segurança

- **Helmet** - Headers de segurança HTTP
- **CORS** - Controle de origens permitidas
- **Rate Limiting** - Proteção contra DDoS (a implementar)
- **Validação Zod** - Sanitização de inputs
- **JWT** - Tokens com expiração
- **Bcrypt** - Hash de senhas (cost factor 8)

---

## 🧪 Testes

```bash
# Rodar todos os testes
npm test

# Com coverage
npm run test:coverage

# Modo watch
npm run test:watch
```

---

## 📖 Documentação

A documentação Swagger está disponível em `/api-docs` quando a API está rodando:

- Leia e teste todos os endpoints
- Autentique-se copiando o token JWT
- Veja schemas de request/response

---

## 🧑‍💻 Autor

**mvdevelop**

- GitHub: [@mvdevelop](https://github.com/mvdevelop)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
