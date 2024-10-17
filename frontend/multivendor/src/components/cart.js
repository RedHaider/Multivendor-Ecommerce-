const Cart = () => {
    return ( 
        <div>
        <div className="row justify-content-center mb-2">
            <div className="col text-center">
            <div className="heading">
                <h1>Cart</h1>
                <hr className="underline-hr"/>
            </div>
            </div>
        </div>
         <div class="container mt-5 mb-5">
            <div class="row">

              <div class="col-md-8">
                <div class="overflow-auto cartd-table" >
                  <div class="table-responsive">
                      <table class="table ">
                          <thead >
                              <tr >
                                  <th scope="col">Product</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Total</th>
                                  <th scope="col"></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>
                                      <div class="d-flex align-items-center">
                                          <div class="row">
                                          <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                          <p class="wishlist-item-name p-1 ">Pink Tops with Pencil skirt</p>
                                        </div>
                                      </div>
                                  </td>
                                  <td>
                                      <p class="font-weight-bold wishlist-color cart-price">$34</p>
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
                                  <td>
                                      <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="row">
                                        <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                        <p class="wishlist-item-name p-1 ">Pink Tops with Pencil skirt</p>
                                      </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="font-weight-bold wishlist-color cart-price">$34</p>
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
                                <td>
                                    <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                                </td>
                            </tr>
                            <tr>
                              <td>
                                  <div class="d-flex align-items-center">
                                      <div class="row">
                                      <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                      <p class="wishlist-item-name p-1 ">Pink Tops with Pencil skirt</p>
                                    </div>
                                  </div>
                              </td>
                              <td>
                                  <p class="font-weight-bold wishlist-color cart-price">$34</p>
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
                                    <p class="font-weight-bold wishlist-color cart-price">$34</p>
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
                                <td>
                                    <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                                </td>
                            </tr>
                            <tr>
                              <td>
                                  <div class="d-flex align-items-center">
                                      <div class="row">
                                      <img src="picture\whislist-pic-1.png" class="wishlist-items-pic" alt="wishlist"/>
                                      <p class="wishlist-item-name ">Pink Tops with Pencil skirt</p>
                                    </div>
                                  </div>
                              </td>
                              <td>
                                  <p class="font-weight-bold wishlist-color cart-price">$34</p>
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
                              <td>
                                  <button class="wishlist-cross" onclick="removeRow(this)">X</button>
                              </td>
                          </tr>
                              
                          </tbody>
                      </table>
                  </div>
              </div>
              <div class="row wishlist-row mt-5 mb-5">
                <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start mb-2 mb-md-0">
                    <button class="placeorder-cart mb-2" onclick="window.location.href='shop.html'">Continue Shopping</button>
                </div>
                <div class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
                    <button class="placeorder-cart card-update mx-2">Clear Cart</button>
                    <button class="placeorder-cart card-update ">Update Cart</button>
                </div>
            </div>
            
            
            </div>
            



            

                <div class="col-md-4">
                    <div class="placeorder-card p-4">
                        <h1 class="cartbillinH">Cart Total</h1>
                        <hr/>
                        <div class="row">
                            <div class="col-6 checkout-card-t">Subtotal:</div>
                            <div class="col-6 text-right checkout-card-t">$78.00</div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col-12 ">
                                <form class="checkout-card-t ">
                                    <p class="checkout-card-t">Shipping:</p>
                                    <div class="pl-3">
                                    <input type="radio" id="flatRate" name="Shipping" value="flatRate"/>
                                    <label for="flatRate">Flat Rate</label><br/>
                                    <input type="radio" id="FreeShipping" name="Shipping" value="FreeShipping"/>
                                    <label for="FreeShipping">Free Shipping</label><br/>
                                    <input type="radio" id="Express" name="Shipping" value="Express"/>
                                    <label for="Express">Express</label>
                                    </div>
                                  </form>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col-6 checkout-card-t wishlist-color">Total</div>
                            <div class="col-6 text-right checkout-card-t wishlist-color">$78.00</div>
                        </div>    
                        <hr/>   
                        <div class="row justify-content-center">
                            <button class="placeorder-cart" onclick="window.location.href='checkout.html'">Proceed to Continue</button>
                        </div>     
                    </div>
                   </div>
            </div>
         </div>
         <div class="container mb-5">
            <div class="row">
                <div class="col-md-3">
                    <h1 class="cart-bottom-one">Coupon Code</h1>
                    <p class="cart-bottom-two">Enter your coupon code if you have one</p>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Enter text here"/>
                        <button class="btn btn-primary cart-sent" type="button">
                            →
                        </button>
                    </div>
                </div>
                <div class="col-md-3">
                    <h1 class="cart-bottom-one">Calculate Shipping</h1>
                    <p class="cart-bottom-two">Estimate of your country</p>
                    <form >

                        <select class="form-select form-control mb-2" required>
                            <option value="" disabled selected>Select an option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <select class="form-select form-control mb-2" required>
                            <option value="" disabled selected>Select an option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <input type="text" class="form-control mb-2" placeholder="Enter text here" required/>
                        <div class="row justify-content-center">
                            <button class="placeorder-cart">Place Order</button>
                        </div>  
                    </form>
                    
                </div>
            </div>
         </div>
        </div>
     );
}
 
export default Cart;