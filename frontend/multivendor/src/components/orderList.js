import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${config.API_BASE_URL}/order-management/api/orders/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                // Sort orders by 'order_date' in descending order
                const sortedOrders = response.data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

                setOrders(sortedOrders);
                setLoading(false);
                console.log(orders);
            } catch (error) {
                setError('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Order List</h1>
            {orders.map((order) => (
                <div key={order.order_id} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span><strong>Order ID:</strong> {order.order_id}</span>
                        <span><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <strong>Total Amount:</strong> 
                            {order.total_amount && !isNaN(order.total_amount) ? `$${parseFloat(order.total_amount).toFixed(2)}` : 'N/A'}
                        </h5>
                        <p className={`card-text ${order.status.toLowerCase()}`}>
                            <strong>Status:</strong> {order.status}
                        </p>
                        
                        {order.vendor_orders.map((vendorOrder, vendorIndex) => (
                            <div key={vendorIndex} className="mb-3">
                                <h6>Vendor ID: {vendorOrder.vendor.vendorID}</h6> {/* Assuming 'vendorID' is returned from the API */}
                                <h6 className="card-subtitle mb-2 text-muted">Items:</h6>
                                <ul className="list-group">
                                    {vendorOrder.items.map((item, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between">
                                            <span>Product ID: {item.product.name} (x{item.quantity})</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
