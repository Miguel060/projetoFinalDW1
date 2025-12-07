import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewError, setReviewError] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(true);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/api/reviews/book/${livro.id}`);
            setReviews(response.data);
        } catch (err) {
            console.error('Erro ao buscar reviews:', err);
            setReviewError('Erro ao carregar avaliações.');
        }
    };

    const checkFavorite = async () => {
        if (!user) return;
        setLoadingFavorite(true);
        try {
            const response = await axios.get('/api/favorites', { params: { userId: user.id } });
            const favorites = response.data;
            setIsFavorited(favorites.some(book => book.id === livro.id));
        } catch (err) {
            console.error('Erro ao verificar favorito:', err);
        } finally {
            setLoadingFavorite(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        checkFavorite();
    }, [livro.id, user]);

    const handleToggleFavorite = async () => {
        if (!user) {
            alert('Você precisa estar logado para adicionar favoritos.');
            return;
        }

        setLoadingFavorite(true);
        try {
            if (isFavorited) {
                await axios.delete('/api/favorites', { data: { userId: user.id, bookId: livro.id } });
                setIsFavorited(false);
            } else {
                await axios.post('/api/favorites', { userId: user.id, bookId: livro.id });
                setIsFavorited(true);
            }
        } catch (err) {
            console.error('Erro ao alternar favorito:', err);
            alert('Erro ao salvar favorito. Tente novamente.');
        } finally {
            setLoadingFavorite(false);
        }
    };

    const handleReviewSubmit = async (formData) => {
        if (!user) {
            alert('Você precisa estar logado para avaliar.');
            return;
        }
        try {
            const reviewData = {
                ...formData,
                userId: user.id,
                bookId: livro.id,
            };

            await axios.post('/api/reviews', reviewData);
            setShowReviewForm(false);
            fetchReviews(); // Recarrega a lista
        } catch (err) {
            console.error('Erro ao enviar review:', err);
            setReviewError(err.response?.data?.erro || 'Erro ao enviar avaliação. Verifique se você já avaliou este livro.');
        }
    };

    const handleNewReview = () => {
        setReviewError(null);
        setShowReviewForm(true);
    };

    const handleCancelReview = () => {
        setShowReviewForm(false);
    };
    const coverPath = livro.cover_path ? `${livro.cover_path}` : '/default-cover.png';

    return (
        <div className="livro-card">
            <img
                src={coverPath}
                alt={`Capa de ${livro.titulo}`}
                className="livro-card-cover"
            />

            <h3>{livro.titulo}</h3>

            <p className="autor">
                <strong>Autor:</strong> {livro.autor}
            </p>

            <p className="ano">
                <strong>Ano:</strong> {livro.ano}
            </p>

            {livro.editora && (
                <p className="editora">
                    <strong>Editora:</strong> {livro.editora}
                </p>
            )}

            <div className="card-actions">
                <button
                    onClick={handleToggleFavorite}
                    className={`btn btn-favorite ${isFavorited ? 'favorited' : ''}`}
                    disabled={loadingFavorite || !user}
                    title={isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                >
                    {loadingFavorite ? '...' : isFavorited ? '❤️ Favorito' : '🤍 Favoritar'}
                </button>

                <button
                    onClick={() => onEdit(livro)}
                    className="btn btn-primary"
                >
                    ✏️ Editar
                </button>

                <button
                    onClick={() => onDelete(livro.id)}
                    className="btn btn-danger"
                >
                    🗑️ Remover
                </button>
            </div>

            <div className="reviews-section">
                <h4>Avaliações ({reviews.length})</h4>
                <button onClick={handleNewReview} className="btn btn-secondary btn-sm">
                    ➕ Avaliar
                </button>

                {reviewError && <div className="alert alert-error">{reviewError}</div>}

                {showReviewForm && (
                    <ReviewForm
                        bookTitle={livro.titulo}
                        onSubmit={handleReviewSubmit}
                        onCancel={handleCancelReview}
                    />
                )}

                <div className="reviews-list">
                    {reviews.length === 0 ? (
                        <p>Nenhuma avaliação ainda.</p>
                    ) : (
                        reviews.map(review => (
                            <ReviewCard
                                key={review.id}
                                review={{ ...review, user_name: review.username }} // Ajuste de nomeclatura
                                canEdit={review.user_id === user?.id}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LivroCard