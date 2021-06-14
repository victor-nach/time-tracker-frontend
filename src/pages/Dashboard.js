import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth";

function Dashboard(props) {
    console.log("Auth:", auth.isAuthenticated())
  return (
   <div>
        <h1>Protected layer</h1>
        <p>dashboard page</p>

        <button
        onClick={()=>{
            auth.logout(() => props.history.push('/'))
        }}
        >
        logout
        </button>
   </div>
  );
}

export default Dashboard;