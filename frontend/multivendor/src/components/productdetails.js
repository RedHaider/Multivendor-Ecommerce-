import React, {useState, useEffect} from 'react';
import { useParams, Link  } from 'react-router-dom';
import axios from 'axios';
import ProductCarousel from "../utils/ProductCarousel";
import RatingBreakdown from "../productComponents/RatingBreakdown";
import ProductReview from "../productComponents/ProductReview";
import config from '../config';
import '../style/productdetails.css'

//notification
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null); 
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [selectedVariant, setSelectedVariant] = useState(null); // State for selected variant object
  const [cartMessage, setCartMessage] = useState(null); // Message to show after adding to cart



  useEffect(()=> {
    const fetchProductDetails = async () => {
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

  const reviews = [
    {
      name: 'Sayeed',
      date: '31 August 2024',
      stars: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus.',
      image: 'picture/product-details-image.png',
      color: 'Color: Black, Ash, Size: L',
      likes: 28,
      dislikes: 0,
      sellerResponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus.',
      sellerResponseDate: '1 Month Ago',
    },
    {
      name: 'Sayeed',
      date: '31 August 2024',
      stars: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus.',
      image: 'picture/product-details-image.png',
      color: 'Color: Black, Ash, Size: XL',
      likes: 10,
      dislikes: 0,
      sellerResponse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus.',
      sellerResponseDate: '1 Month Ago',
    },
  ];
  const averageRating = 4.7;
  const totalRatings = 50;
  const ratingCounts = {
    5: 40,
    4: 3,
    3: 2,
    2: 1,
    1: 1,
  };



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
      <div class="container">
        <div class="row">
        <div class="col-md-6">
          <div class="row">
              <div class="col-12  thumbnail-images-container">
                <ProductCarousel images={allImages}/>
              </div>
          </div>
      </div>

            <div class="col-md-6 text-left">
                <h1 class="product-details-info-h">{product.name}</h1>
                <div class=" text-left ">
                  <i class="fa fa-star stars" ></i>
                  <i class="fa fa-star stars" ></i>
                  <i class="fa fa-star stars" ></i>
                  <i class="rating">(ratings)</i>
                </div>
                <p class="text-danger font-weight-bold mt-1">{product.price}</p>
                <p class="product-details-info-description">{product.description}</p>
                <p class="product-details-info-description">Vendor: <Link to={`/vendorprofile/${product.vendor.id}`}>{product.vendor.business_name}</Link></p>
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
      {/* Latest PRoducts*/}
      <div>
      <div className="container mt-5 mb-5">
              <div className="row justify-content-center">
              <div className="col text-center">
                <h1>Related Products</h1>
              </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-sm-6">
                    <div class="product-card">
                        <span class="product-discount-badge">30% OFF</span>
                        <img src="https://via.placeholder.com/200x200" alt="Stylish leather jacket"/>
                        <h5>Stylish leather jacket</h5>
                        <p>$34</p>
                        <button class="product-add-to-cart-btn">Add to Cart</button>
                        <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span> (6 Ratings)</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="product-card">
                        <img src="https://via.placeholder.com/200x200" alt="Premium Perfume"/>
                        <h5>Premium Perfume</h5>
                        <p>$34</p>
                        <button class="product-add-to-cart-btn">Add to Cart</button>
                        <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span> (8 Ratings)</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="product-card">
                        <img src="https://via.placeholder.com/200x200" alt="Leather Handbag"/>
                        <h5>Leather Handbag</h5>
                        <p>$34</p>
                        <button class="product-add-to-cart-btn">Add to Cart</button>
                        <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span> (10 Ratings)</p>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="product-card">
                        <img src="https://via.placeholder.com/200x200" alt="Luxury White Sweater"/>
                        <h5>Luxury White Sweater</h5>
                        <p>$34</p>
                        <button class="product-add-to-cart-btn">Add to Cart</button>
                        <p><span class="text-warning">&#9733;&#9733;&#9733;&#9734;&#9734;</span> (4 Ratings)</p>
                    </div>
                </div>
                </div>
                <button class="load-more-btn">Load More</button>
                </div>
      </div>
        </div>
     );
}
 
export default ProductDetails;