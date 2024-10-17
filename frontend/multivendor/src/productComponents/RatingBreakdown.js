import React from 'react';
import '../style/breakingbreaking.css'

const RatingBreakdown = ({ averageRating, totalRatings, ratingCounts }) => {
  const getPercentage = (count) => {
    return (count / totalRatings) * 100;
  };

  return (
    <div className="rating-summary">
      {/* Average Rating Section */}
      <div className="average-rating">
        <div className="average-score">
          <span className="average-number">{averageRating.toFixed(1)}</span>
          <span>/ 5</span>
        </div>
        <div className="average-stars">
          <span className="stars">★★★★★</span>
          <span className="ratings-count">{totalRatings} Ratings</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="rating-breakdown">
        {[5, 4, 3, 2, 1].map((star) => (
          <div className="rating-bar" key={star}>
            <span className="stars">
              {'★'.repeat(star)}
              {'☆'.repeat(5 - star)}
            </span>
            <div className="bar">
              <div
                className="filled"
                style={{ width: `${getPercentage(ratingCounts[star])}%` }}
              ></div>
            </div>
            <span className="count">{ratingCounts[star]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBreakdown;
