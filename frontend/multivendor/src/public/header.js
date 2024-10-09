import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import TopBar from "./topBar";
import { AuthContext } from '../utils/authContext';


const Header = () => {

    const { isLoggedIn } = useContext(AuthContext);

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
                    <li className="nav-item active" >
                        <Link to="/ ">
                        <a className="nav-link" >Home </a>
                        </Link>
                    </li>
                    <li className="nav-item active" >
                        <Link to="shop">
                        <a className="nav-link" >Shop </a>
                        </Link>
                    </li>
                    <li className="nav-item active" >
                        <Link to="about-us">
                        <a className="nav-link" >About us</a>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="blog">
                        <a className="nav-link" >Blog </a>
                        </Link>
                    </li>
                    <li className="nav-item active" >
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
                    {
                        isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }}>
                                    <Link to="/cart">
                                        <i className="fa fa-shopping-bag icon" id="cartIcon"></i>
                                    </Link>
                                    <span className="notification-badge">1</span>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <Link to="Whishlist" className="nav-link">
                                        <i className="fa fa-heart icon p-2"></i>
                                    </Link>
                                </div>
                            </div>

                        ) : null
                    }
                </div>  
                <a className="nav-link">
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