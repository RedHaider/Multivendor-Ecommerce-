import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TopBar from "./topBar";

const Header = () => {


    return ( 
        <div className="colorset">
            <TopBar/>
            <div className="container  p-0 top-section">
            <nav className="navbar navbar-expand-lg navbar-light colorset">
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle category-color" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <i className="fa-thin fa-square"></i>  Accessories
                    </a>   
                    <a className="dropdown-item" href="#">
                        <i className="fa-thin fa-square"></i>  Shoes
                    </a>   
                    <a className="dropdown-item" href="#">
                        <i className="fa-thin fa-square"></i>  Jewelry
                    </a>   
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto pl-5">
                    <li className="nav-item active" onclick="window.location.href='index.html'">
                        <Link to="/">
                        <a className="nav-link" >Home </a>
                        </Link>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='shop.html'">
                        <Link to="shop">
                        <a className="nav-link" >Shop </a>
                        </Link>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='aboutus.html'">
                        <Link to="about-us">
                        <a className="nav-link" >About us</a>
                        </Link>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='blog.html'">
                        <Link to="blog">
                        <a className="nav-link" >Blog </a>
                        </Link>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='contactus.html'">
                        <Link to="contactus">
                        <a className="nav-link" >Contact us</a>
                        </Link>
                    </li>
                </ul>
                <div className="icon-container">
                    
                    <i className="fa fa-search icon p-3" id="searchIcon"></i>
                    
                
                    <div className="p-3">
                    <div className="search-bar" id="searchBar">
                    
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                    
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }} >
                    <Link to="/cart">
                         <i  className="fa fa-shopping-bag icon" id="cartIcon"></i>
                    </Link>
                        <span className="notification-badge">1</span>
                    </div>

                    {/* Popup cart */}

                    <div className="popup-cart-icon p-2" >
                        <div className="row">
                            <div className="col-4">
                                <img src="picture/popup-cart.png" className="popup-cart" alt="cart list" />
                            </div>
                            <div className="col-6">
                                <p className="popup-cart-description">Pink Tops with Pencil skirt</p>
                                <p className="popup-cart-details">1 X <span>$54.00</span></p>
                            </div>
                            <div className="col-2">X</div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <img src="picture/popup-cart.png" className="popup-cart" alt="cart list" />
                            </div>
                            <div className="col-6">
                                <p className="popup-cart-description">Pink Tops with Pencil skirt</p>
                                <p className="popup-cart-details">1 X <span>$54.00</span></p>
                            </div>
                            <div className="col-2">X</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6 pl-4">
                                <p>Subtotal:</p>
                            </div>
                            <div className="col-6 text-right pr-4">
                                <p>$88.00</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row justify-content-center mb-2">
                            <button 
                                className="popup-button-color" 
                                onClick={() => window.location.href='cart.html'}
                            >
                                View Cart
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <button 
                                className="popup-button-color-2" 
                                onClick={() => window.location.href='checkout.html'}
                            >
                                Check Out
                            </button>
                        </div>
                    </div>
                </div>         
                <a className="nav-link" onclick="window.location.href='/Whishlist'">
                     <Link to="Whishlist">
                    <i className="fa fa-heart icon p-2"></i>
                    </Link>
                </a>
                <a className="nav-link" onclick="window.location.href='login'">
                    <Link to="login">
                    <i className="fa fa-user icon p-2"></i>
                    </Link>
                </a>
                
                </div>
                </div>
            </nav>
        
            </div>
            
        </div>
     );
}
 
export default Header;