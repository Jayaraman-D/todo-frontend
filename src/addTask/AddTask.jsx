import React, { useState } from 'react';
import './AddTask.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BaseURL } from '../BaseURL/BaseUrl';

const AddTask = ({ onClose, onTaskAdded }) => {
  const [taskname, setTaskname] = useState('');
  const [taskdetails, setTaskDetails] = useState('');

  const handleUserInputs = () => {
    if (taskname.trim() === '') {
      toast.error("Task name is mandatory");
      return false;
    }
    return true;
  };

  const handleAddTaskButton = async () => {
    const isValid = handleUserInputs();
    if (!isValid) return;

    try {
      const res = await axios.post(
        `${BaseURL}api/todo/addtask`,
        { taskname, taskdetails },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // Refresh the task list in parent
      if (onTaskAdded) onTaskAdded();

      // Close the AddTask modal
      onClose();

    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        console.log(error.message);
        toast.error("Failed to add task");
      }
    }
  };

  return (
    <div className='addTask'>
      <div className="add-task-container">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddTaskButton();
        }}>
          <input
            type='text'
            placeholder='Enter the task name'
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
          />

          <input
            type='text'
            placeholder='Enter the task details'
            value={taskdetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />

          <div className="buttons">
            <button type='submit' className= 'mx-3'>Add Task</button>
            <button type='button' onClick={onClose}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
