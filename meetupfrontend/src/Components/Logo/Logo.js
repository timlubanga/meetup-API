import React, { useContext } from 'react';
import './logo.css';
import { UserContext } from '../../App';

const Logo = ({ link }) => {
  const { state } = useContext(UserContext);
  const redirectLink = state.token ? 'userprofile' : '';
  return (
    <img
      className="logo"
      src="/logo.png"
      alt="logo"
      onClick={() => link(redirectLink)}
    />
  );
};

export default Logo;
