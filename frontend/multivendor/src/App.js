import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// pages
import Home from './components/home'
import AboutUs from './components/aboutUs'
import Shop from './components/shop';
import Header from './public/header';
import Footer from './public/footer';
import Blog from './components/blog';
import BlogDetails from './components/blogDetails';
import Checkout from './components/checkout';
import Cart from './components/cart';
import ContactUs from './components/contactUs';
import Login from './components/login';
import ProductDetails from './components/productdetails';
import Register from './components/register';
import Whishlist from './components/whishlist';

//bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Popper.js

//importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import $ from 'jquery';
import Popper from 'popper.js';
import './style.css'
import './style2.css'


function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Shop/>
      <Blog/>
      <AboutUs/>
      {/* <Whishlist/> */}
      {/* <Register/> */}
      {/* <ProductDetails/> */}
      {/* <Login/> */}
      {/* <ContactUs/> */}
      {/* <Checkout/> */}
      {/* <BlogDetails/> */}
      {/* <Cart/> */}
      {/* <BlogDetails/> */}
      <Footer/>
    </div>
  );
}

export default App;
