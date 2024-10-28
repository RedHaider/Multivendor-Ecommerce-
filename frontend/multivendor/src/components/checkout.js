import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";

const Checkout = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        division: '',
        district: '',
        state: '',
        thana: '',
        postalCode: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isShippingDifferent, setIsShippingDifferent] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0); // State to store original subtotal
    const [total, setTotal] = useState(0); // State to store total after discount
    const [coupon, setCoupon] = useState(''); 
    const [discount, setDiscount] = useState(0); 
    const [couponError, setCouponError] = useState(''); 
    const [couponApplied, setCouponApplied] = useState(false); // Track coupon application

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('No token found, please log in');
                }

                const response = await axios.get(`${config.API_BASE_URL}/api/user/details/`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Send the token in the header
                    }
                });

                const data = response.data;

                // Populate the form fields with user data
                setUserDetails({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    address: data.customer_profile.address,
                    division: data.customer_profile.division,
                    district: data.customer_profile.district,
                    state: data.customer_profile.state,
                    thana: data.customer_profile.Thana,
                    postalCode: data.customer_profile.postal_code
                });

                setLoading(false);
            } catch (err) {
                setError('Failed to load user details');
                console.error('Error fetching user details:', err);
                setLoading(false);
            }
        };

        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('No token found, please log in');
                }

                const response = await axios.get(`${config.API_BASE_URL}/order-management/api/cart-get/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCartItems(response.data.cartitems || response.data);
                calculateSubtotal(response.data.cartitems || response.data); // Set subtotal
                setLoading(false);
            } catch (err) {
                setError('Failed to load cart items');
                console.error('Error fetching cart items:', err);
                setLoading(false);
            }
        };

        fetchCartItems();
        fetchUserDetails();
    }, []);

    const calculateSubtotal = (items) => {
        const subtotalPrice = items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);
        setSubtotal(subtotalPrice.toFixed(2));
        setTotal(subtotalPrice.toFixed(2)); // Initially, total is the same as subtotal
    };

    const handleShipToDifferent = (e) => {
        setIsShippingDifferent(e.target.checked);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const applyCoupon = async () => {
        if (couponApplied) return;  // Prevent further discount application

        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.post(`${config.API_BASE_URL}/order-management/api/validate-coupon/`, {
                coupon_code: coupon,
                cart_items: cartItems
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const discountAmount = response.data.discount;
            setDiscount(discountAmount);
            setTotal((subtotal - discountAmount).toFixed(2)); // Subtract discount from subtotal to get the new total
            setCouponError('');
            setCouponApplied(true);  // Disable the button after applying the coupon
        } catch (error) {
            setCouponError(error.response?.data?.error || "Failed to apply coupon");
            setDiscount(0);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="row no-gutters justify-content-center mb-2">
                <div className="col text-center">
                    <div className="heading">
                        <h1>Check Out</h1>
                        <hr className="underline-hr" />
                    </div>
                </div>
            </div>
            <div className="container mb-5 mt-5">
                <div className="row">
                <div className="col-md-8">
                        <form className="registration-form updated">
                            <h1 className="checkoutbillinH text-center">Billing Details</h1>

                            <div className="col-md-12">
                                <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
                                <p>Email: {userDetails.email}</p>
                            </div>

                            <label htmlFor="StreetAddress">Address *</label>
                            <input
                                type="text"
                                id="StreetAddress"
                                name="address"
                                value={userDetails.address}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="PhoneNumber">Phone Number *</label>
                            <input
                                type="number"
                                id="PhoneNumber"
                                name="phone"
                                value={userDetails.phone}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="Division">Division *</label>
                            <input
                                type="text"
                                id="Division"
                                name="division"
                                value={userDetails.division}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="District">District *</label>
                            <input
                                type="text"
                                id="District"
                                name="district"
                                value={userDetails.district}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="State">State *</label>
                            <input
                                type="text"
                                id="State"
                                name="state"
                                value={userDetails.state}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="Thana">Thana *</label>
                            <input
                                type="text"
                                id="Thana"
                                name="thana"
                                value={userDetails.thana}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="PostalCode">Postal Code *</label>
                            <input
                                type="text"
                                id="PostalCode"
                                name="postalCode"
                                value={userDetails.postalCode}
                                readOnly={!isShippingDifferent}
                                onChange={handleInputChange}
                                required
                            />

                            <label className="mb-3">
                                <input
                                    type="checkbox"
                                    id="shipaddress"
                                    name="shipaddress"
                                    onChange={handleShipToDifferent}
                                    checked={isShippingDifferent}
                                />
                                Ship to a different address?
                            </label>

                            <label htmlFor="OrderNotes" className="mb-4">Order Notes (optional)</label>
                            <textarea
                                id="OrderNotes"
                                name="OrderNotes"
                                rows="4"
                                cols="50"
                                placeholder="Enter your order notes here"
                            ></textarea>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <div className="placeorder-card p-4">
                            <h1 className="checkoutbillinH">Your Order</h1>
                            <hr />
                            <div className="row">
                                <div className="col-6 checkout-card-h">Product</div>
                                <div className="col-6 text-right checkout-card-h">Total</div>
                            </div>
                            <hr />
                            {cartItems.map((item) => (
                                <div key={item.id}>
                                    <div className="row">
                                        <div className="col-6 checkout-card-t">
                                            {item.product_name} <span>x {item.quantity}</span>
                                        </div>
                                        <div className="col-6 text-right checkout-card-t">
                                            ${parseFloat(item.price).toFixed(2)}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}

                            <div className="row">
                                <div className="col-6 checkout-card-t">Subtotal:</div>
                                <div className="col-6 text-right checkout-card-t">${subtotal}</div> {/* Use subtotal here */}
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    <form className="checkout-card-t">
                                        <p className="checkout-card-t">Coupons:</p>
                                        <div className="pl-3 mb-3 registration-form updated">
                                            <input
                                                type="text"
                                                placeholder="Place Your Coupon Here"
                                                id="Coupon"
                                                name="Coupon"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                                required
                                                disabled={couponApplied} // Disable input if coupon applied
                                            />
                                            <button type="button" onClick={applyCoupon} disabled={couponApplied}>Apply Coupon</button>
                                        </div>
                                        {couponError && <p className="text-danger">{couponError}</p>}
                                    </form>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-6 checkout-card-t wishlist-color">Total</div>
                                <div className="col-6 text-right checkout-card-t wishlist-color">${total}</div> {/* Use total after discount */}
                            </div>
                            <hr />
                            <div className="row justify-content-center">
                                <button className="placeorder-checkout">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
