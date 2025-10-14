import React from 'react';
import Header from './header/Header.jsx';
import Task from './task/Task.jsx';
import Footer from './footer/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Must import CSS

const App = () => {
  return (
    <>
      <Header />
      <Task />
      <Footer />

      {/* Global Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
};

export default App;
