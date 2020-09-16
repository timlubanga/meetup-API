import React from 'react';
import './logo.css'

const Logo = ({link}) => {
  return <img className="logo" src="/logo.png"  alt="logo" onClick={()=>link("")}/>;
};

export default Logo;
