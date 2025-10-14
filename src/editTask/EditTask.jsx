import React, { useEffect, useState } from 'react'
import './EditTask.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BaseURL } from '../BaseURL/BaseUrl'
import { toast, ToastContainer } from 'react-toastify';

const EditTask = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [taskname, setTaskname] = useState('');
    const [taskdetails, setTaskdetails] = useState('');

    const fetchTask = async () => {
        try {
            const res = await axios.get(`${BaseURL}api/todo/task/${id}`, { withCredentials: true });
            setTaskname(res.data.taskname);
            setTaskdetails(res.data.taskdetails);
        } catch (error) {
            console.log(`Error occured in fetch task: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchTask();
    }, [])

    const handleEditTaskButton = async (id) => {
        try {
            console.log(' edit button is clicked');
            const res = await axios.put(`${BaseURL}api/todo/edit-task/${id}`, { taskname, taskdetails }, { withCredentials: true });
            toast.success(res.data.message);
            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Header />
            <div className="edit-task-container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleEditTaskButton(id);
                }}>
                    <input type="text" value={taskname} onChange={(e) => setTaskname(e.target.value)} />
                    <input type="text" value={taskdetails} onChange={(e) => setTaskdetails(e.target.value)} placeholder='Enter the task details' />
                    <button type='submit'>Edit</button>
                    <button type='button' onClick={() => navigate('/')}>Back</button>
                </form>
            </div>
            <Footer />
            <ToastContainer position='top-center' autoClose={1000} />
        </>
    )
}

export default EditTask