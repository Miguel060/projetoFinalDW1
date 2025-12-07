import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LivroCard from '../components/LivroCard';
import { useAuth } from '../contexts/AuthContext';
import './Favorites.css';

const Favorites = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }
        carregarFavoritos();
    }, [user]);

    const carregarFavoritos = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/api/favorites', {
                params: { userId: user.id }
            });
            setBooks(response.data);
        } catch (err) {
            setError('Erro ao carregar favoritos. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="container">
                <div className="favorites-empty">
                    <h2>Acesso Restrito</h2>
                    <p>Faça login para ver seus livros favoritos.</p>
                    <Link to="/login" className="btn btn-primary">
                        Fazer Login
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Carregando favoritos...</div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1>⭐ Meus Favoritos</h1>
                </div>

                {error && (
                    <div className="alert alert-error">{error}</div>
                )}

                {books.length === 0 ? (
                    <div className="favorites-empty">
                        <h2>Nenhum favorito ainda</h2>
                        <p>Você ainda não marcou nenhum livro como favorito.</p>
                        <Link to="/livros" className="btn btn-primary">
                            Explorar Livros
                        </Link>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {books.map(book => (
                            <LivroCard
                                key={book.id}
                                livro={book}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;