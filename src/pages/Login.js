import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../auth";
import store from "store";

function Login(props) {
  console.log("Auth:", auth.isAuthenticated());
  const { register, handleSubmit } = useForm();

  const onSubmit = (d) => {
      console.log(JSON.stringify(d)) 
    //   make request

    // update local storage
    store.set('user', d)

    auth.login(() => {
        props.history.push("/dashboard");
      });
    }
    
  return (
    <div>
      <h1>lniked login page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          email
          <input {...register("name")} />
        </label>

        <br></br>

        <label>
          password
          <input {...register("password")} />
        </label>

        <br></br>

        <input type="submit" value="submit" />
      </form>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <button
        onClick={() => {
          auth.login(() => {
            props.history.push("/dashboard");
          });
        }}
      >
        login
      </button>

      <br></br>

      <button>
        <Link to="/signup">signup</Link>
      </button>

    </div>
  );
}

export default Login;
