import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review, onEdit, onDelete, canEdit = false }) => {
    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="review-rating">
                    <span className="stars">{renderStars(review.rating)}</span>
                    <span className="rating-number">({review.rating}/5)</span>
                </div>
                {review.created_at && (
                    <span className="review-date">{formatDate(review.created_at)}</span>
                )}
            </div>

            {review.user_name && (
                <div className="review-author">
                    <strong>Por:</strong> {review.user_name}
                </div>
            )}

            {review.comment && (
                <p className="review-comment">{review.comment}</p>
            )}

            {canEdit && (
                <div className="review-actions">
                    <button
                        onClick={() => onEdit(review)}
                        className="btn btn-sm btn-primary"
                    >
                        ✏️ Editar
                    </button>
                    <button
                        onClick={() => onDelete(review.id)}
                        className="btn btn-sm btn-danger"
                    >
                        🗑️ Remover
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;