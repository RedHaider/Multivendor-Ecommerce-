import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch wishlist items on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`${config.API_BASE_URL}/order-management/api/wishlist/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        setError('Failed to load wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove from wishlist function
  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`${config.API_BASE_URL}/order-management/api/wishlist/remove/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove item from state immediately
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  // Redirect to product details
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mb-5">
      <div className="row no-gutters justify-content-center mb-2">
        <div className="col text-center">
          <div className="heading">
            <h1>Wishlist</h1>
            <hr className="underline-hr" />
          </div>
        </div>
      </div>

      <div className="row">
        {wishlist.length === 0 ? (
          <div className="col text-center">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          wishlist.map((item) => (
            <div 
              className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2" 
              key={item.product.id}
            >
              <div 
                className="product-card" 
                onClick={() => handleProductClick(item.product.id)}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="wishlist-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeFromWishlist(item.product.id);
                  }}
                >
                  <FaHeart color="red" /> {/* Display as red to indicate it's in the wishlist */}
                </div>
                <img 
                  src={`${config.API_BASE_URL}${item.product.image}`} 
                  alt={item.product.name} 
                  className="product-image" 
                />
                <h5 className="product-name">
                  {item.product.name.length > 20 ? `${item.product.name.slice(0, 20)}...` : item.product.name}
                </h5>
                <p className="product-price">Price: ${item.product.price}</p>
                <p className="product-review">
                  Review 
                  <span className="product-rating">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;



{/* <div class="container mt-5 mb-5">
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</div> */}