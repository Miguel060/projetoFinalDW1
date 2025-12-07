import api from './api';

export const reviewsService = {
    // Listar todas as avaliações de um livro
    listarPorLivro: async (bookId) => {
        const response = await api.get(`/reviews/book/${bookId}`);
        return response.data;
    },

    // Listar todas as avaliações de um usuário
    listarPorUsuario: async (userId) => {
        const response = await api.get(`/reviews/user/${userId}`);
        return response.data;
    },

    // Criar uma nova avaliação
    criar: async (reviewData) => {
        const response = await api.post('/reviews', reviewData);
        return response.data;
    },

    // Atualizar uma avaliação existente
    atualizar: async (reviewId, reviewData) => {
        const response = await api.put(`/reviews/${reviewId}`, reviewData);
        return response.data;
    },

    // Remover uma avaliação
    remover: async (reviewId) => {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    },

    // Obter uma avaliação específica
    obter: async (reviewId) => {
        const response = await api.get(`/reviews/${reviewId}`);
        return response.data;
    },

    // Verificar se o usuário já avaliou um livro
    verificarAvaliacao: async (userId, bookId) => {
        try {
            const reviews = await reviewsService.listarPorUsuario(userId);
            return reviews.find(review => review.book_id === bookId);
        } catch (error) {
            console.error('Erro ao verificar avaliação:', error);
            return null;
        }
    }
};