import React from 'react';
import '../style/ProductReview.css'

const ProductReview = ({ reviews }) => {
  return (
    <div className="reviews-section">
      <h2>Product Reviews</h2>
      <div className="review-actions">
        <div className="sort-filter">
          <button>Sort: Relevance</button>
          <button>Filter: All Star</button>
        </div>
      </div>
      {reviews.map((review, index) => (
        <div className="review-item" key={index}>
          <div className="review-header">
            <div className="reviewer-info">
              <span className="reviewer-name">{review.name}</span>
              <span className="verified">Verified Purchase</span>
              <span className="review-date">{review.date}</span>
            </div>
            <div className="review-stars">{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</div>
          </div>

          <div className="review-body row">
            <div className="review-image-container col-auto">
              {review.image && <img src={review.image} alt="product review" className="review-image" />}
            </div>
            <div className="review-comment-container col d-flex align-items-center">
              <p>{review.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReview;
