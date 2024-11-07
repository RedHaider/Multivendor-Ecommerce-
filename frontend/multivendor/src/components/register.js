import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import config from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    division: '',
    district: '',
    state: '',
    Thana: '',
    postal_code: '',
    gender: '',  // Add gender field
    photo: null, // Add photo field
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload for the profile photo
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData(); // Use FormData to handle file upload
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(`${config.API_BASE_URL}/customer_register/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('An error occurred, please try again');
      }
    }
  };

  return (
    <div>
      <div className="row no-gutters justify-content-center mb-2">
        <div className="col text-center">
          <div className="heading">
            <h1>Register</h1>
            <hr className="underline-hr" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="heading">
            <Link to="/login" className="mr-3 login-heading nav-link ">
              Login
            </Link>
          </div>
          <div className="heading">
          <Link to="/register" className=" register-heading-action nav-link">
            Register
          </Link>
          <hr className="underline-hr mx-auto" />
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />

          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />

          <label htmlFor="address">Address</label>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} />

          <label htmlFor="division">Division</label>
          <input type="text" name="division" placeholder="Division" onChange={handleChange} />

          <label htmlFor="district">District</label>
          <input type="text" name="district" placeholder="District" onChange={handleChange} />

          <label htmlFor="state">State</label>
          <input type="text" name="state" placeholder="State" onChange={handleChange} />

          <label htmlFor="Thana">Thana</label>
          <input type="text" name="Thana" placeholder="Thana" onChange={handleChange} />

          <label htmlFor="postal_code">Postal Code</label>
          <input type="text" name="postal_code" placeholder="Postal Code" onChange={handleChange} />

          {/* Gender dropdown */}
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select 
                name="gender" 
                onChange={handleChange} 
                value={formData.gender} 
                required 
                className="form-select"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ced4da" }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Profile Photo Field */}
            <div className="col-md-6">
              <label htmlFor="photo" className="form-label">Profile Photo</label>
              <input 
                type="file" 
                name="photo" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="form-control pb-5"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ced4da" }}
              />
            </div>
          </div>


          <button className='mt-3' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
