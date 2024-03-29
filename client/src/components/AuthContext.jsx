import React, { createContext, useContext, useState, useEffect } from 'react';
import {decodeToken,getUserIdFromToken} from "../utils/JWTutils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // אם קיים טוקן, אתה יכול להניח שהמשתמש מחובר
            // ולעדכן את ה-state בהתאם. כדאי לבדוק גם את תוקפו של הטוקן אם אפשר
            const userInfo = decodeToken(token);
            setUser(userInfo);
        }
    }, []);

    // פונקציה לטעינת נתוני המשתמש לאחר התחברות
    const login = (token) => {
        console.log(token)
        const userInfo = decodeToken(token);
        console.log(userInfo)
        setUser(userInfo);
        localStorage.setItem('token', token);
    };

    // פונקציה לניקוי נתוני המשתמש בהתנתקות
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
