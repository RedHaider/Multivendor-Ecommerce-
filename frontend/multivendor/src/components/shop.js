import SearchBar from "../utils/SearchBar";
import PriceRangeFilter from "../utils/pricerangefilter";
import React, {useState, useEffect} from "react";
import config from "../config";
import axios from "axios";

const Shop = () => {

    const [products, setProducts] = useState();
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] =useState(8);

    useEffect(()=> {
        axios.get(`${config.API_BASE_URL}/product-management/api/products/`)
        .then((response)=>{
            setProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError('Failed to fetch Products');
            setLoading(false);
        })
    },[])

    const loadMore = () => {
        setVisibleCount((prevCount)=> prevCount+8)
    }
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return ( 
    <div>
        <div class="container mt-5">
        <div className="row justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>Shop</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>
     
        <div class="row">
        <div class="col-lg-3">
          <div class="container mt-5">
            {/* ------ */}
             <div class="row">
              <div class="col-lg-6 shoptwoh">Filter</div>
              <div class="col-lg-6 text-right shoptwotxt">Clear All</div>
             </div>
            <hr/>
            <h5 class="d-flex justify-content-between">
                <span class="shoptogglerH font-weight-bold">Categories</span>
                <button class="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list" aria-expanded="true" aria-controls="categories-list" id="toggle-button">
                    <i class="fa fa-chevron-down"></i>
                </button>
            </h5>
            <div id="categories-list" class="collapse show">
                <ul class="category-list list-unstyled">
                    <li class="category-item row">
                        <div class="col-md-6 text-left">
                            <input type="checkbox" id="dresses"/>
                            <label for="dresses"  className="ml-1"> Dresses</label>
                        </div>
                        <div class="col-md-6 text-right"><span>8</span></div>
                    </li>
                    <li class="category-item row">
                      <div class="col-md-6 text-left">
                          <input type="checkbox" id="dresses"/>
                          <label for="dresses " className="ml-1"> T-shirt</label>
                      </div>
                      <div class="col-md-6 text-right"><span>8</span></div>
                    </li>
                    <li class="category-item row">
                    <div class="col-md-6 text-left">
                        <input type="checkbox" id="dresses"/>
                        <label for="dresses" className="ml-1">Jeans</label>
                    </div>
                    <div class="col-md-6 text-right"><span>8</span></div>
                 </li>
                 <li class="category-item row">
                  <div class="col-md-6 text-left">
                      <input type="checkbox" id="dresses"/>
                      <label for="dresses" className="ml-1">Shoes</label>
                  </div>
                  <div class="col-md-6 text-right"><span>8</span></div>
               </li>
               <li class="category-item row">
                <div class="col-md-6 text-left">
                    <input type="checkbox" id="dresses"/>
                    <label for="dresses" className="ml-1">Jacket</label>
                </div>
                <div class="col-md-6 text-right"><span>8</span></div>
             </li>
             <li class="category-item row">
              <div class="col-md-6 text-left">
                  <input type="checkbox" id="dresses"/>
                  <label for="dresses" className="ml-1">Bags</label>
              </div>
              <div class="col-md-6 text-right"><span>8</span></div>
           </li>

                </ul>
            </div>
            {/* -------- */}
            <hr/>
            <h5 class="d-flex justify-content-between">
                <span class="shoptogglerH font-weight-bold">Brand</span>
                <button class="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list" aria-expanded="true" aria-controls="categories-list" id="toggle-button">
                    <i class="fa fa-chevron-down"></i>
                </button>
            </h5>
            <div id="categories-list" class="collapse show">
                <ul class="category-list list-unstyled">
                    <li class="category-item row">
                        <div class="col-md-6 text-left">
                            <input type="checkbox" id="dresses"/>
                            <label for="dresses"  className="ml-1"> UGG</label>
                        </div>
                        <div class="col-md-6 text-right"><span>8</span></div>
                    </li>
                    <li class="category-item row">
                      <div class="col-md-6 text-left">
                          <input type="checkbox" id="dresses"/>
                          <label for="dresses " className="ml-1"> Nike</label>
                      </div>
                      <div class="col-md-6 text-right"><span>8</span></div>
                    </li>

                 <li class="category-item row">
                  <div class="col-md-6 text-left">
                      <input type="checkbox" id="dresses"/>
                      <label for="dresses" className="ml-1">Geox</label>
                  </div>
                  <div class="col-md-6 text-right"><span>8</span></div>
               </li>
                </ul>
            </div>

            <div>
                <PriceRangeFilter/>
            </div>
         </div>
        </div>
        <div class="col-lg-9 m-0 p-0">

        <div className="row mb-5  justify-content-center">
        <SearchBar />
        </div>

        <div class="row">
            {products.slice(0,visibleCount).map((product)=>(
                <div className="col-md-3 col-sm-6" key={product.id}>
                    <div className="product-card">
                    
                    {/* Display main product image */}
                    <img 
                        src={`${config.API_BASE_URL}${product.image}`} 
                        alt={product.name} 
                        className="product-image" 
                    />
                    
                    <h5>
                    {product.name && product.name.length > 12
                        ? `${product.name.slice(0, 12)}...` 
                        : product.name}
                        </h5>
                    <p>Price: ${product.price}</p>
                    
                    <p>In Stock: {product.stock_level}</p>
                    
                    <button className="product-add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            ))}

            {visibleCount < products.length && (
                <button className="load-more-btn" onClick={loadMore} >Load More</button>
            )}
        </div>



       {/* shop 2 phase end*/}
        </div>
          </div>
       </div>
     </div>
     );
}
 
export default Shop;