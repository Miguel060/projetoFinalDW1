// Script para executar apenas a migração de adicionar email aos usuários
const migration = require('../migrations/002-add-email-to-users');

try {
    console.log('🚀 Iniciando migração: Adicionar email aos usuários...\n');
    migration.up();
    console.log('\n✅ Migração concluída com sucesso!');
    process.exit(0);
} catch (error) {
    console.error('\n❌ Erro ao executar migração:', error);
    process.exit(1);
}
