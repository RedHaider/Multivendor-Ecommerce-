const AboutUs = () => {
    return ( 
        <div>
            {/* shop 1 */}
            <div className="row  no-gutters justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>About Us</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
           </div>
                  {/* shop 2 */}
                  <div className="container mb-5">
          
           <div className="row">
              <div className="col-lg-6">

                <h5 className="d-flex justify-content-between">
                  <span className="shoptogglerH font-weight-bold">One-Step Solution</span>
                  <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-1" aria-expanded="true" aria-controls="categories-list-1" id="toggle-button-1">
                    <i className="fa fa-chevron-down rotate-icon" id="icon-1"></i>
                </button>
                
              </h5>
              <div id="categories-list-1" className="collapse show">
                  <ul className="category-list list-unstyled">
                      <p className="aboutusCtext">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                          sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                      </p>
                  </ul>
              </div>
              <hr/>
              
              <h5 className="d-flex justify-content-between">
                  <span className="shoptogglerH font-weight-bold">Customer your own unique design</span>
                  <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-2" aria-expanded="true" aria-controls="categories-list-2" id="toggle-button-2">
                      <i className="fa fa-chevron-down rotate-icon" id="icon-2"></i>
                  </button>
              </h5>
              <div id="categories-list-2" className="collapse ">
                  <ul className="category-list list-unstyled">
                      <p className="aboutusCtext">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                          sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                      </p>
                  </ul>
              </div>
              <hr/>
              <h5 className="d-flex justify-content-between">
                <span className="shoptogglerH font-weight-bold">Customer your own unique design</span>
                <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-3" aria-expanded="true" aria-controls="categories-list-3" id="toggle-button-3">
                    <i className="fa fa-chevron-down rotate-icon" id="icon-3"></i>
                </button>
            </h5>
            <div id="categories-list-3" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div>
            <hr/>
          <h5 className="d-flex justify-content-between">
            <span className="shoptogglerH font-weight-bold">Customer your own unique design</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-4" aria-expanded="true" aria-controls="categories-list-4" id="toggle-button-4">
                <i className="fa fa-chevron-down rotate-icon" id="icon-4"></i>
            </button>
        </h5>
        <div id="categories-list-4" className="collapse ">
            <ul className="category-list list-unstyled">
                <p className="aboutusCtext">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                    sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                </p>
            </ul>
        </div>       
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <div className="image-container position-relative">
                  <img src="picture/aboutus.jfif" className="background-image-aboutus img-fluid" alt="Background Image"/>
                  <div className="vertical-bar position-absolute" style={{left: "0;"}}></div>
                  <div className="vertical-bar position-absolute" style={{left: "25%;"}}></div>
                  <div className="vertical-bar position-absolute" style={{left: "50%;"}}></div>
                  <div className="vertical-bar position-absolute" style={{left: "75%;"}}></div>
                </div>
              </div>
              

           </div>

         </div >

                {/* shop 3 */}
     <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col text-center">
          <div className="heading">
            <h1>Meet Our Team</h1>
            <hr className="underline-hr"/>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card border-1 p-2 containar m-2" style={{width:"18rem"}}>
          <img className="card-img-top meetoutteamimg" src="picture\Stylish-leather-jacket.png" alt="Card image cap"/>
          <div className="card-body">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="card-text text-center meetoutteamh">Stylish Leather Jacket</p>
              <p className="font-weight-bold text-center meetoutteamt">Founder & CEO</p>
            </div>
          </div>
        </div>

        <div className="card border-0 p-2 containar m-2" style={{width:"18rem"}}>
          <img className="card-img-top meetoutteamimg" src="picture\Stylish-leather-jacket.png" alt="Card image cap"/>
          <div className="card-body">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="card-text text-center meetoutteamh">Stylish Leather Jacket</p>
              <p className="font-weight-bold text-center meetoutteamt">Founder & CEO</p>
            </div>
          </div>
        </div>

        <div className="card border-0 p-2 containar m-2" style={{width:"18rem"}}>
          <img className="card-img-top meetoutteamimg" src="picture\Stylish-leather-jacket.png" alt="Card image cap"/>
          <div className="card-body">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="card-text text-center meetoutteamh">Stylish Leather Jacket</p>
              <p className="font-weight-bold text-center meetoutteamt">Founder & CEO</p>
            </div>
          </div>
        </div>

        <div className="card border-0 p-2 containar m-2" style={{width:"18rem"}}>
          <img className="card-img-top meetoutteamimg" src="picture\Stylish-leather-jacket.png" alt="Card image cap"/>
          <div className="card-body">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <p className="card-text text-center meetoutteamh">Stylish Leather Jacket</p>
              <p className="font-weight-bold text-center meetoutteamt">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* shop 4 */}
        <div className="container mt-5 mb-5">
           <div className="row">
            <div className="col-md-6">
              <h1 className="OVMh">Our Mission</h1>
              <p className="OVMt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.</p>
            </div>
            <div className="col-md-6">
            <h1 className="OVMh">Our Vision</h1>
            <p className="OVMt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.</p>
          </div>
           </div>
        </div> 

        </div>
     );
}
 
export default AboutUs;