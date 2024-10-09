import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './authContext';

const Logout = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        // Add a small delay to ensure state update
        setTimeout(() => {
            navigate('/login');
        }, 100); 
    };

    console.log('Is Logged In:', isLoggedIn); // Debug log to check state

    return (
        <div>
            {isLoggedIn ? (
                <button 
                    type="button" 
                    onClick={handleLogout} 
                    className="btn btn-outline-light mt-2 mb-2">
                        Logout
                </button>
            ) : (
                <div>
                    <Link to="/login" className="btn btn-outline-light mt-2 mb-2 mr-2">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-outline-light mt-2 mb-2">
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Logout;
