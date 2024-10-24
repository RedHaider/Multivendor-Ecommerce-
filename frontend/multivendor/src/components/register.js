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
    postal_code: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${config.API_BASE_URL}/customer_register/`, formData);
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
      <div className="row  no-gutters justify-content-center mb-2">
        <div className="col text-center">
          <div className="heading">
            <h1>Register</h1>
            <hr className="underline-hr" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center text-center">
          <Link to="/login" className="mr-3 login-heading nav-link">
            Login
          </Link>
          <div className="heading">
            <Link to="/register" className="register-heading-action nav-link">
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

          {/* New fields */}
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

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
