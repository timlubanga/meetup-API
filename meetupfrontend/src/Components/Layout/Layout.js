import React from 'react';
import { Grid } from '@material-ui/core';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <main>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Footer />
      </main>
    
  );
};

export default Layout;
