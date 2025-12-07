import api from './api';

export const favoritesService = {
    // Listar todos os favoritos de um usuário
    listar: async (userId) => {
        const response = await api.get('/favorites', { params: { userId } });
        return response.data;
    },

    // Adicionar livro aos favoritos
    adicionar: async (userId, bookId) => {
        const response = await api.post('/favorites', { userId, bookId });
        return response.data;
    },

    // Remover livro dos favoritos
    remover: async (userId, bookId) => {
        const response = await api.delete('/favorites', {
            data: { userId, bookId }
        });
        return response.data;
    },

    // Verificar se um livro está nos favoritos
    verificar: async (userId, bookId) => {
        try {
            const favorites = await favoritesService.listar(userId);
            return favorites.some(book => book.id === bookId);
        } catch (error) {
            console.error('Erro ao verificar favorito:', error);
            return false;
        }
    }
};