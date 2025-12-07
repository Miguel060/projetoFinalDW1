import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ review, bookTitle, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        if (review) {
            setFormData({
                rating: review.rating || 5,
                comment: review.comment || ''
            });
        }
    }, [review]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const renderStarInput = () => {
        return (
            <div className="star-rating-input">
                {[1, 2, 3, 4, 5].map(star => (
                    <label key={star} className="star-label">
                        <input
                            type="radio"
                            name="rating"
                            value={star}
                            checked={formData.rating === star}
                            onChange={handleChange}
                        />
                        <span className={`star ${formData.rating >= star ? 'filled' : ''}`}>
                            ★
                        </span>
                    </label>
                ))}
            </div>
        );
    };

    return (
        <div className="review-form-overlay">
            <div className="review-form-container">
                <h2>{review ? 'Editar Avaliação' : 'Nova Avaliação'}</h2>
                {bookTitle && <p className="book-title">Livro: <strong>{bookTitle}</strong></p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Avaliação *</label>
                        {renderStarInput()}
                        <p className="rating-text">
                            {formData.rating === 1 && 'Péssimo'}
                            {formData.rating === 2 && 'Ruim'}
                            {formData.rating === 3 && 'Regular'}
                            {formData.rating === 4 && 'Bom'}
                            {formData.rating === 5 && 'Excelente'}
                        </p>
                    </div>

                    <div className="input-group">
                        <label htmlFor="comment">Comentário</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Compartilhe sua opinião sobre o livro..."
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            {review ? 'Atualizar' : 'Publicar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;