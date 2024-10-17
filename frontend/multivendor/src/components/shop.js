import SearchBar from "../utils/SearchBar";
import PriceRangeFilter from "../utils/pricerangefilter";
import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // State to manage the filter
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRes = await axios.get(`${config.API_BASE_URL}/product-management/api/products/`);
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

    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, []);

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

  const handlePriceChange = (min, max) => {
    setPriceRange({ min, max });
  };

  // Apply filters (client-side filtering)
  const filteredProducts = products
    .filter((product) => {
      // Assuming product.category and product.brand are IDs, update these checks accordingly if they're names
      if (selectCategory.length && !selectCategory.includes(product.category)) return false;
      if (selectedBrand.length && !selectedBrand.includes(product.brand)) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      return true;
    })
    .slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="container mt-5">
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
                <div className="col-lg-6 text-right shoptwotxt">Clear All</div>
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
                          value={category.id} // Make sure you're filtering by category ID
                          onChange={handleCategoryChange}
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
                          value={brand.id} // Make sure you're filtering by brand ID
                          onChange={handleBrandChange}
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
            <div className="row mb-5 justify-content-center">
              <SearchBar />
            </div>

            <div className="row">
              {filteredProducts.map((product) => (
                <div className="col-md-3 col-sm-6" key={product.id}>
                  <div className="product-card">
                    {/* Display main product image */}
                    <img
                      src={`${config.API_BASE_URL}${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />

                    <h5>{product.name && product.name.length > 12 ? `${product.name.slice(0, 12)}...` : product.name}</h5>
                    <p>Price: ${product.price}</p>

                    <p>In Stock: {product.stock_level}</p>

                    <button className="product-add-to-cart-btn">Add to Cart</button>
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
