import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';

const Logout = ({ style }) => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const handleLogout = () => {
   
    dispatch({ type: 'LOGOUT', payload: { token: null, data: {} } });
    history.replace('/login');
  };
  return (
    <Typography className={style} onClick={handleLogout}>
      Log out
    </Typography>
  );
};

export default Logout;
