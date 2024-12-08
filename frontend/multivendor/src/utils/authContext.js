import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishListCount] = useState(0);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('accessToken') !== null);
        };


        // Listen for changes to localStorage (login/logout across multiple tabs)
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const fetchCartCount = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        try {
            const response = await axios.get(`${config.API_BASE_URL}/order-management/api/cart-get/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Ensure cart items are valid before using them
            const cartItems = response.data.cartitems || [];
            setCartCount(cartItems.length);
        } catch (err) {
            console.error('Error fetching cart items:', err);
        }
    };

    const fetchWishlistCount = async () => {
        const token = localStorage.getItem('accessToken');
        if(!token) return;
        try {
            const response = await axios.get(`${config.API_BASE_URL}/order-management/api/wishlist/`,{
                headers : {Authorization: `Bearer ${token}`}
            });
            setWishListCount(response.data.length);
        } catch(err) {
            console.error('Error Fetching wishlist items', err);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchCartCount();
            fetchWishlistCount();
        }
    }, [isLoggedIn]);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
        fetchCartCount();
        fetchWishlistCount();
    };
    
    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setCartCount(0);
        setWishListCount(0);
    };



    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, cartCount, wishlistCount, fetchCartCount, fetchWishlistCount }}>
            {children}
        </AuthContext.Provider>
    );
};
