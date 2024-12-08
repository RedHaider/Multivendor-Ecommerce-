import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from './topBar';
import { AuthContext } from '../utils/authContext';
import SearchBar from '../utils/SearchBar';
import config from '../config';
import '../style/notificaiton.css'


const Header = () => {
    const { isLoggedIn, user, logout, cartCount, wishlistCount } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(""); // Add search query state
    const [notifications, setNotifications] = useState([]); // Notifications state
    const [showNotifications, setShowNotifications] = useState(false); // State to toggle notification list
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch categories for the dropdown
    useEffect(() => {
        axios.get(`${config.API_BASE_URL}/product-management/api/category/`)
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch categories');
                setLoading(false);
            });
    }, []);

    //fetch wishlist number 

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId'); // Assuming the user ID is stored
    
        if (isLoggedIn && token && userId) {  // Ensure user is logged in and ID exists
            axios.get(`${config.API_BASE_URL}/vendor-management/notifications/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    user_id: userId  // Pass the user_id in the query parameters
                }
            })
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch notifications", error);
            });
        }
    }, [isLoggedIn]);
    

    const handleCategoryClick = (categoryId) => {
        navigate(`/shop?category=${categoryId}`);
    };


    const handleSearchSubmit = () => {
        if(searchQuery.trim() !== ""){
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    const handleNotificationClick = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios.post(`${config.API_BASE_URL}/vendor-management/notifications/mark-as-read/`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(() => {
                // After marking as read, update the unread count to 0
                setUnreadCount(0);
                // Optionally, you can also update the notification data
                const updatedNotifications = notifications.map(notification => ({
                    ...notification,
                    is_read: true
                }));
                setNotifications(updatedNotifications);
            })
            .catch((error) => {
                console.error("Failed to mark notifications as read", error);
            });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
    };

    return (
        <div className="colorset">
            <TopBar />
            <div className="container-fluid p-0 top-section">
                <nav className="navbar navbar-expand-lg navbar-light colorset">
                    <div className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle category-color"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-bars"></i> All Categories
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {loading ? (
                                <div className="dropdown-item">Loading...</div>
                            ) : error ? (
                                <div className="dropdown-item">{error}</div>
                            ) : (
                                categories.map((category) => (
                                    <a
                                        key={category.id}
                                        className="dropdown-item"
                                        onClick={() => handleCategoryClick(category.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <i className="fa-thin fa-square"></i> {category.category_name}
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto pl-lg-5">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/shop" className="nav-link">
                                    Shop
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/about-us" className="nav-link">
                                    About us
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/blog" className="nav-link">
                                    Blog
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/contactus" className="nav-link">
                                    Contact us
                                </Link>
                            </li>
                        </ul>

                        <div className="icon-container d-flex align-items-center justify-content-end flex-wrap">
                            <div className="flex-grow-1 mb-2 mb-lg-0" style={{ minWidth: '200px' }}>
                                <SearchBar
                                searchQuery={searchQuery}
                                onSearchChange={(e) => setSearchQuery(e.target.value)}
                                onSearchSubmit={handleSearchSubmit} // Pass search handler
                                />
                            </div>

                            {isLoggedIn && (
                                <div className="d-flex align-items-center ml-2 mb-2 mb-lg-0">
                                    <div style={{ position: 'relative', marginRight: '20px' }}>
                                        <Link to="/cart">
                                            <i className="fa fa-shopping-bag icon" id="cartIcon"></i>
                                        </Link>
                                        <span className="notification-badge">{cartCount}</span> {/* Display cart count */}
                                    </div>
                                    <div style={{ position: 'relative', marginRight: '20px' }}>
                                            <Link to="/wishlist" >
                                                <i className="fa fa-heart icon"></i>
                                            </Link>
                                        <span className="notification-badge">{wishlistCount}</span> {/* Display cart count */}
                                    </div>
                                    <div style={{ position: 'relative', marginRight: '20px' }} onClick={handleNotificationClick}>
                                         <i class="fa fa-bell icon" onClick={toggleNotifications}></i>
                                         {unreadCount > 0 && (
                                            <span className='notification-badge'>{unreadCount}</span>
                                         )}
                                    </div>
                                        {/* Notification Dropdown */}
                                        {showNotifications && (
                                            <div className="notification-dropdown">
                                                {notifications.length > 0 ? (
                                                    notifications.map((notification) => (
                                                        <div key={notification.id} className="notification-item">
                                                            <h6>{notification.title}</h6>
                                                            <p>{notification.message}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No notifications</div>
                                                )}
                                            </div>
                                        )}
                                </div>
                            )}

                            {isLoggedIn ? (
                                <div className="dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle"
                                        id="userDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {user?.profilePicture ? (
                                            <img
                                                src={user.profilePicture}
                                                alt="User"
                                                className="rounded-circle"
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                        ) : (
                                            <i className="fa fa-user icon p-2"></i>
                                        )}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                        <div className="dropdown-item-text">
                                            <strong>{user?.name}</strong>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/myprofile" className="dropdown-item">
                                            Profile
                                        </Link>
                                        <Link to="/orderlist" className="dropdown-item">
                                            Order List
                                        </Link>
                                        <Link to="/settings" className="dropdown-item">
                                            Settings
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item" style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="nav-link">
                                    <i className="fa fa-user icon p-2"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
