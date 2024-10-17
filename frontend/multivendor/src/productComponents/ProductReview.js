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

          <div className="review-body">
            <p>{review.content}</p>
            {review.image && <img src={review.image} alt="product review" className="review-image" />}
            <div className="review-details">
              <p>{review.color}</p>
            </div>
          </div>

          <div className="review-footer">
            <div className="helpful-report">
              <button>Helpful</button>
              <button>Report</button>
            </div>
            <div className="likes-dislikes">
              <span>👍 {review.likes}</span>
              <span>👎 {review.dislikes}</span>
            </div>
          </div>

          {review.sellerResponse && (
            <div className="seller-response">
              <p><strong>Seller Response - {review.sellerResponseDate}:</strong> {review.sellerResponse}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductReview;
