import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './topBar';
import { AuthContext } from '../utils/authContext';
import SearchBar from '../utils/SearchBar';

const Header = () => {
    const { isLoggedIn } = useContext(AuthContext);

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
                            <a className="dropdown-item" href="#">
                                <i className="fa-sharp fa-thin fa-square"></i> Women’s Collection
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa-thin fa-square"></i> Man’s Collection
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa-thin fa-square"></i> Kid’s Collection
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa-thin fa-square"></i> Accessories
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa-thin fa-square"></i> Shoes
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa-thin fa-square"></i> Jewelry
                            </a>
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

    <Link to="/login" className="nav-link">
        <i className="fa fa-user icon p-2"></i>
    </Link>
</div>

                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
