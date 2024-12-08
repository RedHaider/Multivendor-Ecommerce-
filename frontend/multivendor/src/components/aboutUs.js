import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';


const AboutUs = () => {
  const [dropdowns, setDropdowns] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [mvItems, setMvItems] = useState([]);

  useEffect(() => {
    // Fetch dropdown data
    axios.get(`${config.API_BASE_URL}/content-management/api/aboutus-dropdown/`)
        .then(response => {
            setDropdowns(response.data);
        })
        .catch(error => {
            console.error('Error fetching dropdowns:', error);
        });

    // Fetch team data
    axios.get(`${config.API_BASE_URL}/content-management/api/aboutus-ourteam/`)
        .then(response => {
            setTeamMembers(response.data);
        })
        .catch(error => {
            console.error('Error fetching team:', error);
        });

    // Fetch mv data
    axios.get(`${config.API_BASE_URL}/content-management/api/aboutus-mv/`)
        .then(response => {
            setMvItems(response.data);
        })
        .catch(error => {
            console.error('Error fetching MV items:', error);
        });
}, []);  // Empty array ensures this runs once on component mount


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
        {/* Loop through dropdown items */}
        {dropdowns.map((dropdown, index) => (
          <div key={index}>
            <h5 className="d-flex justify-content-between">
              <span className="shoptogglerH font-weight-bold">{dropdown.title}</span>
              <button 
                className="btn btn-link p-0" 
                data-toggle="collapse" 
                data-target={`#categories-list-${index + 1}`} 
                aria-expanded="true" 
                aria-controls={`categories-list-${index + 1}`}
                id={`toggle-button-${index + 1}`}
              >
                <i className="fa fa-chevron-down rotate-icon" id={`icon-${index + 1}`}></i>
              </button>
            </h5>

            <div id={`categories-list-${index + 1}`} className="collapse show">
              <ul className="category-list list-unstyled">
                <p className="aboutusCtext">{dropdown.content}</p>
              </ul>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="col-lg-6 d-flex justify-content-center align-items-center">
        <div className="image-container position-relative">
          <img src="picture/aboutus.jfif" className="background-image-aboutus img-fluid" alt="Background Image" />
          <div className="vertical-bar position-absolute" style={{ left: "0;" }}></div>
          <div className="vertical-bar position-absolute" style={{ left: "25%;" }}></div>
          <div className="vertical-bar position-absolute" style={{ left: "50%;" }}></div>
          <div className="vertical-bar position-absolute" style={{ left: "75%;" }}></div>
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
            {teamMembers.map((member) => (
                <div key={member.id} className="card border-1 p-2 container m-2" style={{ width: "18rem" }}>
                    <img className="card-img-top meetoutteamimg" src={`${config.API_BASE_URL}${member.image}`} alt={member.name} />
                    <div className="card-body">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p className="card-text text-center meetoutteamh">{member.name}</p>
                            <p className="font-weight-bold text-center meetoutteamt">{member.designation}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>

        {/* shop 4 */}
        <div className="container mt-5 mb-5">
            <div className="row">
                {mvItems.map((item, index) => (
                    <div className="col-md-6" key={index}>
                        <h1 className="OVMh">{item.title}</h1>
                        <p className="OVMt">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>

        </div>
     );
}
 
export default AboutUs;