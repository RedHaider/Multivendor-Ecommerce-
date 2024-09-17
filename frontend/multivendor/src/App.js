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
import OrderTracking from './components/ordertracking';
//bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Popper.js

//importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import $ from 'jquery';
import Popper from 'popper.js';
import './style.css'
import './style2.css'
import './accordina.css'


function App() {
  return (
    <Router>
      <div className='App'>
      <Header/>
      <div className='content'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/Whishlist' element={<Whishlist/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/productdetails' element={<ProductDetails/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/blogdetails' element={<BlogDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/ordertracking' element={<OrderTracking/>}/>

      </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
