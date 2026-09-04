// Setup executado antes de todos os testes
process.env.NODE_ENV = 'test';
process.env.APP_PORT = '3002';
process.env.TOKEN_SECRET = 'test-secret-key-for-jest';
process.env.TOKEN_EXPIRATION = '1h';
process.env.DATABASE_HOST = 'localhost';
process.env.DATABASE_PORT = '3306';
process.env.DATABASE_USERNAME = 'test';
process.env.DATABASE_PASSWORD = 'test';
process.env.DATABASE = 'test_db';