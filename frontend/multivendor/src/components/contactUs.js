import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; 



const ContactUs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    description:''
  }); 

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post(`${config.API_BASE_URL}/content-management/api/contactus-form/`, formData)
      .then(response => {
          setSuccessMessage("Your message has been sent successfully!");
          setError(null); 
          setFormData({
              name: '',
              email: '',
              description: ''
          });
      })
      .catch(error => {
          setError("There was an error submitting the form. Please try again.");
          setSuccessMessage('');
      });
};

      // Fetch FAQ data from the API on component mount
      useEffect(() => {
        axios.get(`${config.API_BASE_URL}/content-management/api/contactus-faq/`)
            .then(response => {
                setFaqs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching FAQ data.");
                setLoading(false);
            });
    }, []); // Empty dependency array means it runs only once when the component mounts
  
    if (loading) {
        return <div>Loading FAQs...</div>;
    }
  
    if (error) {
        return <div>{error}</div>;
    }

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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input                         
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"/>
                    </div>
                    <div className="form-group">
                      <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange} 
                      placeholder="Your Email"
                      />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea                         
                        id="description"
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                         ></textarea>
                      </div>
                    <button type="submit" className="btn btn-primary contactusbtn">Send message</button>
                  </form>
                  {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
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
    <div className="container mt-5 pb-5">
            <h1 className="pricing-two-header pb-3 text-center">FAQs</h1>

            <div className="pricing-three-card pr-5 pl-5">
                <div id="accordion" className="custom-accordion">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="card">
                            <div className="card-header" id={`heading${index + 1}`}>
                                <h5 className="mb-0">
                                    <button
                                        className={`btn btn-link ${index === 0 ? '' : 'collapsed'} pricing-two-button`}
                                        style={{ color: "#000062;" }}
                                        data-toggle="collapse"
                                        data-target={`#collapse${index + 1}`}
                                        aria-expanded={index === 0 ? "true" : "false"}
                                        aria-controls={`collapse${index + 1}`}
                                    >
                                        {faq.title}
                                    </button>
                                </h5>
                            </div>
                            <div
                                id={`collapse${index + 1}`}
                                className={`collapse ${index === 0 ? 'show' : ''} text-left`}
                                aria-labelledby={`heading${index + 1}`}
                                data-parent="#accordion"
                            >
                                <div className="card-body p-5">
                                    {faq.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
        </div>
     );
}
 
export default ContactUs;