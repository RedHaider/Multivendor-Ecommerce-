import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';  // Assuming you have a config.js file with the base API URL

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8)

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
    setVisibleCount((prevCount) => prevCount+4)
  }
  // Display loading or error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5 mb-5">
       <div className="row justify-content-center">
          <div className="col text-center">
            <div className="heading">
              <h1>Products</h1>
              <hr className="underline-hr" />
            </div>
          </div>
        </div>
      <div className="row">
        {products.slice(0,visibleCount).map((product) => (
          <div className="col-md-3 col-sm-6" key={product.id}>
            <div className="product-card">
              
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
              
              {/* Display stock level */}
              <p>In Stock: {product.stock_level}</p>
              
              {/* Button for adding to cart */}
              <button className="product-add-to-cart-btn">Add to Cart</button>

              {/* Ratings (if any) */}

            </div>
          </div>
        ))}
      </div>
      {/* load more products */}
      {visibleCount < products.length && (
              <button className="load-more-btn" onClick={loadMore}>Load More</button>
      )}

    </div>
  );
};

export default HomeProduct;
