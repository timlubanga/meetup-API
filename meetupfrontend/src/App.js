import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import ButtonAppBar from './Components/AppBar/AppBar';
import Meetups from './Components/Meetups/Meetups';
import Layout from './Components/Layout/Layout';
import { Signup } from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { Route } from 'react-router-dom';
import { useReducer, createContext } from 'react';
export const UserContext = createContext();

const initialState = {
  error: false,
  token: null,
  data: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_INIT':
      return { ...state, token: null, error: false };
    case 'SIGN_SUCESS':
      return {
        ...state,
        token: action.payload.token,
        data: { ...action.payload.data },
      };
    case 'SIGN_IN_ERROR':
      return { ...state, error: 'wrong username or password' };
    default:
      return { ...state };
  }
};

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <ButtonAppBar />
        <Layout>
          <Route
            exact
            path="/signup"
            render={() => {
              return (
                <>
                  <Signup />
                </>
              );
            }}
          ></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Header />
                <Meetups />
              </>
            )}
          />
        </Layout>
      </UserContext.Provider>
    </div>
  );
}
