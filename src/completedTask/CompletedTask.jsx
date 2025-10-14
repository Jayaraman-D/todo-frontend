import React, { useEffect, useState } from 'react'
import './CompletedTask.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import axios from 'axios'
import { BaseURL } from '../BaseURL/BaseUrl'
import { ToastContainer, toast } from 'react-toastify';

const CompletedTask = () => {

    const [completedTask, setCompletedTask] = useState([]);

    useEffect(() => {
        fetchTask()
    }, []);

    const fetchTask = async () => {
        try {
            const res = await axios.get(`${BaseURL}api/todo/alltask`, { withCredentials: true });
            setCompletedTask(res.data);
        }
        catch (error) {
            console.log(`Error fetching tasks: ${error.message}`);
        }

    }

    const handleDeleteTaskButton = async (id) => {
        try {
            const res = await axios.delete(`${BaseURL}api/todo/deletetask/${id}`, { withCredentials: true });
            toast.success(res.data.message);
            fetchTask(); // Refresh tasks after delete
        } catch (error) {
            console.log('Error while deleting task:', error.message);
            toast.error(error.response?.data?.error || "Failed to delete task");
        }
    };

    return (
        <>
            <Header />

            <div className="completed-task-container">
                {completedTask.length === 0 ? (
                    <p className="text-white fs-4">Create the task to complete..</p>
                ) : completedTask.filter(task => task.completed).length === 0 ? (
                    <p className="text-white fs-4">Complete the task and come</p>
                ) : (
                    completedTask
                        .filter(task => task.completed === true)
                        .map(task => (
                            <div key={task._id} className="completed-task">
                                <div className="task">
                                    <h3 className="taskname">{task.taskname}</h3>
                                    <h3 className="taskdetails">{task.taskdetails}</h3>
                                </div>
                                <div className="deleted">
                                    <button className="delete-btn" onClick={() => handleDeleteTaskButton(task._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                )}
            </div>

            <Footer />

            <ToastContainer position='top-center' autoClose={1000} theme='dark' />
        </>
    );

}

export default CompletedTask