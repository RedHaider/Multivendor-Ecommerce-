
import PriceRangeFilter from "../utils/pricerangefilter";
import React, { useState, useEffect, useContext } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate, useLocation, useNavigat } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../utils/authContext";

const Shop = () => {

  // store the states here
  const { fetchCartCount, fetchWishlistCount } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productType, setProductType] = useState([]);
  const [subCategory, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);


  // State to manage the filter
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectProductType, setSelectProductType] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const [wishlist, setWishList] = useState([]);

  //extracting the category id from URL
  const categoryIdFromUrl = new URLSearchParams(location.search).get("category")



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRes = await axios.get(`${config.API_BASE_URL}/product-management/api/products/`);
        fetchWishlist();
        setProducts(productRes.data);
      } catch (error) {
        setError("Failed to fetch Products");
      }
      setLoading(false);
    };

    const fetchCategories = async () => {
      try {
        const categoryRes = await axios.get(`${config.API_BASE_URL}/product-management/api/category/`);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    };

    const fetchBrands = async () => {
      try {
        const brandRes = await axios.get(`${config.API_BASE_URL}/product-management/api/brand/`);
        setBrands(brandRes.data);
      } catch (error) {
        console.error("Failed to fetch brands");
      }
    };

    const fetchProductTypes = async () => {
      try {
        const product_typeRes = await axios.get(`${config.API_BASE_URL}/product-management/api/product-type/`)
        setProductType(productType.data);
      } catch (error) {
        console.error("Failed to fetch product type")
      }
    }

    const fetchSubCategory = async () => {
      try{
        const subCategoryRest = await axios.get(`${config.API_BASE_URL}/product-management/api/sub-category/`)
        setSubCategories(subCategoryRest.data)
      } catch (error){
        console.error("Failed to fetch subcategory")
      }
    }

    fetchProducts();
    fetchBrands();
    fetchCategories();
    fetchProductTypes();
    fetchSubCategory();
  }, []);

  useEffect(() => {
    if (categoryIdFromUrl) {
      setSelectCategory((prevCategories) => [...prevCategories, categoryIdFromUrl]);
    }
  }, [categoryIdFromUrl]);

  const fetchWishlist = async () => {
    const token = localStorage.getItem('accessToken'); 
  
    try {
      const response = await axios.get(`${config.API_BASE_URL}/order-management/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request header
        },
      });
      setWishList(response.data);
      fetchWishlistCount();
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
      fetchWishlistCount();
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
      fetchWishlistCount();
    } catch (error) {
      console.error("Remove from wishlist error", error);
    }
  };



  //code your functions from here

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
      customer_id: customerId 
    });
    fetchCartCount();
    toast.success("Product added to cart successfully!");

    if (redirectToCheckout) {
      navigate('/checkout');
    }
  } catch (error) {
    console.error("Failed to add to cart", error);
    toast.error("Failed to add product to cart.");
  }
};



  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  // Handle category filter
const handleCategoryChange = (e) => {
  const value = e.target.value;
  setSelectCategory((prevSelected) =>
    prevSelected.includes(value) ? prevSelected.filter((cat) => cat !== value) : [...prevSelected, value]
  );
};



  // Handle brand filter changes
  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrand((prevSelected) =>
      prevSelected.includes(value) ? prevSelected.filter((brand) => brand !== value) : [...prevSelected, value]
    );
  };

  const handleProductTypeChange = (e) => {
    const value = e.target.value;
    setSelectProductType((prevSelected) =>
     prevSelected.includes(value) ? prevSelected.filter((type) => type !== value) : [...prevSelected, value]
    )
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectSubCategory((prevSelected) => 
     prevSelected.includes(value) ? prevSelected.filter((sub) => sub !== value) : [...prevSelected, value]
    )
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  //Handle search input change


 //filter sections
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectCategory.length ===  0 || selectCategory.includes(product.category);
      const matchesBrand = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
      const matchesProductType = selectProductType.length === 0 || selectProductType.includes(product.product_type);
      const matchesSubCategory = selectSubCategory.length === 0 || selectSubCategory.includes(product.subcategory);
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

      const matchesSearch = searchQuery
            ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.product_type.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch && matchesSubCategory && matchesProductType;
    })
    .slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const clearAllFilters = () => {
    setSelectCategory([]);
    setSelectedBrand([]);
    setSelectProductType([]);
    setSelectSubCategory([]);
    setPriceRange({ min: 0, max: 10000 });
    navigate("/shop");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="container-fluid custom-container mt-5">
        <div className="row justify-content-center mb-2">
          <div className="col text-center">
            <div className="heading">
              <h1>Shop</h1>
              <hr className="underline-hr" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <div className="container mt-5">
              {/* category filter */}
              <div className="row">
                <div className="col-lg-6 shoptwoh">Filter</div>
                <div className="col-lg-6 text-right shoptwotxt">
                  <button className="btn btn-link" onClick={clearAllFilters}>
                    Clear All
                  </button>
                </div>
              </div>
              <hr />
              <h5 className="d-flex justify-content-between">
                <span className="shoptogglerH font-weight-bold">Categories</span>
                <button
                  className="btn btn-link p-0"
                  data-toggle="collapse"
                  data-target="#categories-list"
                  aria-expanded="true"
                  aria-controls="categories-list"
                  id="toggle-button"
                >
                  <i className="fa fa-chevron-down"></i>
                </button>
              </h5>
              <div id="categories-list" className="collapse show">
                <ul className="category-list list-unstyled">
                  {categories.map((category) => (
                    <li className="category-item row" key={category.id}>
                      <div className="col text-left">
                      <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          value={category.category_name}
                          onChange={handleCategoryChange}
                          checked={selectCategory.includes(category.category_name)}  // Ensures checkbox is ticked
                        />
                        
                        <label htmlFor={`category-${category.id}`} className="ml-1">
                          {category.category_name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* -------- */}
              <hr />
              {/* Brand filter */}
              <h5 className="d-flex justify-content-between">
                <span className="shoptogglerH font-weight-bold">Brand</span>
                <button
                  className="btn btn-link p-0"
                  data-toggle="collapse"
                  data-target="#brand-list"
                  aria-expanded="true"
                  aria-controls="brand-list"
                  id="toggle-button"
                >
                  <i className="fa fa-chevron-down"></i>
                </button>
              </h5>
              <div id="brand-list " className="collapse show">
                <ul className="category-list list-unstyled ml-3">
                  {brands.map((brand) => (
                    <li className="category-item row" key={brand.id}>
                      <div className=" text-left">
                        <input
                          type="checkbox"
                          id={`brand-${brand.id}`}
                          value={brand.brand_name} 
                          onChange={handleBrandChange}
                          checked={selectedBrand.includes(brand.brand_name)}
                        />
                        <label htmlFor={`brand-${brand.id}`} className="ml-1">
                          {brand.brand_name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <PriceRangeFilter onPriceChange={handlePriceChange} />
              </div>
            </div>
          </div>
          <div className="col-lg-9 m-0 p-0">
            <ToastContainer />
            <div className="row">
              {filteredProducts.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2" key={product.id}>
                  <div className="product-card" onClick={() => handleProductClick(product.id)}>
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
                    {/* Display main product image */}
                    <img
                      src={`${config.API_BASE_URL}${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />

                    <h5>{product.name && product.name.length > 12 ? `${product.name.slice(0, 12)}...` : product.name}</h5>
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
                          onClick={(event) => handleAddToCart(event, product)} // Add to cart without redirecting
                        >
                          <FaShoppingCart />
                        </div>
                        <button 
                          className="product-add-to-cart-btn mr-4" 
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
                <button className="load-more-btn" onClick={loadMore}>
                  Load More
                </button>
              )}
            {/* shop 2 phase end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

