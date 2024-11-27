import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HeaderComponent.css'; // Preverite, da ima ustrezno stilizacijo
import { FaGlobe } from 'react-icons/fa'; // Font Awesome ikona

const HeaderComponent = () => {
  return (
    <div className="menu text-center">
      <div className="wrapper">
        <ul>
          <li>
            <Link to="/recipes">All Recipes</Link>
          </li>
          <li>
            <Link to="/">
            <FaGlobe className="globe-icon" /> Gourmet Globe <FaGlobe className="globe-icon" />
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComponent;
