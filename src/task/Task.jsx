import React, { useState, useEffect } from 'react';
import './Task.css';
import AddTask from '../addTask/AddTask';
import axios from 'axios';
import { BaseURL } from '../BaseURL/BaseUrl';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';

const Task = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
  const {id} = useParams();

  // 🔁 Fetch tasks on mount only
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BaseURL}api/todo/alltask`, { withCredentials: true });
      setTasks(res.data);
    } catch (error) {
      console.log('Error fetching tasks:', error.message);
    }
  };

  const handleAddTaskButton = () => {
    setShowAddTask(true);
  };

  const handleDeleteTaskButton = async (id) => {
    try {
      const res = await axios.delete(`${BaseURL}api/todo/deletetask/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      fetchTasks(); // Refresh tasks after delete
    } catch (error) {
      console.log('Error while deleting task:', error.message);
      toast.error(error.response?.data?.error || "Failed to delete task");
    }
  };

  const handleCompletedTaskButton = async (id) => {
    try {

      const res = await axios.post(`${BaseURL}api/todo/completed-task/${id}`, {}, { withCredentials: true });
      toast.success(res.data.message);

    } catch (error) {
      console.log('Error while completed task:', error.message);
      toast.error(error.response?.data?.error || "Failed to complete task");
    }
  }

  return (
    <>
      {showAddTask ? (
        <AddTask
          onClose={() => setShowAddTask(false)}
          onTaskAdded={fetchTasks} // callback to refresh tasks after adding
        />
      ) : (
        <div className="taskContainer">
          {/* ✅ Case 1: No tasks at all */}
          {tasks.length === 0 ? (
            <p className="text-white fs-4">Create New Task..</p>
          ) : (
            <>
              {/* ✅ Case 2: No incomplete tasks */}
              {tasks.filter(task => !task.completed).length === 0 ? (
                <p className="text-white fs-4">All tasks are completed</p>
              ) : (
                /* ✅ Case 3: Display incomplete tasks */
                tasks
                  .filter(task => !task.completed)
                  .map(task => (
                    <div key={task._id} className="all-task">
                      <div className="todo-task">
                        <h3 className="taskname">{task.taskname}</h3>
                        <h3 className="taskdetails">{task.taskdetails}</h3>
                      </div>
                      <div className="icons">
                        <i
                          className="bi bi-check-lg"
                          onClick={() => handleCompletedTaskButton(task._id)}
                        ></i>
                        <i className="bi bi-pencil" onClick={()=> navigate(`/edit-task/${task._id}`)}></i>
                        <i
                          className="bi bi-trash3"
                          onClick={() => handleDeleteTaskButton(task._id)}
                        ></i>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      )}

      {/* ✅ Floating Add Task Button */}
      <div className="add-task">
        <button
          className="icon-button"
          onClick={handleAddTaskButton}
          aria-label="Add Task"
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </>
  );

};

export default Task;
