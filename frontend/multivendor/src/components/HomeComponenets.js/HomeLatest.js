import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import config from '../../config';  
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'; 

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  // Set up navigation
  const navigate = useNavigate();

  // Function to redirect to product details page
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  // Fetch products from API and sort them by created_at (descending order)
  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/product-management/api/products/`)
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)  // Sort in descending order
        );
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  }

  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5 mb-5">
       <div className="row justify-content-center">
          <div className="col text-center">
            <div className="heading">
              <h1>Latest Products</h1>
              <hr className="underline-hr" />
            </div>
          </div>
        </div>
      <div className="row">
        {products.slice(0, visibleCount).map((product) => (
          <div className="col-md-3 col-sm-6" key={product.id}>
            <div 
              className="product-card"
              onClick={() => handleProductClick(product.id)} // Redirect to product details on click
              style={{ cursor: 'pointer' }} // Makes the card look clickable
            >
              <div className="wishlist-icon">
                <FaHeart />
              </div>
              {/* Display main product image */}
              <img 
                src={`${config.API_BASE_URL}${product.image}`} 
                alt={product.name} 
                className="product-image" 
              />
              
              {/* Product details */}
              <h5>
                {product.name && product.name.length > 20
                  ? `${product.name.slice(0, 20)}...` 
                  : product.name}
              </h5>
              <p>Price: ${product.price}</p>
              
              <p className="product-review">
                      Review 
                      <span className="product-rating">
                        {[...Array(4)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </span>
                    </p>

                    <div className="cart-order-container">
                        <div className="cart-icon">
                          <FaShoppingCart />
                        </div>
                        <button className="product-add-to-cart-btn mr-4">Order Now</button>
                      </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load more products */}
      {visibleCount < products.length && (
        <button className="load-more-btn" onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default HomeProduct;
