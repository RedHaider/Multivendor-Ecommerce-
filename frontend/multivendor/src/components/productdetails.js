import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link  } from 'react-router-dom';
import axios from 'axios';
import ProductCarousel from "../utils/ProductCarousel";
import RatingBreakdown from "../productComponents/RatingBreakdown";
import ProductReview from "../productComponents/ProductReview";
import config from '../config';
import '../style/productdetails.css'
import '../style/reviewstyle.css'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../utils/authContext';


//notification
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductDetails = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); // Initialize navigate
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null); 
  const [quantity, setQuantity] = useState(1); 
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const [selectedVariant, setSelectedVariant] = useState(null); 
  const [cartMessage, setCartMessage] = useState(null); 
  const [hasPurchased, setHasPurchased] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [review, setReviews] = useState([]);

  const fetchReviews = async (productId) => {
    try {
        const response = await axios.get(
            `${config.API_BASE_URL}/product-management/api/reviews/${productId}/`, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );
        console.log('Reviews:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
};

useEffect(() => {
  const getReviews = async () => {
      const fetchedReviews = await fetchReviews(productId);
      setReviews(fetchedReviews);
  };

  getReviews();
}, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
        product: productId,  // Include the product ID in the data
        comment: newReview.comment,
        rating: newReview.rating,
    };

    try {
        const response = await axios.post(
            `${config.API_BASE_URL}/product-management/reviews/${productId}/`,
            reviewData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        );
        toast.success('Review submitted successfully!');
        setReviews([...reviews, response.data]); // Update reviews list
        setNewReview({ rating: 0, comment: '' }); // Reset form
    } catch (error) {
        toast.error('Failed to submit review.');
        console.error('Review submission error:', error);
    }
};




  useEffect(() => {
    const checkHasPurchased = async () => {
        try {
            const response = await axios.get(
                `${config.API_BASE_URL}/order-management/has-purchased/${userId}/${productId}/`
            );
            setHasPurchased(response.data.has_purchased);
        } catch (error) {
            console.error('Error checking purchase status:', error);
        }
    };

    if (userId && productId) {
        checkHasPurchased();
        }
    }, [userId, productId]);

  useEffect(()=> {
    const fetchProductDetails = async () => {
      setProduct(null); // Clear existing product details
      setLoading(true); // Set loading state
      try {
        const response = await axios.get(`${config.API_BASE_URL}/product-management/api/products/${productId}`);
        setProduct(response.data);
        // Set a default variant if available
        if (response.data.attributes.length > 0) {
          const defaultVariant = response.data.attributes[0];
          setSelectedColor(defaultVariant.color);
          setSelectedSize(defaultVariant.size);
        }
      } catch (error) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  },[productId])

  // Fetch category, brand, product type, and sub-category data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, brandRes, productTypeRes, subCategoryRes] = await Promise.all([
          axios.get(`${config.API_BASE_URL}/product-management/api/category/`),
          axios.get(`${config.API_BASE_URL}/product-management/api/brand/`),
          axios.get(`${config.API_BASE_URL}/product-management/api/product-type/`),
          axios.get(`${config.API_BASE_URL}/product-management/api/sub-category/`),
        ]);

        setCategories(categoryRes.data);
        setBrands(brandRes.data);
        setProductTypes(productTypeRes.data);
        setSubCategories(subCategoryRes.data);
      } catch (error) {
        console.error("Failed to fetch supporting data", error);
      }
    };

    fetchData();
  }, []);

    // Fetch related products based on matching filters
    useEffect(() => {
      const fetchRelatedProducts = async () => {
        if (!product) return;
    
        try {
          // Fetch all products once
          const response = await axios.get(`${config.API_BASE_URL}/product-management/api/products/`);
          const allProducts = response.data;
    
          // Filter related products locally: Match by brand, product type, or category
          const filteredProducts = allProducts.filter((item) => {
            return (
              item.id !== product.id && // Exclude the current product
              (
                item.brand === product.brand || // Match brand
                item.product_type === product.product_type || // Match product type
                item.category === product.category // Match category
              )
            );
          });
    
          // Limit to top 4
          setRelatedProducts(filteredProducts.slice(0, 4));
        } catch (error) {
          console.error("Failed to fetch related products:", error);
        }
      };
    
      fetchRelatedProducts();
    }, [product]);
    
    
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, [productId]);

  // selected variant based on the chosen color and size
  useEffect(() => {
    if (selectedColor && selectedSize && product) {
      const variant = product.attributes.find(
        attr => attr.color === selectedColor && attr.size === selectedSize
      );
      setSelectedVariant(variant || null);
    }
  }, [selectedColor, selectedSize, product]);


  const handleAddToCart = async () => {
    const customerId = localStorage.getItem('userId'); // Retrieve the customer ID from localStorage

    if (!customerId) {
      setCartMessage("You must be logged in to add items to the cart.");
      return;
    }

    if (!selectedVariant) {
      setCartMessage("Please select a valid color and size combination.");
      return;
    }

    if (quantity > selectedVariant.quantity) {
      setCartMessage(`Only ${selectedVariant.quantity} items are available in stock for this variant.`);
      return;
    }

    try {
      const response = await axios.post(`${config.API_BASE_URL}/order-management/api/add-to-cart/`, {
        product_id: productId,
        product_variant_id: selectedVariant.id, // Send the selected variant ID
        quantity: quantity,
        customer_id: customerId // Pass the customer ID from localStorage
      });
      toast.success("Product added to cart successfully!"); // Show success notification
      setCartMessage("Product added to cart successfully!");

    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error("Failed to add product to cart."); // Show error notification
      setCartMessage("Failed to add product to cart");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

const reviews = review.map(review => ({
   name : `${review.user.first_name} ${review.user.last_name}`,
   date : new Date(review.created_at).toLocaleDateString(),
   stars : review.rating,
   content : review.comment,
   image : review.user.photo,
   color: 'null',
   likes : 'null',
   dislikes : 'null',
   sellerResponse :'null',
   sellerResponse: 'null'
}))
console.log('something different')
console.log(reviews);
  // Calculate the average rating, total ratings, and rating counts
  const totalRatings = review.length;
  
  const ratingCounts = review.reduce((acc, review) => {
    const rating = review.rating;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const averageRating = totalRatings
    ? (review.reduce((sum, review) => sum + review.rating, 0) / totalRatings)
    : 0;


  const allImages = [
    `${config.API_BASE_URL}${product.image}`, // Add the main product image
    ...product.images.map((img) => `${config.API_BASE_URL}${img.photo_name}`), // Add images from the 'images' array
    ...product.attributes.map((attr) => `${config.API_BASE_URL}${attr.image}`) // Add images from the 'attributes' array
  ];

  const availableColors = [...new Set(product.attributes.map(attr => attr.color))]; // Extract unique colors
  const availableSizes = [...new Set(product.attributes.map(attr => attr.size))]; // Extract unique sizes
  
    return ( 
        <div>
           <ToastContainer />
        <div className="row justify-content-center mb-5">
                <div className="col text-center">
                <div className="heading">
                    <h1>Product Details</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>

      {/* product details */}
      <div className="container">
        <div className="row">
        <div className="col-md-6">
          <div className="row">
              <div className="col-12  thumbnail-images-container">
                <ProductCarousel images={allImages}/>
              </div>
          </div>
      </div>

            <div className="col-md-6 text-left">
                <h1 className="product-details-info-h">{product.name}</h1>
                <div className=" text-left ">
                  <i className="fa fa-star stars" ></i>
                  <i className="fa fa-star stars" ></i>
                  <i className="fa fa-star stars" ></i>
                  <i className="rating">(ratings)</i>
                </div>
                <p className="text-danger font-weight-bold mt-1">{product.price}</p>
                <p className="product-details-info-description">{product.description}</p>
                <p className="product-details-info-description">Vendor: <Link to={`/vendorprofile/${product.vendor.id}`}>{product.vendor.business_name}</Link></p>
                <p className="product-details-info-attribute">Category: <span className="product-details-info-attribute-span">{product.category}</span></p>


                {/* Color Selection */}
                <div className='mb-3'>
                  <p>Available Colors:</p>
                  {availableColors.map(color => (
                    <button
                      key={color}
                      className={` product-details-button ml-2 ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                {/* Size Selection */}
                <div className='mb-3'>
                  <p>Available Sizes:</p>
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      className={`product-details-button ml-2 ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

      
            {/* Quantity Selection */}
            <div className='mb-3'>
              <p>Quantity:</p>
              <div className="quantity-selector">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={selectedVariant ? selectedVariant.quantity : 100}
                  className="quantity-input"
                />
                <button
                  type="button"
                  
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={selectedVariant && quantity >= selectedVariant.quantity}
                >
                  +
                </button>
              </div>
            </div>
            

              {/* Conditionally Render Add to Cart or "Not Available" */}
              <div>
                {selectedVariant && selectedVariant.quantity > 0 ? (
                  <button className="product-details-info-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                ) : (
                  <p className="text-danger">NOT AVAILABLE</p>
                )}
              </div>
            {cartMessage && <p>{cartMessage}</p>}
            </div>
        </div>
      </div>
      {/* product details ends */}

      {/* Product Details */}
      <div class="container mt-5 mb-5">
            <h2 className="text-left">Product Details of {product.name}</h2>
              <div class="row text-left"> 
                <ul class="product-details-list">
                <li>Brand: {product.brand}</li>
                <li>Product Type: {product.product_type}</li>
                <li>Category: {product.category}</li>
                <li>Sub Category: {product.subcategory}</li>
                <li>SKU: {product.sku}</li>
                </ul>
              </div>
      </div>
            {/* Product Details */}
            <div class="container mt-5 mb-5">
            <h2 className="text-left">Product's Extra Information</h2>
              <div class="row text-left mt-4 ml-2"> 
                  <div dangerouslySetInnerHTML={{ __html: product.product_details }}></div>
              </div>
           </div>
      <div class="container mt-5 mb-5 ">
      <RatingBreakdown
        averageRating={averageRating}
        totalRatings={totalRatings}
        ratingCounts={ratingCounts}
      />
      </div>
      <div class="container mt-5 mb-5 ">
      <ProductReview reviews={reviews} />
      </div>
      <div>
      {hasPurchased && (
            <div className="review-form">
                <h3>Leave a Review</h3>
                <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select 
                        id="rating" 
                        value={newReview.rating} 
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} 
                        required
                        className="form-control"
                    >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{star} Star</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea 
                        id="comment" 
                        value={newReview.comment} 
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
                        required 
                        className="form-control"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
            </div>
        )}

      <div className="container mt-5 mb-5">
        <h2>Related Products</h2>
        <div className="row">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div className="col-md-3 col-sm-6" key={relatedProduct.id}>
                <div
                  className="product-card"
                  onClick={() => navigate(`/productdetails/${relatedProduct.id}`)} // Navigate on click
                >
                  <img
                    src={`${config.API_BASE_URL}${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    className="img-fluid"
                  />
                  <h5>
                  {product.name && product.name.length > 20
                  ? `${product.name.slice(0, 20)}...` 
                  : product.name}
                  </h5>
                  <p>${relatedProduct.price}</p>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
</div>

        </div>
     );
}
 
export default ProductDetails;