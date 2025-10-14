import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { BaseURL } from '../../BaseURL/BaseUrl.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleInputs = () => {
        if (!loginDetails.email || !loginDetails.password) {
            // setError('Both Email and Password are required');
            toast.error('Both Email and Password are required')
            return false
        }
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!emailRegExp.test(loginDetails.email)) {
            toast.error("Invalid Email..")
            return false
        }

        setError('');
        return true

    }
    const handleLoginButton = async () => {
        const isvalid = handleInputs();
        if (!isvalid) return

        try {
            const res = await axios.post(`${BaseURL}api/auth/login`, {
                email: loginDetails.email,
                password: loginDetails.password
            }, { withCredentials: true });
            toast.success("Login Successfully!..");
            setLoginDetails({
                email: '',
                password: ''
            });
            setTimeout(() => {
                navigate('/')
            }, 1500);


        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error)
            }
            else {
                console.log(error.message)
            }

        }
    }

    return (
        <div className='login'>
            <div className="login-container">
                <h1 className="heading">Welcome to Todo..</h1>
                <form>
                    <input type='email' placeholder='Email'
                        value={loginDetails.email}
                        onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                    />
                    <input type='password' placeholder='Password'
                        value={loginDetails.password}
                        onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
                    />
                    <button type='button' onClick={handleLoginButton}>Login</button>
                    <p className='error'>{error}</p>
                </form>
                <Link to='/signup'>SignUp</Link>
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    )
}

export default Login