const ContactUs = () => {
    return ( 
    <div>
        <div className="row  no-gutters justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>Contact Us</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>
    <div className="container mb-5 mt-5">
        <div className="row">
            <div className="col-md-6">
                <h1 className="contactush">Stay in touch</h1>
                <p className="contactust">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus.</p>
                <form>
                    <div className="form-group">
                      <input type="text" className="form-control" id="exampleInputName"  placeholder="Your Name"/>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>
                    <button type="submit" className="btn btn-primary contactusbtn">Send message</button>
                  </form>
            </div>
            <div className="col-md-6">
                <h1 className="contactush">Contact Info</h1>
                <div className="row mt-3">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <div className="contactusicon">
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <div className="col-8">
                        <h1 className="contactinfoh">Phone</h1>
                        <p className="contactinfon">+880 1810150561</p>
                    </div>
                </div>
                <div className="row  mt-3">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <div className="contactusicon">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <div className="col-8">
                        <h1 className="contactinfoh">Phone</h1>
                        <p className="contactinfon">+880 1810150561</p>
                    </div>
                </div>
                <div className="row  mt-3">
                    <div className="col-1 d-flex justify-content-center align-items-center ">
                        <div className="contactusicon">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                      </div>
                    <div className="col-11 m-">
                        <h1 className="contactinfoh">Phone</h1>
                        <p className="contactinfon">+880 1810150561</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
   <div className="container mt-5 mb-5">
    <div className="row mb-4">
      <div className="col-1 d-flex justify-content-center align-items-center">
        <div className="contactusicon">
          <i className="fas fa-map-marker-alt"></i>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.5362354063022!2d90.3885287759601!3d23.870596584150157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d8d8cbae23%3A0xb9d070d503afe8a0!2sESSENTIAL%20-%20INFOTECH!5e0!3m2!1sen!2sbd!4v1720729989071!5m2!1sen!2sbd" width="600" height="450" style={{border:"0;"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    </div>
    <div>
    <div class="container mt-5 pb-5">
      <h1 class="pricing-two-header pb-3 text-center">FAQs</h1>

      <div class="pricing-three-card pr-5 pl-5">
        <div id="accordion" class="custom-accordion">
          <div class="card">
            <div class="card-header " id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link pricing-two-button" style={{color: "#000062;"}} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                What types of products do you offer?
                </button>
              </h5>
            </div>
        
            <div id="collapseOne" class="collapse show text-left " aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body p-5">
                We do! There are two ways:
                <ol>
                  <li>Purchase the biggest package of Path credits.</li>
                  <li>If you have tons of product photos you need edited all the time, you can get photo-editing services at a reduced rate.</li>
                </ol>
                Use the contact page to get in touch and let us know more details about your needs.
              </div>
            </div>
          </div>
        
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed pricing-two-button" style={{color: "#000062;"}} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Is there a free trial?
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse text-left" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body p-5">
                Yes! We offer a free trial so you can test our service before making a commitment. Contact us to learn more.
              </div>
            </div>
          </div>
        
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed pricing-two-button" style={{color: "#000062;"}} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  How do I request a quote?
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse text-left" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body p-5">
                To request a quote, please visit our pricing page and fill out the form with details about your project.
              </div>
            </div>
          </div>
        
          <div class="card">
            <div class="card-header" id="headingFour">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed pricing-two-button" style={{color: "#000062;"}} data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  How does turnaround time affect the price of my order?
                </button>
              </h5>
            </div>
            <div id="collapseFour" class="collapse text-left" aria-labelledby="headingFour" data-parent="#accordion">
              <div class="card-body p-5">
                The turnaround time can affect the price of your order. Faster delivery times may incur additional charges.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
        </div>
     );
}
 
export default ContactUs;