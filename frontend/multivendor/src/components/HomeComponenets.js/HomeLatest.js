import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../utils/authContext';

const HomeLatest = () => {
  const { fetchCartCount, fetchWishlistCount } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishList] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  // Fetch wishlist data
  const fetchWishlist = async () => {
    const token = localStorage.getItem('accessToken'); 
    try {
      const response = await axios.get(`${config.API_BASE_URL}/order-management/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setWishList(response.data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Add product to wishlist
  const addToWishlist = async (event, productId) => {
    event.stopPropagation();
    event.preventDefault();
    const token = localStorage.getItem('accessToken'); 
    try {
      await axios.post(
        `${config.API_BASE_URL}/order-management/api/wishlist/add/`,
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishList((prevWishlist) => [
        ...prevWishlist,
        { product: { id: productId } },
      ]);
      fetchWishlistCount(); // Update wishlist count in context
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Add to wishlist error", error);
      toast.error("Failed to add to wishlist.");
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (event, productId) => {
    event.stopPropagation();
    event.preventDefault();
    const token = localStorage.getItem('accessToken'); 
    try {
      await axios.delete(`${config.API_BASE_URL}/order-management/api/wishlist/remove/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishList((prevWishlist) =>
        prevWishlist.filter((item) => item.product.id !== productId)
      );
      fetchWishlistCount(); // Update wishlist count in context
      toast.success("Removed from wishlist!");
    } catch (error) {
      console.error("Remove from wishlist error", error);
      toast.error("Failed to remove from wishlist.");
    }
  };

  // Redirect to product details
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  // Add product to cart with optional redirection
  const handleAddToCart = async (event, product, redirectToCheckout = false) => {
    event.stopPropagation();
    event.preventDefault();
    const customerId = localStorage.getItem('userId'); 
    if (!customerId) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }
    const defaultVariant = product.attributes && product.attributes.length > 0 ? product.attributes[0] : null;
    if (!defaultVariant) {
      toast.error("This product has no available variants to add to the cart.");
      return;
    }
    try {
      await axios.post(`${config.API_BASE_URL}/order-management/api/add-to-cart/`, {
        product_id: product.id,
        product_variant_id: defaultVariant.id,
        quantity: 1,
        customer_id: customerId,
      });
      toast.success("Product added to cart successfully!");
      fetchCartCount(); // Update cart count in context
      if (redirectToCheckout) {
        navigate('/checkout');
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error("Failed to add product to cart.");
    }
  };

  // Fetch and sort products
  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/product-management/api/products/`)
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setProducts(sortedProducts);
        fetchWishlist();
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  // Load more products
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5 mb-5">
      <ToastContainer />
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
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="wishlist-icon"
                onClick={(event) =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(event, product.id)
                    : addToWishlist(event, product.id)
                }
              >
                <FaHeart color={isInWishlist(product.id) ? "red" : "grey"} />
              </div>
              <img 
                src={`${config.API_BASE_URL}${product.image}`} 
                alt={product.name} 
                className="product-image" 
              />
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
                <div 
                  className="cart-icon"
                  onClick={(event) => handleAddToCart(event, product)}
                >
                  <FaShoppingCart />
                </div>
                <button 
                  className="product-add-to-cart-btn mr-4" 
                  onClick={(event) => handleAddToCart(event, product, true)}
                >
                  Order Now
                </button>
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

export default HomeLatest;
