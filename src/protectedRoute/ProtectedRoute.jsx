import React from 'react'
import jsCookie from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { BaseURL } from '../BaseURL/BaseUrl.js';
import './protectedRoute.css'

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {

        const verifyUser = async () => {
            try {

                const res = await axios.get(`${BaseURL}api/auth/verify`, { withCredentials: true });
                if (res.status === 200) {
                    setIsAuthenticated(true);
                }
                else {
                    setIsAuthenticated(false)
                }

            } catch (error) {
                console.log(error.message);
                setIsAuthenticated(false);
            }
        }

        verifyUser();

    }, [])

    if (isAuthenticated === null) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Verifying your session...</p>
            </div>
        );
    }


    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    return (
        <div className="fade-in">
            {children}
        </div>
    );

};

export default ProtectedRoute 