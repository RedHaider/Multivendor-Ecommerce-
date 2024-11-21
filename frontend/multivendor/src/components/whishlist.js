import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext'; // Import AuthContext

const Wishlist = () => {
  const { fetchCartCount, fetchWishlistCount } = useContext(AuthContext); // Access context functions
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch wishlist items on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`${config.API_BASE_URL}/order-management/api/wishlist/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setError('Failed to load wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove from wishlist function
  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`${config.API_BASE_URL}/order-management/api/wishlist/remove/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove item from state immediately
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.product.id !== productId));
      fetchWishlistCount(); // Update global wishlist count
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  // Add to cart function
  const handleAddToCart = async (event, product) => {
    event.stopPropagation(); // Prevent triggering parent card click
    const customerId = localStorage.getItem('userId');
    if (!customerId) {
      alert('You must be logged in to add items to the cart.');
      return;
    }

    const defaultVariant = product.attributes && product.attributes.length > 0 ? product.attributes[0] : null;
    if (!defaultVariant) {
      alert('This product has no available variants to add to the cart.');
      return;
    }

    try {
      await axios.post(`${config.API_BASE_URL}/order-management/api/add-to-cart/`, {
        product_id: product.id,
        product_variant_id: defaultVariant.id,
        quantity: 1,
        customer_id: customerId,
      });
      fetchCartCount(); // Update global cart count
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error("Failed to add product to cart", error);
      alert('Failed to add product to cart.');
    }
  };

  // Redirect to product details
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mb-5">
      <div className="row no-gutters justify-content-center mb-2">
        <div className="col text-center">
          <div className="heading">
            <h1>Wishlist</h1>
            <hr className="underline-hr" />
          </div>
        </div>
      </div>

      <div className="row">
        {wishlist.length === 0 ? (
          <div className="col text-center">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          wishlist.map((item) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2"
              key={item.product.id}
            >
              <div
                className="product-card"
                onClick={() => handleProductClick(item.product.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Wishlist icon */}
                <div
                  className="wishlist-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeFromWishlist(item.product.id);
                  }}
                >
                  <FaHeart color="red" /> {/* Display as red to indicate it's in the wishlist */}
                </div>

                {/* Product image */}
                <img
                  src={`${config.API_BASE_URL}${item.product.image}`}
                  alt={item.product.name}
                  className="product-image"
                />

                {/* Product name */}
                <h5 className="product-name">
                  {item.product.name.length > 20 ? `${item.product.name.slice(0, 20)}...` : item.product.name}
                </h5>

                {/* Product price */}
                <p className="product-price">Price: ${item.product.price}</p>

                {/* Product reviews */}
                <p className="product-review">
                  Review
                  <span className="product-rating">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </span>
                </p>

                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
