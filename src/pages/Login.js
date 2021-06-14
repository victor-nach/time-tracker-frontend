import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth";

function Login(props) {
    console.log("Auth:", auth.isAuthenticated())
  return (
    <div>
      <h1>lniked login page</h1>

      <button
        onClick={() => {
          auth.login(() => {
            props.history.push("/dashboard");
          });
        }}
      >
        login
      </button>

      <button><Link to="/signup">signup</Link></button>

      

      <Link to="/dashboard">go to profile</Link>
    </div>
  );
}

export default Login;
