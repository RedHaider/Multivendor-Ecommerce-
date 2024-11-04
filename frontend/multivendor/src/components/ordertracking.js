import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config';

const OrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/order-management/api/orders/${orderId}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setOrder(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (error) {
                setError('Failed to fetch order details');
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return ( 
        <div>
            <div className="row no-gutters justify-content-center mb-2">
                <div className="col text-center">
                    <div className="heading">
                        <h1>Order Tracking</h1>
                        <hr className="underline-hr"/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 odertrack-first-colum">
                        <h3 className="odertracking-one-header">Name</h3>
                        <p className="odertracking-one-text">{order.customer_id.first_name} {order.customer_id.last_name}</p>
                        <br/>
                        <h3 className="odertracking-one-header">Contact</h3>
                        <p className="odertracking-one-text"> {order.customer_id ? order.customer_id.customer_id.phone_number : 'Contact info not available'}</p>
                        <br/>
                        <h3 className="odertracking-one-header">Delivery Address</h3>
                        <p className="odertracking-one-text">
                            {order.shipping_address}, {order.shipping_city}, {order.shipping_postal_code}
                        </p>
                        <br/>
                        <hr/>
                        <br/>
                        <h3 className="odertracking-one-header">Seller Name</h3>
                        <p className="odertracking-one-text">{order.vendor_orders[0].vendor.business_name}</p>
                        <br/>
                        <h3 className="odertracking-one-header">Seller Support</h3>
                        <p className="odertracking-one-text">{order.vendor_orders[0].vendor.phone_number}</p>
                        
                    </div>
                    <div className="col-md-8 odertrack-first-colum">
                        <p className="odertracking-one-text">Tracking No.</p>
                        <h3 className="odertracking-one-header">{order.order_id}</h3>
                        <br/>
                        <hr/>
                        <br/>
                        <p className="odertracking-tree-text">Your Order is</p>
                        <h2 className="odertracking-two-header">{order.status}</h2>
                        <p className="odertracking-two-text">as on {new Date(order.order_date).toLocaleDateString()}</p>
                        <div className="order-tracker">
                            <div className={`step ${order.status === 'pending' ? 'completed' : ''}`}>
                                <div className="circle">01</div>
                                <div className="label">Order Pending</div>
                            </div>
                            <div className={`step ${order.status === 'processing' ? 'completed' : ''}`}>
                                <div className="circle">02</div>
                                <div className="label">Order Processing</div>
                            </div>
                            <div className={`step ${order.status === 'complete' ? 'completed' : ''}`}>
                                <div className="circle">03</div>
                                <div className="label">Order Complete</div>
                            </div>
                            <div className={`step ${order.status === 'cancelled' ? 'completed' : ''}`}>
                                <div className="circle">04</div>
                                <div className="label">Order Cancelled</div>
                            </div>
                        </div>
                    </div>
                    {/* Product List Table */}
                    <div className="col-12 mt-4">
                        <h3>Product List</h3>
                        {order.vendor_orders.map((vendorOrder, vendorIndex) => (
                            <div key={vendorIndex} className="vendor-section mb-4">
                                <h4>Vendor: {vendorOrder.vendor.business_name}</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product Name</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendorOrder.items.map((item, itemIndex) => (
                                            <tr key={itemIndex}>
                                                <td>
                                                    <img
                                                        src={`${config.API_BASE_URL}${item.product_variant.image}`}
                                                        alt={item.product.name}
                                                        className="product-image"
                                                        width={50}
                                                    />
                                                </td>
                                                <td>{item.product.name}</td>
                                                <td>{item.product_variant ? item.product_variant.color : 'N/A'}</td>
                                                <td>{item.product_variant ? item.product_variant.size : 'N/A'}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price.toFixed(2)}</td>
                                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderTracking;
