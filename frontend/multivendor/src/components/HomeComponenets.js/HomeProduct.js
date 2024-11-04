import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';  
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'; 

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  
  // Set up navigation
  const navigate = useNavigate();

  // Function to redirect to product details page
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  // Fetch products from API
  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/product-management/api/products/`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col text-center">
          <div className="heading">
            <h1>Products</h1>
            <hr className="underline-hr" />
          </div>
        </div>
      </div>
      <div className="row">
        {products.slice(0, visibleCount).map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2" key={product.id}>
            <div className="product-card" onClick={() => handleProductClick(product.id)}>
              <div className="wishlist-icon">
                <FaHeart />
              </div>
              <img 
                src={`${config.API_BASE_URL}${product.image}`} 
                alt={product.name} 
                className="product-image" 
              />
              <h5 className="product-name">
                {product.name && product.name.length > 20
                  ? `${product.name.slice(0, 20)}...` 
                  : product.name}
              </h5>
              <p className="product-price">Price: ${product.price}</p>
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
                <button className="product-add-to-cart-btn">Order Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < products.length && (
        <button className="load-more-btn" onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default HomeProduct;
