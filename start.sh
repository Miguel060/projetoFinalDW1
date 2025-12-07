#!/bin/bash

# 🚀 Script de Inicialização Rápida - Sistema de Livraria
# Agora com backend/ e frontend/ separados

echo "=================================================="
echo "🚀 Iniciando Sistema de Livraria"
echo "=================================================="
echo ""

# Verificar se está na raiz do projeto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto contendo /backend e /frontend"
    exit 1
fi

# Função para verificar se o comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar Node.js
if ! command_exists node; then
    echo "❌ Node.js não encontrado! Instale o Node.js 16+ primeiro."
    exit 1
fi

echo "✅ Node.js versão: $(node --version)"
echo "✅ npm versão: $(npm --version)"
echo ""

############################################
# Passo 1 – Instalar dependências do backend
############################################
echo "📦 Passo 1/5: Instalando dependências do backend..."
cd backend

if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Dependências do backend instaladas!"
else
    echo "✅ Dependências do backend já instaladas!"
fi
echo ""

############################################
# Passo 2 – Verificar banco de dados
############################################
echo "🗄️  Passo 2/5: Configurando banco de dados..."

if [ ! -f "src/data/livraria.sqlite" ]; then
    echo "⚠️  Banco de dados não encontrado. Executando migrações..."
    npm run migrate:up
    echo "✅ Migrações executadas!"
    
    read -p "Deseja popular o banco com dados de exemplo? (s/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        npm run seed
        echo "✅ Dados de exemplo inseridos!"
    fi
else
    echo "✅ Banco de dados já existe!"
fi
echo ""

cd ..

############################################
# Passo 3 – Instalar dependências do frontend
############################################
echo "📦 Passo 3/5: Instalando dependências do frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Dependências do frontend instaladas!"
else
    echo "✅ Dependências do frontend já instaladas!"
fi

cd ..
echo ""

############################################
# Passo 4 – Iniciar backend
############################################
echo "🔧 Passo 4/5: Iniciando backend (porta 3333)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

echo "✅ Backend iniciado! PID: $BACKEND_PID"
echo ""

echo "⏳ Aguardando backend inicializar..."
sleep 3

############################################
# Passo 5 – Iniciar frontend
############################################
echo "🎨 Passo 5/5: Iniciando frontend (porta 3000)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Frontend iniciado! PID: $FRONTEND_PID"
echo ""

echo "=================================================="
echo "✅ Sistema iniciado com sucesso!"
echo "=================================================="
echo ""
echo "📍 URLs de Acesso:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3333/api"
echo ""
echo "📝 Próximos Passos:"
echo "   1. Acesse http://localhost:3000 no navegador"
echo "   2. Crie uma conta clicando em 'Registre-se'"
echo "   3. Faça login com suas credenciais"
echo "   4. Comece a gerenciar seus livros!"
echo ""
echo "🛑 Para parar os servidores:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   ou pressione Ctrl+C em cada terminal"
echo ""
echo "📚 Documentação:"
echo "   - INSTRUCOES_EXECUCAO.md"
echo "   - RESUMO_FRONTEND.md"
echo "   - GUIA_FRONTEND.md"
echo ""
echo "=================================================="

# Manter o script rodando
wait
