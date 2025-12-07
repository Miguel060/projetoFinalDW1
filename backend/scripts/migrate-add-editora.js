// Script para executar apenas a migração de adicionar editora aos livros
const db = require('../src/database/sqlite');
const migration = require('../migrations/003-add-editora-to-livros');

try {
    console.log('🚀 Iniciando migração: Adicionar editora aos livros...\n');

    // Inicializar o banco de dados primeiro
    db.init();

    migration.up();
    console.log('\n✅ Migração concluída com sucesso!');
    process.exit(0);
} catch (error) {
    console.error('\n❌ Erro ao executar migração:', error);
    process.exit(1);
}
