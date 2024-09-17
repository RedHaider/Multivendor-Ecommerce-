import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
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
        <form className="registration-form">
          <h2>Register</h2>
          <label htmlFor="username">Username *</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="contact">Phone number or Email *</label>
          <input type="text" id="contact" name="contact" required />

          <label htmlFor="password">Password *</label>
          <input type="password" id="password" name="password" required />

          <label>
            <input type="checkbox" id="privacy" name="privacy" required />
            I agree to the <a href="#">privacy policy</a>
          </label>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
