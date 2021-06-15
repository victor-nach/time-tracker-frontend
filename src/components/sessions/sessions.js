import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "store";

function Sessions() {
  const [sessions, setSessions] = useState([
    {
      Title: "title",
      Description: "some description",
      Start: "title",
      End: "title",
      Duration: "title",
    },
    {
      Title: "anoda title",
      Description: "some other description",
      Start: "title",
      End: "title",
      Duration: "title",
    },
  ]);

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
      `query { sessions(${filter}) {   id Ts title description start end Ts } }`;

      
    var postData = { query: query(filter) };
    console.log(postData)
    const config = {
      headers: { Authorization: `Bearer ${store.get("token")}` },
    };

    axios
      .post("http://localhost:8080/graphql", postData, config)
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
      <h1>Sessions</h1>

      <button name="" onClick={getSesions}>All</button>
      <button name="month" onClick={getSesions}>This month</button>
      <button name="week" onClick={getSesions}>This week</button>
      <button name="day" onClick={getSesions}>Today</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th>Created At</th>
          </tr>
        </thead>

        {sessions.map((item) => (
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
              <td>{item.duration}</td>
              <td>{item.Ts}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Sessions;
