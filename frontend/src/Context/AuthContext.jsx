
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('token') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
    const navigate = useNavigate();

    const login = (token) => {
        setToken(token);
        Cookies.set('token', token, { expires: 7 }); 
        setIsAuthenticated(true);
        navigate('/details');  
    };

    const logout = () => {
        Cookies.remove('token');  
        setToken('');
        setIsAuthenticated(false);
        navigate('/');  
    };

    useEffect(() => {
        if (Cookies.get('token')) {
            setIsAuthenticated(true);
            setToken(Cookies.get('token'));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

