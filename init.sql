-- Script de inicialização do banco de dados
-- Criado para execução automática via Docker

USE api_restful;

-- Configurar charset e collation
ALTER DATABASE api_restful CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Mensagem de sucesso
SELECT 'Database initialized successfully' AS message;