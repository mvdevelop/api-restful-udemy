
## 🚀 API RESTful - Node.js Udemy Studies

Uma API robusta, escalável e padronizada desenvolvida durante estudos avançados na Udemy, focada no gerenciamento de recursos via protocolo HTTP e seguindo rigorosamente os princípios REST.

## 🚀 Funcionalidades

* **CRUD Completo:** Gerenciamento total de recursos (Criar, Ler, Atualizar e Deletar).
* **Autenticação Segura:** Sistema de login com geração de tokens JWT (JSON Web Token).
* **Proteção de Rotas:** Middlewares que restringem o acesso a endpoints sensíveis apenas para usuários autenticados.
* **Persistência de Dados:** Integração com banco de dados para armazenamento confiável de informações.
* **Criptografia:** Hashing de senhas utilizando Bcrypt para garantir a segurança dos dados dos usuários.
* **Tratamento de Erros:** Respostas padronizadas para facilitar a integração com o front-end.

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução para JavaScript no servidor.
* **Express.js:** Framework minimalista para gerenciamento de rotas e middlewares.
* **MongoDB & Mongoose:** Banco de dados NoSQL e modelagem de objetos (ou utilize PostgreSQL/Sequelize se for o caso).
* **JWT (JSON Web Token):** Padrão de mercado para autenticação segura.
* **BcryptJS:** Algoritmo de hashing para segurança de senhas.
* **Dotenv:** Gerenciamento de variáveis de ambiente sensíveis.

## 📦 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/mvdevelop/api-restful-udemy.git](https://github.com/mvdevelop/api-restful-udemy.git)
   cd api-restful-udemy
Instale as dependências:

Bash

npm install
Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz do projeto e preencha com suas credenciais:

Snippet de código

PORT=3000
MONGO_URI="SUA_URL_DO_MONGODB"
JWT_SECRET="SUA_CHAVE_SECRETA_AQUI"
Inicie o servidor:

Bash

npm run dev
A API estará disponível em: http://localhost:3000

📂 Estrutura de Pastas
Plaintext

api-restful-udemy/
├── src/
│   ├── controllers/ # Lógica de processamento das rotas
│   ├── models/      # Definição dos esquemas de dados
│   ├── routes/      # Endpoints e caminhos da API
│   ├── middlewares/ # Interceptadores de segurança e validação
│   ├── config/      # Configurações de banco e ambiente
│   └── app.js       # Ponto de entrada da aplicação
├── .env             # Variáveis de ambiente
└── package.json     # Scripts e dependências

## 🎨 Preview da Interface
Nota: Por ser uma API, você pode testar todos os endpoints utilizando ferramentas como Postman ou Insomnia. Recomendo importar a collection de rotas caso esteja disponível no repositório.

## 👨‍💻 Autor
Desenvolvido com ❤️ por mvdevelop.

GitHub: @mvdevelop

## 📄 Licença
Este projeto é para fins educacionais e está sob a licença MIT.
