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
import PrivateRoute from './utils/privateroute';
import OrderList from './components/orderList';
import { AuthProvider } from './utils/authContext';
//bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Popper.js

//importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import $ from 'jquery';
import Popper from 'popper.js';
import './style.css'
import './style2.css'
import './accordina.css'
import TermsAndCondition from './components/TermsConditons';
import ReturnAndRefund from './components/ReturnAndRefund';
import VendorProfile from './components/VendorProfile';
import MyProfile from './components/MyProfile';


function App() {
  return (
    <AuthProvider>
    <Router>
      <div className='App'>
      <Header/>
      <div className='content'>
      <Routes>
        {/* open even without registration */}
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/blogdetails' element={<BlogDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/termsandcondition' element={<TermsAndCondition/>}/>
        <Route path='/returnpolicy' element={<ReturnAndRefund/>}/>
        <Route path='/vednorprofile' element={<VendorProfile/>}/>
        <Route path='/myprofile' element={<MyProfile/>}/>
        
      

        {/* open only if you registered */}
        <Route path='/Whishlist' element={<PrivateRoute><Whishlist/></PrivateRoute>}/>
        <Route path='/productdetails/:productId' element={<PrivateRoute><ProductDetails/></PrivateRoute>}/>
        <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
        <Route path='/checkout' element={<PrivateRoute><Checkout/></PrivateRoute>}/>
        <Route path='/ordertracking//:orderId' element={<PrivateRoute><OrderTracking/></PrivateRoute>}/>
        <Route path='/orderlist' element={<PrivateRoute><OrderList/></PrivateRoute>} />

      </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
