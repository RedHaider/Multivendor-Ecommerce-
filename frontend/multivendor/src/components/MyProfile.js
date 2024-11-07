import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../utils/authContext';
import config from '../config';

const MyProfile = () => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);// Get the current user details from context
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        birthday: '',
        gender: '',
        profilePicture: ''
    });

    const [error, setError] = useState('');

    // Fetch profile data when component mounts
    useEffect(() => {
        if (isLoggedIn) {
            fetchProfileData();
        } else {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/user/details/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setProfile({
                customerID: response.data.customer_profile.customerID,
                email: response.data.email,
                phone: response.data.phone,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                birthday: response.data.created_at,
                gender: response.data.customer_profile.gender,
                division: response.data.customer_profile.division,
                district: response.data.customer_profile.district,
                state: response.data.customer_profile.state,
                Thana: response.data.customer_profile.Thana,
                postal_code: response.data.customer_profile.postal_code,
                address: response.data.customer_profile.address,
                profilePicture: response.data.photo || 'https://via.placeholder.com/100' // Default image if none
            });
        } catch (err) {
            setError('Failed to load profile data');
            console.error(err);
        }
    };

    const handleEditProfile = () => {
        navigate('/edit-profile'); // Assuming there's an edit profile route
    };

    const handleChangePassword = () => {
        navigate('/change-password'); // Assuming there's a change password route
    };
    const handleLogout = () => {
      logout();
      setTimeout(() => {
          navigate('/login');
      }, 100);
  };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center mb-2">
                <div className="col text-center">
                    <div className="heading">
                        <h1>My Profile</h1>
                        <hr className="underline-hr"/>
                    </div>
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="row">
              <div className="col-md-3 justify-content-center">
                <div className="card" style={{ width: "18rem", backgroundColor: "#f8f9fa" }}>
                  <div className="card-body">
                    <Link to="/myprofile" className="card-text mb-3 text-dark text-decoration-none d-block">My Profile</Link>
                    <Link to="/orderlist" className="card-text mb-3 text-dark text-decoration-none d-block">Orders</Link>
                    <Link to="/Address" className="card-text mb-3 text-dark text-decoration-none d-block">Address</Link>
                    <Link to="/whishlist" className="card-text mb-3 text-dark text-decoration-none d-block">Wishlist</Link>
                    <Link to="/logout" onClick={handleLogout} className="card-text text-danger text-decoration-none d-block">Sign out</Link>
                  </div>
                </div>
              </div>

                <div className="col-md-9">
                    <div className="row mb-4">
                        <div className="col-md-6" >
                            <div className="text-center mb-4">
                                <img
                                    src={`${config.API_BASE_URL}${profile.profilePicture}`}
                                    alt="Profile"
                                    className="img-fluid rounded-circle mb-2"
                                    style={{ width: '200px', height: '200px' }}
                                />
                                
                                <p><strong>Full Name:</strong> {profile.firstName} {profile.lastName}</p>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ textAlign: "left" }}>
                          <p><strong>Email Address:</strong> {profile.email}</p>
                          <p><strong>Customer ID:</strong> {profile.customerID}</p>
                          <p><strong>Phone Number:</strong> {profile.phone}</p>
                          <p><strong>Full Name:</strong> {profile.firstName} {profile.lastName}</p>
                          <p>
                            <strong>Profile Created:</strong> {new Date(profile.birthday).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            }) || 'N/A'}
                          </p>
                          <p><strong>Gender:</strong> {profile.gender || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <button className="btn btn-warning w-100 mb-3" onClick={handleEditProfile}>Edit Profile</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-warning w-100" onClick={handleChangePassword}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
