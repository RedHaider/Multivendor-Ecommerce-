import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeProduct = ( { vendorId }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();
  

  // Function to redirect to product details page
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  // Function to add product to cart and optionally redirect to checkout
  const handleAddToCart = async (event, product, redirectToCheckout = false) => {
    event.stopPropagation(); // Stop propagation to prevent triggering the parent onClick
    event.preventDefault();  // Prevent any default link behavior

    const customerId = localStorage.getItem('userId'); // Retrieve the customer ID from localStorage

    if (!customerId) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    // Select a default variant if available
    const defaultVariant = product.attributes && product.attributes.length > 0 ? product.attributes[0] : null;

    if (!defaultVariant) {
      toast.error("This product has no available variants to add to the cart.");
      return;
    }

    try {
      await axios.post(`${config.API_BASE_URL}/order-management/api/add-to-cart/`, {
        product_id: product.id,
        product_variant_id: defaultVariant.id, // Send the selected variant ID
        quantity: 1, // Assuming a default quantity of 1 for now
        customer_id: customerId // Pass the customer ID from localStorage
      });
      toast.success("Product added to cart successfully!");

      // If `redirectToCheckout` is true, navigate to the checkout page
      if (redirectToCheckout) {
        navigate('/checkout');
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error("Failed to add product to cart.");
    }
  };


  // Fetch products from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/product-management/api/products/`);

        const filteredProducts = vendorId
          ? response.data.filter((product) => product.vendor.id === parseInt(vendorId))
          : response.data;

        setProducts(filteredProducts);
        await fetchWishlist(); 
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchData();
  }, [vendorId]);



  const fetchWishlist = async () => {
    const token = localStorage.getItem('accessToken'); 
  
    try {
      const response = await axios.get(`${config.API_BASE_URL}/order-management/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      });
      setWishList(response.data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.product.id === productId);
  };

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
   
  
      // Update wishlist state immediately for instant feedback
      setWishList((prevWishlist) => [
        ...prevWishlist,
        { product: { id: productId } },
      ]);
    } catch (error) {
   
      console.error("Add to wishlist error", error);
    }
  };
  
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
    } catch (error) {
      
      console.error("Remove from wishlist error", error);
    }
  };
  

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mb-5">
      <ToastContainer />
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
          <div 
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2" 
            key={product.id}
          >
            <div 
              className="product-card" 
              onClick={() => handleProductClick(product.id)}
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
                <div 
                  className="cart-icon"
                  onClick={(event) => handleAddToCart(event, product)} // Add to cart without redirecting
                >
                  <FaShoppingCart />
                </div>
                <button 
                  className="product-add-to-cart-btn" 
                  onClick={(event) => handleAddToCart(event, product, true)} // Add to cart and redirect to checkout
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

export default HomeProduct;
