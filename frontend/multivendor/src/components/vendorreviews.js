import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';  
const VendorReviews = ({ vendorId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/product-management/api/vendor_reviews/${vendorId}/`);
      setReviews(response.data);
    } catch (err) {
      setError('Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  // Load reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, [vendorId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Customer Reviews</h3>
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <h5>{review.user.first_name} {review.user.last_name}</h5>
            <p>{review.comment}</p>
            <div >
              {/* Render the rating stars */}
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fa fa-star ${index < review.rating ? 'filled' : ''}`}
                ></i>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
    </div>
  );
};

export default VendorReviews;
