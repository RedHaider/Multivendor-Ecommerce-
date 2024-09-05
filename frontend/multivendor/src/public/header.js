import React, { useState, useEffect, useRef } from 'react';
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
                    <a className="nav-link" href="index.html">Home </a>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='shop.html'">
                        <a className="nav-link" href="shop.html">Shop </a>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='aboutus.html'">
                        <a className="nav-link" href="aboutus.html">About us</a>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='blog.html'">
                        <a className="nav-link" href="blog.html">Blog </a>
                    </li>
                    <li className="nav-item active" onclick="window.location.href='contactus.html'">
                        <a className="nav-link" href="contactus.html">Contact us</a>
                    </li>
                </ul>
                <div className="icon-container">
                    
                    <i className="fa fa-search icon p-3" id="searchIcon"></i>
                    
                
                    <div className="p-3">
                    <div className="search-bar" id="searchBar">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                    </div>
                    <div style={{ position: 'relative', display: 'inline-block' }} >
                         <i  className="fa fa-shopping-bag icon" id="cartIcon"></i>
                        <span className="notification-badge">1</span>
                    </div>
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
                <a className="nav-link" onclick="window.location.href='whishlist.html'">
                    <i className="fa fa-heart icon p-2"></i>
                </a>
                <a className="nav-link" onclick="window.location.href='login.html'">
                    <i className="fa fa-user icon p-2"></i>
                </a>
                
                </div>
                </div>
            </nav>
        
            </div>
            
        </div>
     );
}
 
export default Header;