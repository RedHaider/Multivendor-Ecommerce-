const ContactUs = () => {
    return ( 
        <div>
    <div class="contactusbackground-container">
        <div class="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h2 class="shopeoneH">Home &gt; Contact Us</h2>
        </div>
      </div>
    <div class="container mb-5 mt-5">
        <div class="row">
            <div class="col-md-6">
                <h1 class="contactush">Stay in touch</h1>
                <p class="contactust">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus.</p>
                <form>
                    <div class="form-group">
                      <input type="text" class="form-control" id="exampleInputName"  placeholder="Your Name"/>
                    </div>
                    <div class="form-group">
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>
                    <button type="submit" class="btn btn-primary contactusbtn">Send message</button>
                  </form>
            </div>
            <div class="col-md-6">
                <h1 class="contactush">Contact Info</h1>
                <div class="row mt-3">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        <div class="contactusicon">
                            <i class="fas fa-phone"></i>
                        </div>
                    </div>
                    <div class="col-8">
                        <h1 class="contactinfoh">Phone</h1>
                        <p class="contactinfon">+880 1810150561</p>
                    </div>
                </div>
                <div class="row  mt-3">
                    <div class="col-1 d-flex justify-content-center align-items-center">
                        <div class="contactusicon">
                            <i class="fas fa-envelope"></i>
                        </div>
                    </div>
                    <div class="col-8">
                        <h1 class="contactinfoh">Phone</h1>
                        <p class="contactinfon">+880 1810150561</p>
                    </div>
                </div>
                <div class="row  mt-3">
                    <div class="col-1 d-flex justify-content-center align-items-center ">
                        <div class="contactusicon">
                          <i class="fas fa-map-marker-alt"></i>
                        </div>
                      </div>
                    <div class="col-11 m-">
                        <h1 class="contactinfoh">Phone</h1>
                        <p class="contactinfon">+880 1810150561</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
   <div class="container mt-5 mb-5">
    <div class="row mb-4">
      <div class="col-1 d-flex justify-content-center align-items-center">
        <div class="contactusicon">
          <i class="fas fa-map-marker-alt"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.5362354063022!2d90.3885287759601!3d23.870596584150157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d8d8cbae23%3A0xb9d070d503afe8a0!2sESSENTIAL%20-%20INFOTECH!5e0!3m2!1sen!2sbd!4v1720729989071!5m2!1sen!2sbd" width="600" height="450" style={{border:"0;"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    </div>
        </div>
     );
}
 
export default ContactUs;