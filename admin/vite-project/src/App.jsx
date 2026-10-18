import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Add from './Pages/Add/Add';
import List from './Pages/List/List';
import Orders from './Pages/Orders/Orders';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const url="http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        
        {/* This is where the pages like Add, List, Orders will be shown */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
