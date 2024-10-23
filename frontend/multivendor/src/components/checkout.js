const Checkout = () => {


    return ( 
        <div>
        <div className="row justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>Check Out</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>
      <div class="container mb-5 mt-5">
           <p>Have a coupon? <span class="blogpc">Click here to enter your code...</span></p>

           
           <div class="row">
               <div class="col-md-8">
                <form class="registration-form updated">
                <h1 class="checkoutbillinH text-center">Billing Details</h1>
                    

                    <div class="col-md-12">
                        <p >Name : John Cena</p>
                        <p>Email : janina@gmail.com</p>
                    </div>

                    <label for="EmailAddress">Email Address *</label>
                    <input type="email" id="EmailAddress" name="EmailAddress" required/>

                    <label for="StreetAddress">Address *</label>
                    <input type="text" id="StreetAddress" name="StreetAddress" required/>

                    <label for="PhoneNumber">Phone Number *</label>
                    <input type="number" id="PhoneNumber" name="PhoneNumber" required/>

                    <label for="District">Division *</label>
                    <input type="text" id="District" name="District" required/>

                    <label for="District">District *</label>
                    <input type="text" id="District" name="District" required/>

                    <label for="District">State *</label>
                    <input type="text" id="District" name="District" required/>

                    <label for="District">Thana *</label>
                    <input type="text" id="District" name="District" required/>

                    <label for="District">Postal Code *</label>
                    <input type="text" id="District" name="District" required/>


                    <label class="mb-3">
                        <input type="checkbox" id="shipaddress" name="shipaddress" required/>
                        Ship to a different address?
                    </label>
                    <label for="OrderNotes" class="mb-4">Order Notes (optional)</label>
                    <textarea id="OrderNotes" name="OrderNotes" rows="4" cols="50" placeholder="Enter your order notes here"></textarea>
                </form>
               </div>
               <div class="col-md-4">
                <div class="placeorder-card p-4">
                    <h1 class="checkoutbillinH">Your Order</h1>
                    <hr/>
                    <div class="row">
                        <div class="col-6 checkout-card-h">Product</div>
                        <div class="col-6 text-right checkout-card-h">Total</div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-6 checkout-card-t">Pink Tops with Pencil skirt <span>x 1</span></div>
                        <div class="col-6 text-right checkout-card-t">$34.00</div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-6 checkout-card-t">Elastic Runner Shoes <span>x 1</span></div>
                        <div class="col-6 text-right checkout-card-t">$44.00</div>
                    </div>
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
                                <label for="flatRate">flat Rate</label><br/>
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
                    <div class="row">
                        <div class="col-12 ">
                            <form class="checkout-card-t pl-3">
                                <input type="radio" id="Cash" name="payment" value="Cash"/>
                                <label for="Cash">Cash on Delivery</label><br/>
                                <input type="radio" id="Check" name="payment" value="Check"/>
                                <label for="Check">Check Payments</label><br/>
                                <input type="radio" id="Bank" name="payment" value="Bank"/>
                                <label for="Bank">Bank Transfer</label><br/>
                                <input type="radio" id="Credit" name="payment" value="Credit"/>
                                <label for="Credit">Credit card</label><br/>
                                <input type="radio" id="PayPal" name="payment" value="PayPal"/>
                                <label for="PayPal">PayPal</label><br/>
                              </form>
                        </div>
                    </div>
                    <hr/>
                    <div class="row justify-content-center">
                        <button class="placeorder-checkout">Place Order</button>
                    </div>        
                </div>
               </div>
           </div>
      </div>
        </div>
     );
}
 
export default Checkout;