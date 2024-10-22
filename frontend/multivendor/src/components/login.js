import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/authContext'; // Import your AuthContext
import config from '../config'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get the login function from AuthContext
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${config.API_BASE_URL}/customer_login/`, formData);
      const { access, refresh, role, user_id } = response.data;

      // Use the login function from AuthContext to set the access token
      login(access);

      // Store tokens and user information in localStorage
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', user_id);

      // Redirect based on role
      if (role === 'customer') {
        navigate('/'); // Redirect to homepage for customers
      } else {
        navigate('/home'); // Redirect to home for other roles
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Invalid credentials or server error');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }    
  };
  
  return (
    <div>
        <div className="row justify-content-center mb-2">
                <div className="col text-center">
                <div className="heading">
                    <h1>Login</h1>
                    <hr className="underline-hr"/>
                </div>
                </div>
        </div>

      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="heading">
            <Link to="/login" className="mr-3 register-heading-action nav-link">
              Login
            </Link>
            <hr className="underline-hr mx-auto" />
          </div>
          <Link to="/register" className="login-heading nav-link">
            Register
          </Link>
        </div>
      </div>

      <div className="container mb-5">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            value={formData.email}  
            required 
          />

          <label htmlFor="password">Password *</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            value={formData.password}  
            required 
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
