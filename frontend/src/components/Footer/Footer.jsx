import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

import brandlogo from '../../assets/brandlogo.png';
import facebook_icon from '../../assets/icons8-facebook.svg';
import twitter_icon from '../../assets/icons8-x.svg';
import linkedin_icon from '../../assets/icons8-linkedin.svg';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className="footer-content-left">
          <img src={brandlogo} alt="Logo" className="footer-logo" style={{ width: '200px', height: 'auto' }} />
           <div className="footer-social-icons">
            <img src={facebook_icon} alt="Facebook" className='icons' />
            <img src={twitter_icon} alt="Twitter" className='icons'/>
            <img src={linkedin_icon} alt="LinkedIn" className='icons' />
          </div>

         
        </div>
        
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="tel:9391981063">91+9391981063</a></li>
            <li><a href="mailto:contact@HotServe.com">contact@HotServe.com</a></li>
          </ul>
        </div>
      </div>
      <hr/>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p> Copyright © 2025 HotServe. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
