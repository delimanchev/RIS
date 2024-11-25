import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HeaderComponent.css';

const HeaderComponent = () => {
  return (
    <div className="menu text-center">
      <div className="wrapper">
        <ul>
          <li>
            <Link to="#">Gourmet Globe</Link>
          </li>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComponent;
