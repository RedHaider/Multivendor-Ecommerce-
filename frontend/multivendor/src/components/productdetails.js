const ProductDetails = () => {
    return ( 
        <div>
                <div class="productbackground-container mb-5">
        <div class="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h2 class="shopeoneH"> Home &gt; Product Details</h2>
        </div>
      </div>

      {/* product details */}
      <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-2">
                        <div class="row">
                          <img class="product-details-image-list" src="picture/product-details-image-list-1.png" alt="product details" onclick="changeMainImage(this)"/>
                        </div>
                        <div class="row">
                          <img class="product-details-image-list" src="picture/product-details-image-list-2.png" alt="product details" onclick="changeMainImage(this)"/>
                        </div>
                        <div class="row">
                          <img class="product-details-image-list" src="picture/product-details-image-list-3.png" alt="product details" onclick="changeMainImage(this)"/>
                        </div>
                        <div class="row">
                          <img class="product-details-image-list" src="picture/product-details-image-list-4.png" alt="product details" onclick="changeMainImage(this)"/>
                        </div>
                      </div>
                      <div class="col-10">
                        <img id="main-product-image" class="product-details-image" src="picture/product-details-image.png" alt="product details"/>
                      </div>
                </div>
            </div>
            <div class="col-md-6">
                <h1 class="product-details-info-h">Short sleeve middi dress</h1>
                <div class=" text-left ">
                  <i class="fa fa-star stars" ></i>
                  <i class="fa fa-star stars" ></i>
                  <i class="fa fa-star stars" ></i>
                  <i class="rating">(ratings)</i>
                </div>
                <p class="text-danger font-weight-bold mt-1">$34</p>
                <p class="product-details-info-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

                <p class="product-details-info-attribute">Color:<span class="product-details-info-attribute-span">Black</span></p>
                <div>
                  <p class="product-details-info-attribute">
                      Size:
                      <span class="btn-group" role="group" aria-label="Size options">
                          <button type="button" class="btn btn-outline-primary size-option" onclick="selectSize(this)">S</button>
                          <button type="button" class="btn btn-outline-primary size-option" onclick="selectSize(this)">M</button>
                          <button type="button" class="btn btn-outline-primary size-option" onclick="selectSize(this)">L</button>
                          <button type="button" class="btn btn-outline-primary size-option" onclick="selectSize(this)">XL</button>
                      </span>
                  </p>
              </div>        
              <div>
                <p class="product-details-info-attribute">
                    Quantity:
                    <span class="quantity-selector">
                        <button type="button" class="btn btn-outline-primary" onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantity" value="1" min="1" max="100" class="quantity-input"/>
                        <button type="button" class="btn btn-outline-primary" onclick="increaseQuantity()">+</button>
                    </span>
                </p>
            </div>
            
                <button class="product-details-info-btn">Add to Cart</button>
                
            </div>
        </div>
      </div>
      {/* product details ends */}

      {/* buttonslider */}
      <div class="container mt-5">
        <div class="row mb-5">
          <button class="productbtn col-4 pr-1 pl-1" data-target="#productCarousel" data-slide-to="0">Description</button>
          <button class="productbtn col-4 pr-1 pl-1" data-target="#productCarousel" data-slide-to="1">Information</button>
          <button class="productbtn col-4 pr-1 pl-1" data-target="#productCarousel" data-slide-to="2">Reviews</button>
        </div>
        <div id="productCarousel" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <p>
                  Description content here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <p>
                  Information content here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <p>
                  Reviews content here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* buttonslider ends */}
        </div>
     );
}
 
export default ProductDetails;