import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "store";

function Sessions({ sessions, setSessions, getSesions }) {
  const formDate = (timestamp) => {
    const date = new Date(timestamp);
    const dateString =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    return dateString;
  };

  const toTime = (ms) =>{
    var date = new Date(null);
    date.setSeconds(parseInt(ms / 1000));
    return date.toISOString().substr(11, 8);
 }
  return (
    <div>
      <h1 className="sessions">Sessions</h1>

      <button className="filter" name="" onClick={getSesions}>
        All
      </button>
      <button className="filter" name="month" onClick={getSesions}>
        This month
      </button>
      <button className="filter" name="week" onClick={getSesions}>
        This week
      </button>
      <button className="filter" name="day" onClick={getSesions}>
        Today
      </button>

      <table>
        <thead className="table-header">
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
            <tr className="table-row" key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{ formDate(item.start)}</td>
              <td>{ formDate(item.end)}</td>
              <td>{ toTime(item.duration)}</td>
              <td>{formDate(item.Ts)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sessions;
