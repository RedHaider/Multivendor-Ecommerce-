import ProductCarousel from "../utils/ProductCarousel";
import RatingBreakdown from "../productComponents/RatingBreakdown";
import ProductReview from "../productComponents/ProductReview";

const ProductDetails = () => {
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
    return ( 
        <div>
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
                <ProductCarousel/>
              </div>
          </div>
      </div>

            <div class="col-md-6 text-left">
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

      {/* Product Details */}
      <div class="container mt-5 mb-5">
            <h2 className="text-left">Product Details Of Short Sleeve Midi Dress</h2>
              <div class="row text-left"> 
                <ul class="product-details-list">
                  <li>Product Type: T-Shirt & 2 Quarter Pant</li>
                  <li>T-Shirt Color: Black, Ash</li>
                  <li>Main Material: T-Shirt Cotton & Pant Synthetic Fabric</li>
                  <li>Gender: Men</li>
                  <li>Stylish Design</li>
                  <li>High-Quality Cotton Fabric</li>
                  <li>M = T-Shirt: Length-27" / Chest: 38" Pant: Length-24" / Waist: 28-30"</li>
                  <li>L = T-Shirt: Length-28" / Chest: 40" Pant: Length-25" / Waist: 32-33"</li>
                  <li>XL = T-Shirt: Length-29" / Chest: 42" Pant: Length-26" / Waist: 34-35"</li>
                  <li>#TShirtForMen</li>
                </ul>
              </div>
      </div>
            {/* Product Details */}
            <div class="container mt-5 mb-5">
            <h2 className="text-left">Specifications of Short sleeve middi dress</h2>
              <div class="row text-left"> 
                <ul class="product-details-list">
                  <li>Brand: No Brand</li>
                  <li>SKU:389255983_BD-1940255191</li>
                  <li>Main Material: Synthetic</li>
                </ul>
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