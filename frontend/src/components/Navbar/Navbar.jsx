import logo from '../../assets/brandlogo.png';
import search_icon from '../../assets/search_icon.png';
import basket_icon from '../../assets/basket_icon.png';
import bag_icon from '../../assets/bag_icon.png';
import logout_icon from '../../assets/logout_icon.png';
import profile_icon from '../../assets/profile_icon.png'
import { StoreContext } from '../../Context/StoreContext'; // adjust path if needed

import './Navbar.css'; 
import React, { useState ,useContext} from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// adjust path as needed


const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home");
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext);
    const navigate=useNavigate("/");

    const logout=()=>{
      localStorage.removeItem("token");
      setToken("")

    }
  return (
    <div className='navbar'>
      <Link to='/'><img src={logo} alt="" className="logo"/></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")}className={menu=="home"?"active":""} >home</Link>
        <a  href='#explore-menu' onClick={()=>setMenu("menu")}className={menu=="menu" ?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")}className={menu=="mobile-app" ?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")}className={menu=="contact-us" ?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={search_icon} alt=""/>
        <div className="navbar-search-icon">
           <Link to='/cart'> <img src={basket_icon} alt=""/></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>:<div className='navbar-profile'>
          <img src={profile_icon} alt=""/>
          <ul className="nav-profile-dropdown">
            <li><img src={bag_icon} alt=""/><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={logout_icon} alt=""/><p>Logout</p></li>
          </ul>
          </div>}
       
      </div>
    </div>
  );
};

export default Navbar;
