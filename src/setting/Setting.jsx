import React, { useEffect, useState } from 'react';
import './Setting.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BaseURL } from '../BaseURL/BaseUrl.js';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx'

const Setting = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [verifypassword, setVerifypassword] = useState('')
    const [passwordChange, setPasswordChange] = useState(false)

    const navigate = useNavigate()

    const handleUserInputs = () => {
        console.log('handle user inputs called')

        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegExp.test(email)) {
            toast.error("Invalid email")
            return false;
        }

        if (name.trim() === '') {
            toast.error("Username is mandatory");
            return false;
        }

        if (!passwordChange) return true;

        if (oldpassword.trim() === '' || newpassword.trim() === '' || verifypassword.trim() === '') {
            console.log('Please provide all the input fields')
            toast.error('Please provide all the input fields')
            return false;
        }

        if (oldpassword.length < 6 || newpassword.length < 6) {
            console.log('Password must have minimum 6 characters');
            toast.error('Password must have minimum 6 characters');
            return false;
        }

        if (oldpassword === newpassword) {
            console.log('please provide new password');
            toast.error('plese provide new password');
            return false;
        }

        if (newpassword !== verifypassword) {
            console.log('password does not match');
            toast.error('Password does not match');
            return false;
        }

        return true;

    }

    const handleSubmitButton = async () => {
        const isvalid = handleUserInputs();
        if (!isvalid) return;
        try {
            console.log('handle submit button is clicked');
            const res = await axios.post(`${BaseURL}api/todo/editprofile`, { email, name, oldpassword, newpassword }, { withCredentials: true })
            console.log(res.data);
            toast.success(res.data.message);
            setTimeout(() => {
                navigate('/')
            }, 1500)

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error)
            }
            console.log(error.message)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get(`${BaseURL}api/auth/getme`, { withCredentials: true });
                setEmail(res.data.email);
                setName(res.data.name);

            } catch (error) {
                console.log(`Error in fetching user: ${error.message}`)
            }
        }
        fetchUser()
    }, [])

    return (
        <>
            <Header />
            <div className='containers'>
                <h3>Edit Your Profile</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitButton();
                }}>
                    <label>Email:
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> </label>
                    <label>Name:
                        <input type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} /> </label>
                    <div className="password-checkbox">
                        <input type='checkbox' id='password' className='mx-1' checked={passwordChange} onChange={() => setPasswordChange(prev => !prev)} />
                        <label htmlFor='password'>Change password</label>
                    </div>

                    {passwordChange && (
                        <div className="change-password-template">
                            <label>Current Password:
                                <input type='password' placeholder='Current Password' className='my-2' value={oldpassword} onChange={(e) => setOldpassword(e.target.value)} /> </label>
                            <label>New Password:
                                <input type='password' placeholder='New Password' className='my-2' value={newpassword} onChange={(e) => setNewpassword(e.target.value)} /> </label>
                            <label>Verify Password:
                                <input type='password' placeholder='Verify Password' className='my-2' value={verifypassword} onChange={(e) => setVerifypassword(e.target.value)} /></label>
                        </div>
                    )}



                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type='submit'>Change</button>
                        <button type='button' onClick={() => navigate('/')}>Back</button>
                    </div>
                </form>
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
            <Footer />
        </>
    );
};

export default Setting;
