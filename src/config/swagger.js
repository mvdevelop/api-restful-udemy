import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful - Node.js',
      version: '1.0.0',
      description: 'API completa com CRUD de usuários, alunos, autenticação JWT e upload de imagens',
      contact: {
        name: 'mvdevelop',
        url: 'https://github.com/mvdevelop',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no endpoint /tokens/',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['nome', 'email', 'password'],
          properties: {
            nome: { type: 'string', minLength: 3, maxLength: 255 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6, maxLength: 50 },
          },
        },
        Aluno: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Maria' },
            sobrenome: { type: 'string', example: 'Santos' },
            email: { type: 'string', format: 'email' },
            idade: { type: 'integer', example: 25 },
            peso: { type: 'number', format: 'float', example: 65.5 },
            altura: { type: 'number', format: 'float', example: 1.7 },
          },
        },
        AlunoInput: {
          type: 'object',
          required: ['nome', 'sobrenome', 'email'],
          properties: {
            nome: { type: 'string', minLength: 3, maxLength: 255 },
            sobrenome: { type: 'string', minLength: 3, maxLength: 255 },
            email: { type: 'string', format: 'email' },
            idade: { type: 'integer' },
            peso: { type: 'number', format: 'float' },
            altura: { type: 'number', format: 'float' },
          },
        },
        Token: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: { type: 'string' },
              example: ['Mensagem de erro'],
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;