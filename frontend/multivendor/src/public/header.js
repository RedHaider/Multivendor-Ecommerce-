import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from './topBar';
import { AuthContext } from '../utils/authContext';
import SearchBar from '../utils/SearchBar';
import config from '../config';

const Header = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch categories from the API
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

    // Redirect to Shop with selected category filter
    const handleCategoryClick = (categoryId) => {
        navigate(`/shop?category=${categoryId}`);
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
                                <SearchBar />
                            </div>

                            {isLoggedIn && (
                                <div className="d-flex align-items-center ml-2 mb-2 mb-lg-0">
                                    <div style={{ position: 'relative', marginRight: '20px' }}>
                                        <Link to="/cart">
                                            <i className="fa fa-shopping-bag icon" id="cartIcon"></i>
                                        </Link>
                                        <span className="notification-badge">1</span>
                                    </div>
                                    <Link to="/whishlist" className="nav-link">
                                        <i className="fa fa-heart icon p-2"></i>
                                    </Link>
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
                                        <Link to="/profile" className="dropdown-item">
                                            Profile
                                        </Link>
                                        <Link to="/orderlist" className="dropdown-item">
                                            Order List
                                        </Link>
                                        <Link to="/settings" className="dropdown-item">
                                            Settings
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/logout" className="dropdown-item">
                                            Logout
                                        </Link>
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
