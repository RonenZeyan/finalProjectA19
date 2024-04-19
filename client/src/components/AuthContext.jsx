import React, { createContext, useContext, useState, useEffect } from 'react';
import {decodeToken,getUserIdFromToken} from "../utils/JWTutils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // the token we save in localstorage and this will help us to know that the user is loggedin 
            //we also can decode it and show the data (the decoding method is implemented in jwtUtils file )
            const userInfo = decodeToken(token);
            setUser(userInfo);
        }
    }, []);

    // when user do a login then we save the decoding of the token in use state (use state here is global that can be imported in any component) and show the data about the user 
    const login = (token) => {
        console.log(token)
        const userInfo = decodeToken(token);
        console.log(userInfo)
        setUser(userInfo);
        localStorage.setItem('token', token);
    };

    // when user logout then we remove all data about user from the localstorage 
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
