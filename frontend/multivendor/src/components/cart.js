import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext'; // Import AuthContext

const Cart = () => {
  const { fetchCartCount } = useContext(AuthContext); // Access fetchCartCount from AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [notification, setNotification] = useState(null);
  const [removedItems, setRemovedItems] = useState([]); // Track removed items

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found, please log in');
        }

        const response = await axios.get(`${config.API_BASE_URL}/order-management/api/cart-get/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.cartitems || response.data);
        calculateTotal(response.data.cartitems || response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cart items');
        console.error('Error fetching cart items:', err);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const navigate = useNavigate();

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);
    setTotal(totalPrice.toFixed(2));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    console.log('Removing item with variant id:', itemId);
    setRemovedItems([...removedItems, itemId]); // Track removed items
    setCartItems(cartItems.filter((item) => item.variant_details.id !== itemId)); // Update UI
  };

  const handleClearCart = () => {
    setRemovedItems(cartItems.map((item) => item.variant_details.id)); // Track all removed items
    setCartItems([]); // Clear the cart UI
  };

  const handleUpdateCart = async () => {
    setNotification('Updating cart...');

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${config.API_BASE_URL}/order-management/api/cart-update/`,
        {
          cartitems: cartItems, // Send the updated cart items to the backend
          removedItems: removedItems, // Send the removed items list
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      calculateTotal(cartItems);

      // Call fetchCartCount to update the global cart count
      fetchCartCount();

      setNotification('Cart updated successfully!');
    } catch (err) {
      console.error('Error updating cart:', err);
      setNotification('Failed to update cart.');
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="row no-gutters justify-content-center mb-2">
        <div className="col text-center">
          <div className="heading">
            <h1>Cart</h1>
            <hr className="underline-hr" />
          </div>
        </div>
      </div>

      {notification && <div className="alert alert-success">{notification}</div>}

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-8">
            <div className="overflow-auto cartd-table">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      const itemPrice = parseFloat(item.price) || 0;
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="row">
                                <img src={`${config.API_BASE_URL}${item.variant_details.image}`} alt={item.variant_details.color} className="wishlist-items-pic" />
                                <div className="pl-3">
                                  <p className="wishlist-item-name p-1" style={{ fontWeight: 'bold' }}>
                                    {item.product_id.name || 'Product Name Unavailable'}
                                  </p>
                                  <p>Size: {item.variant_details.size}</p>
                                  <p>Color: {item.variant_details.color}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="font-weight-bold wishlist-color cart-price">${itemPrice.toFixed(2)}</p>
                          </td>
                          <td>
                            <span className="quantity-selector">
                              <button type="button" onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}>-</button>
                              <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                max="100"
                                className="quantity-input"
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                              />
                              <button type="button" onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                            </span>
                          </td>
                          <td>
                            <p className="font-weight-bold wishlist-color">${(item.quantity * itemPrice).toFixed(2)}</p>
                          </td>
                          <td>
                            <button className="wishlist-cross" onClick={() => handleRemoveItem(item.variant_details.id)}>X</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row wishlist-row mt-5 mb-5">
              <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start mb-2 mb-md-0">
                <button className="placeorder-cart mb-2" onClick={() => navigate('/shop')}>
                  Continue Shopping
                </button>
              </div>
              <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
                <button className="placeorder-cart card-update mx-2" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="placeorder-cart card-update" onClick={handleUpdateCart}>
                  Update Cart
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="placeorder-card p-4">
              <h1 className="cartbillinH">Cart Total</h1>
              <hr />
              <div className="row">
                <div className="col-6 checkout-card-t">Subtotal:</div>
                <div className="col-6 text-right checkout-card-t">${total}</div>
              </div>
              <hr />
              <div className="row justify-content-center">
                <button className="placeorder-cart" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
