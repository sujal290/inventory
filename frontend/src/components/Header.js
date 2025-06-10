import React from 'react';
import './Header.css';
import logo from '../images/logo_drdo.png'; // adjust if needed

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="DRDO Logo" />
      <h1>
        Centre for Fire, Explosive and Environment Safety (CFEES)
        <br />
        अग्नि, विस्फोटक और पर्यावरण सुरक्षा केंद्र (सीएफईईएस)
      </h1>
      <img src={logo} alt="DRDO Logo" />
    </div>
  );
};

export default Header;
