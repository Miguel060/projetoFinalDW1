// migrations/002-add-email-to-users.js
const db = require('../src/database/sqlite');

function up() {
    console.log('Executando migração: Adicionar coluna email à tabela users');

    try {
        // Verifica se a coluna já existe
        const tableInfo = db.all("PRAGMA table_info(users)");
        const emailColumnExists = tableInfo.some(col => col.name === 'email');

        if (emailColumnExists) {
            console.log('Coluna email já existe na tabela users. Migração já aplicada.');
            return;
        }

        // SQLite não suporta ALTER TABLE ADD COLUMN com UNIQUE
        // Precisamos recriar a tabela

        // 1. Renomear tabela antiga
        db.run('ALTER TABLE users RENAME TO users_old');

        // 2. Criar nova tabela com email
        db.run(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 3. Copiar dados existentes (gerar email temporário baseado no username)
        db.run(`
            INSERT INTO users (id, username, email, password_hash, created_at)
            SELECT id, username, username || '@temp.com' as email, password_hash, created_at
            FROM users_old
        `);

        // 4. Remover tabela antiga
        db.run('DROP TABLE users_old');

        console.log('✅ Migração concluída: Coluna email adicionada à tabela users');
        console.log('⚠️  IMPORTANTE: Usuários existentes receberam emails temporários (username@temp.com)');
        console.log('   Você deve atualizar os emails manualmente no banco de dados.');
    } catch (error) {
        console.error('❌ Erro ao executar migração:', error);
        throw error;
    }
}

function down() {
    console.log('Revertendo migração: Remover coluna email da tabela users');

    try {
        // 1. Renomear tabela atual
        db.run('ALTER TABLE users RENAME TO users_new');

        // 2. Criar tabela antiga sem email
        db.run(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 3. Copiar dados (excluindo email)
        db.run(`
            INSERT INTO users (id, username, password_hash, created_at)
            SELECT id, username, password_hash, created_at
            FROM users_new
        `);

        // 4. Remover tabela nova
        db.run('DROP TABLE users_new');

        console.log('✅ Migração revertida: Coluna email removida da tabela users');
    } catch (error) {
        console.error('❌ Erro ao reverter migração:', error);
        throw error;
    }
}

module.exports = { up, down };
