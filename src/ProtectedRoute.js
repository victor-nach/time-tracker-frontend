import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from './auth';

function ProtectedRoute({  component: Component, ...rest }) {
    console.log('auth value: ', auth.isAuthenticated())
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props}/>;
        }
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
}

export default ProtectedRoute;
