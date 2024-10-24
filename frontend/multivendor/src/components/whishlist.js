const Whishlist = () => {
    return ( 
    <div>
        <div className="row  no-gutters justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>Wish List</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>


      {/* wish List */}



      <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col">
                <div class="overflow-auto cartd-table">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col" class="text-center">Add to Cart</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="row">
                                                <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                                <p class="wishlist-item-name p-1">Pink Tops with Pencil skirt</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="quantity-selector">
                                            <button type="button" onclick="decreaseQuantity(this)">-</button>
                                            <input type="number" value="1" min="1" max="100" class="quantity-input"/>
                                            <button type="button" onclick="increaseQuantity(this)">+</button>
                                        </span>
                                    </td>
                                    <td>
                                        <p class="font-weight-bold wishlist-color">$34</p>
                                    </td>
                                    <td class="text-center">
                                        <button class="product-details-info-btn">Add to Cart</button>
                                    </td>
                                    <td>
                                        <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                                    </td>
                                </tr>
                                <tr>
                                  <td>
                                      <div class="d-flex align-items-center">
                                          <div class="row">
                                              <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                              <p class="wishlist-item-name p-1">Pink Tops with Pencil skirt</p>
                                          </div>
                                      </div>
                                  </td>
                                  <td>
                                      <span class="quantity-selector">
                                          <button type="button" onclick="decreaseQuantity(this)">-</button>
                                          <input type="number" value="1" min="1" max="100" class="quantity-input"/>
                                          <button type="button" onclick="increaseQuantity(this)">+</button>
                                      </span>
                                  </td>
                                  <td>
                                      <p class="font-weight-bold wishlist-color">$34</p>
                                  </td>
                                  <td class="text-center">
                                      <button class="product-details-info-btn">Add to Cart</button>
                                  </td>
                                  <td>
                                      <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="row">
                                            <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                            <p class="wishlist-item-name p-1">Pink Tops with Pencil skirt</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="quantity-selector">
                                        <button type="button" onclick="decreaseQuantity(this)">-</button>
                                        <input type="number" value="1" min="1" max="100" class="quantity-input"/>
                                        <button type="button" onclick="increaseQuantity(this)">+</button>
                                    </span>
                                </td>
                                <td>
                                    <p class="font-weight-bold wishlist-color">$34</p>
                                </td>
                                <td class="text-center">
                                    <button class="product-details-info-btn">Add to Cart</button>
                                </td>
                                <td>
                                    <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                                </td>
                            </tr>
                                {/* Repeat the above <tr> for each item */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div> 
        );
}
 
export default Whishlist;