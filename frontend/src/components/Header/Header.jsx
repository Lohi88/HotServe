import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
    <div className="header-contents">
        <h2>
            Order your favourite food here
        </h2>
        <p>Explore a wide selection of mouth-watering meals from our diverse menu</p>
        <button>View Menu</button>
    </div>
    </div>
  );
};

export default Header;
