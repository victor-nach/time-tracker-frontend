import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth";
import store from "store";
import Sessions from "../components/sessions/sessions"

function Dashboard(props) {
    console.log("Auth:", auth.isAuthenticated())
    console.log(store.get('user'))
    const user = store.get('user')

    const inState = {}
  return (
   <div>
        <h1>Protected layer</h1>
        <p>Welcome {user.name}</p>
        <button
        onClick={()=>{
            auth.logout(() => props.history.push('/'))
        }}
        >
        logout
        </button>

        <Sessions />
   </div>
  );
}

export default Dashboard;