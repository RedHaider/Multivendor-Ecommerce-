const OrderTracking = () => {
    return ( 
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 odertrack-first-colum">
                            <h3 className="odertracking-one-header">Customer Name</h3>
                            <p className="odertracking-one-text">Prashant patil</p>
                            <br/>
                            <h3 className="odertracking-one-header">Customer Contact</h3>
                            <p className="odertracking-one-text">017 7689 4578</p>
                            <br/>
                            <h3 className="odertracking-one-header">Delivery Address</h3>
                            <p className="odertracking-one-text">Garib-E-Newaz Avenue, Sector#13, Uttara, Dhaka 1230</p>
                            <br/>
                            <hr/>
                            <br/>
                            <h3 className="odertracking-one-header">Seller Name</h3>
                            <p className="odertracking-one-text">Private Limited</p>
                            <br/>
                            <h3 className="odertracking-one-header">Seller Support</h3>
                            <p className="odertracking-one-text">+646 582 7309</p>
                            <p className="odertracking-one-text">essentialinfo-tech@gmail.com</p>
                    </div>
                    <div className="col-md-8 odertrack-first-colum">
                        <p className="odertracking-one-text">Tracking No.</p>
                        <h3 className="odertracking-one-header">#876876565</h3>
                        <br/>
                        <hr/>
                        <br/>
                        <p className="odertracking-tree-text">Your Order is</p>
                        <h2 className="odertracking-two-header">Delivered</h2>
                        <p className="odertracking-two-text">as on 08 Aug 2024, Sunday</p>
                        <div class="order-tracker">
                            <div class="step completed">
                                <div class="circle">✔</div>
                                <div class="label">
                                    <strong>01</strong> Order Processed
                                </div>
                            </div>
                            <div class="step completed">
                                <div class="circle">✔</div>
                                <div class="label">
                                    <strong>02</strong> Order Shipped
                                </div>
                            </div>
                            <div class="step">
                                <div class="circle">03</div>
                                <div class="label">
                                    Order En Route
                                </div>
                            </div>
                            <div class="step">
                                <div class="circle">04</div>
                                <div class="label">
                                    Order Arrived
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
     );
}
 
export default OrderTracking;