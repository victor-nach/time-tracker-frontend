import React, { useEffect, useState } from "react";
import Timer from "react-compound-timer";
import store from "store";
import axios from "axios";
import { baseURl } from "../../config/config";

function Timere({ getSesions }) {
  const [currentTime, setCurrentTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");

  useEffect(() => {
    if (currentTime) saveSession();
  }, [currentTime]);

  const saveSession = () => {
    console.log(currentTime, startTime, stopTime, title, description);
    const queryData = { currentTime, startTime, stopTime, title, description };
    const query = (data) =>
      `mutation { saveSession( input: { start: ${data.startTime}, end: ${
        data.stopTime
      }, duration: ${parseInt(data.currentTime)}, title: \"${
        data.title
      }\", description: \"${data.description}\"} ) {  success  message } }`;

    var postData = { query: query(queryData) };
    console.log(postData);
    const config = {
      headers: { Authorization: `Bearer ${store.get("token")}` },
    };

    const cleanup = () => {};
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
          return;
        }

        setTitle("");
        setDescription("");
        setCurrentTime("");

        console.log({ response });
        getSesions();
      })
      .catch(function (error) {
        console.log({ error });
      });
  };

  return (
    <div className="timer">
      <p> Start a timed session</p>
      <br></br>
      <form>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="Title"
          />
        </label>

        <br></br>

        <label>
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
          />
        </label>

        <br></br>
      </form>

      <Timer
        initialTime={0}
        startImmediately={false}
        onStart={() => console.log("onStart hook")}
        onResume={() => console.log("onResume hook")}
        onPause={() => console.log("onPause hook")}
        onStop={() => {
          console.log("current time", currentTime);
        }}
        onReset={() => console.log("onReset hook")}
      >
        {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
          <React.Fragment>
            <div className="timer-values">
              <div className="timer-box">
                <p><Timer.Days /></p>
                <p>days</p>
              </div>

              <div className="timer-box">
                <p><Timer.Hours /></p>
                <p>hours</p>
              </div>

              <div className="timer-box">
                <p><Timer.Minutes /></p>
                <p>minutes</p>
              </div>

              <div className="timer-box">
                <p><Timer.Seconds /></p>
                <p>seconds</p>
              </div>
            </div>
            <div>{getTimerState() === "INITED" ? "" : getTimerState()}</div>

            <br />
            <div>
              <button name="start"
                className="btn"
                onClick={() => {
                  const satrtTime = new Date().getTime();
                  setStartTime(satrtTime);
                  start();
                }}
              >
                Start
              </button>

              <button className="btn" onClick={pause}>
                Pause
              </button>
              <button className="btn" onClick={resume}>
                Resume
              </button>
              <button
                className="btn"
                onClick={() => {
                  const time = getTime();
                  const stpTime = new Date().getTime();
                  setStopTime(stpTime);
                  setCurrentTime(time);
                  reset();
                  stop();
                }}
              >
                Save
              </button>
              <button className="btn" onClick={reset}>
                Reset
              </button>
            </div>
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
}

export default Timere;
