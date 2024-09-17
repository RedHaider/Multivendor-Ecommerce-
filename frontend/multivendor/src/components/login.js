import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        email,
        password,
      });
  
      const { access, refresh, role, user_id } = response.data;
  
      // Store tokens and user info in localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', user_id);
  
      // Redirect based on role
      if (role === 'admin') {
        window.location.href = 'http://127.0.0.1:8000/api/accounts/admin/dashboard/'; // Django-based
      } else if (role === 'vendor') {
        window.location.href = 'http://127.0.0.1:8000/api/accounts/vendor/dashboard/'; // Django-based
      } else if (role === 'customer') {
        navigate('/'); // React-based home page
      } else {
        navigate('/home'); // Default home page
      }
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };
  
  return (
    <div>
      <div className="loginbackground-container mb-5">
        <div className="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
          <h2 className="shopeoneH"> Home &gt; Register / Login</h2>
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
      <form className="registration-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label htmlFor="email">Email *</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
