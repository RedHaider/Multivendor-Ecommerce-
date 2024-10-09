import React, {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('accessToken') !== null);
        };

        // Listen for changes to localStorage (login/logout across multiple tabs)
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        console.log('Logging out...');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
