const Footer = () => {
    return ( 
        <footer className="footerStyle ">
        <div className="container">
          <div className="row  no-gutters pt-5 mb-3">
            <div className="col-md-4 mb-md-0  d-flex">
              <div className="w-100">
                <div className="w-100 text-left">
                  <div>
                    <img src="picture\logo.svg" alt="Logo" className="logo"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-4 mb-md-0 mb-4">
                  <ul className="list-unstyled">
                    <li className="footerWord">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce posuere tincidunt sem nec pulvinar.
                    </li>
                    <li>
                      <div  className="pt-4" >
                        <a href="#"><i  className="fab fa-facebook pr-3 iconfooter"></i></a>
                        <a href="#"><i className="fab fa-google pr-3 iconfooter"></i></a>
                        <a href="#"><i className="fab fa-instagram pr-3 iconfooter"></i></a>

                    </div>
                    </li>

                  </ul>
                </div>
                <div className="col-md-4 mb-md-0 mb-4">
                  <ul className="list-unstyled">
                    <li className="footerWord">
                      <h1 className="footerheader pb-3">Customer Services</h1>
                    </li>
                    <li className="footerWord pb-2">Payment methods</li>
                    <li className="footerWord pb-2">Money back guarantee</li>
                    <li className="footerWord pb-2">Shipping</li>
                    <li className="footerWord pb-2">List of Shop</li>
                    <li className="footerWord pb-2">Privacy policy</li>
                    <li className="footerWord pb-2">FAQ Information</li>
                  </ul>
                </div>
                <div className="col-md-4 mb-md-0 mb-4">
                  <ul className="list-unstyled">
                    <li className="footerWord">
                      <h1 className="footerheader pb-3">Categories</h1>
                    </li>
                    <li className="footerWord pb-2">Man’s Collection</li>
                    <li className="footerWord pb-2">women’s Collection</li>
                    <li className="footerWord pb-2">Kids Collection</li>
                    <li className="footerWord pb-2">Complete your look</li>
                    <li className="footerWord pb-2">Accessories</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5 mb-md-0 mb-4">
              <ul className="list-unstyled">
                <li className="footerWord">
                  <h1 className="footerheader pb-3">newsletter</h1>
                </li>
                <li className="footerWord pb-3">Accessories</li>
              <form action="#" className="subscribe-form">
                <div className="form-group d-flex">
                  <input type="text"  className="form-control rounded-left" placeholder="Enter email address"/>
                  <button type="submit" className="form-control submit rounded-right footerbutton">Subscribe</button>
                </div>
                <li>
                    <div  className="pt-4" >
                      <img src="picture\apple.svg" alt="Apple" className="logo mr-3"/>
                      <img src="picture\google.svg" alt="Google" className="logo"/>
                    </div>
                  </li>
              </form>
              </ul>
            </div>
          </div>
          <div className="row mt-5 pt-4 border-top">
            <div className="col-md-6 col-lg-6 mb-md-0 mb-4">
              <p className="copyright mb-0 footerWordlast ">© 2024 All Rights Reserved by Essential-Infotech</p>
            </div>
            <div className="col-md-6 col-lg-6 text-md-right ">
              <img src="picture\mastercard.png" alt="Google" className="footerlogo  mr-3 "/>
              <img src="picture\paypal.PNG" alt="Google" className="footerlogo mr-3"/>
              <img src="picture\visa.png" alt="Google" className="footerlogo mr-5"/>
            </div>
          </div>
        </div>
      </footer>
     );
}
 
export default Footer;