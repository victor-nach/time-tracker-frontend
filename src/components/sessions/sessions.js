import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "store";

function Sessions({ sessions, setSessions, getSesions }) {
  

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

        <tbody>
        {sessions.map((item) => (
          
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
              <td>{item.duration}</td>
              <td>{item.Ts}</td>
            </tr>
          
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sessions;
