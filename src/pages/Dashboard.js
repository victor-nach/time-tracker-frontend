import React, { useEffect, useState } from "react";
import auth from "../auth";
import store from "store";
import Sessions from "../components/sessions/sessions"
import Timer from "../components/timer/timer"
import axios from "axios";
import { baseURl } from '../config/config'

function Dashboard(props) {
    console.log("Auth:", auth.isAuthenticated())
    console.log(store.get('user'))
    const user = store.get('user')

    const [sessions, setSessions] = useState([]);

  const getSesions = (e) => {
    console.log(e)
    var filter = ""

    if (e) {
      console.log("get sessions...", e.target.name);
      // filter = filter.target.name
      filter = "filter: " + e.target.name;
    }
    console.log("token", store.get("token"))

    
    const query = (filter) =>
      `query { sessions(${filter}) {   id Ts title description start end Ts duration } }`;

      
    var postData = { query: query(filter) };
    console.log(postData)
    const config = {
      headers: { Authorization: `Bearer ${store.get("token")}` },
    };

    axios
    .post(baseURl, postData, config)
      .then(function (response) {
        // if error
        if (response.data.errors) {
          const {
            message,
            extensions: { code, errorType },
          } = response.data.errors[0];
          console.log({ message });
          console.log({ code });
          console.log({ errorType });
        }

        console.log({ response });
        // const {  id, Ts, title, description, start, end, Ts: time } = response.data.data.sessions;
        setSessions(response.data.data.sessions)
      })
      .catch(function (error) {
        console.log({ error });
      });
  };

  useEffect(getSesions, []);

  return (
   <div>
   <div className="profile">
    <button
    onClick={()=>{
        auth.logout(() => props.history.push('/'))
    }}
    >
    logout
    </button>
    <p className="">Welcome {user.name} </p>
   </div>     
   
       
        <Timer getSesions={getSesions} />
        <Sessions sessions={sessions} setSessions={setSessions} getSesions={getSesions} />
   </div>
  );
}

export default Dashboard;