import React, { useEffect, useState } from 'react'
import './Header.css'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { BaseURL } from '../BaseURL/BaseUrl';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const [username, setUsername] = useState('');

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {

            const res = await axios.get(`${BaseURL}api/auth/logout`, { withCredentials: true })
            toast.success(res.data.message);

            setTimeout(() => {
                navigate('/login')
            }, 1500)

        } catch (error) {
            console.log("Logout error:", error.message);
            toast.error("Something went wrong while logging out");
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get(`${BaseURL}api/auth/getme`, { withCredentials: true })
                // console.log(res.data)
                setUsername(res.data.name)

            } catch (error) {
                console.log(`Error fetching user: ${error.message}`)
                toast.error('Failed to load user info')
            }
        }

        fetchUser()
    }, [])
    const gotoSetting = () => {
        navigate('/setting')
    }

    return (
        <>

            <div className='header'>
                <div className="user-name">  {username}
                    <i className="bi bi-box-arrow-right ms-2 cursor-pointer" onClick={handleLogout}></i>
                </div>
                <div className="app-name">Todo</div>
                <div className="setting">
                    <i className="bi bi-gear cursor-pointer" onClick={gotoSetting} ></i>
                </div>

            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    )
}

export default Header