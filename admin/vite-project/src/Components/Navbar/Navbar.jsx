import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className="logo" src={assets.Admin_logo} alt="Admin Panel Logo" />
      <img  className="profile"src={assets.pro_pic} alt="" />
    </div>
  );
};

export default Navbar;
