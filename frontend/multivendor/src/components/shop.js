import SearchBar from "../utils/SearchBar";
import PriceRangeFilter from "../utils/pricerangefilter";

const Shop = () => {
    return ( 
    <div>
        <div class="container mt-5">
     
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
        <div className="row justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>Shop</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>
        <div className="row mb-5  justify-content-center">
        <SearchBar />
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
        <div class="col-md-3 col-sm-6">
            <div class="product-card">
                <img src="https://via.placeholder.com/200x200" alt="Leather Backpack"/>
                <h5>Leather Backpack</h5>
                <p>$34</p>
                <button class="product-add-to-cart-btn">Add to Cart</button>
                <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span> (9 Ratings)</p>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="product-card">
                <img src="https://via.placeholder.com/200x200" alt="Stylish T-Shirt"/>
                <h5>Stylish T-Shirt</h5>
                <p>$34</p>
                <button class="product-add-to-cart-btn">Add to Cart</button>
                <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span> (12 Ratings)</p>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="product-card">
                <span class="product-discount-badge">15% OFF</span>
                <img src="https://via.placeholder.com/200x200" alt="Diamond with Gold"/>
                <h5>Diamond with Gold</h5>
                <p>$34</p>
                <button class="product-add-to-cart-btn">Add to Cart</button>
                <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</span> (5 Ratings)</p>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="product-card">
                <img src="https://via.placeholder.com/200x200" alt="Cotton Shirt"/>
                <h5>Cotton Shirt</h5>
                <p>$34</p>
                <button class="product-add-to-cart-btn">Add to Cart</button>
                <p><span class="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span> (6 Ratings)</p>
            </div>
        </div>
    </div>


          


       <div class="row m-0 p-0 justify-content-center">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <span class="page-link">
                2
                <span class="sr-only">(current)</span>
              </span>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link " href="#">Next</a>
            </li>
          </ul>
        </nav>
       </div>

       {/* shop 2 phase end*/}
        </div>
          </div>
       </div>
     </div>
     );
}
 
export default Shop;