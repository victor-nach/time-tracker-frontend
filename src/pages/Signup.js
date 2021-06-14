import React from "react";
import { Link } from "react-router-dom";
import auth from '../auth';

function Signup({ isAuth, component: Component, ...rest }) {
    console.log("Auth:", auth.isAuthenticated())
  return (
      <div>
      <h1>sign up</h1>
            <p>Create an account if you don't have one</p>
            <button>Sign up</button>

            <p>Login if you have an account</p>
            <button> <Link to="/">login</Link></button>
      </div>
  );
}

export default Signup;