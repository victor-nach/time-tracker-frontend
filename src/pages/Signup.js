import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../auth";
import store from "store";

function Signup(props) {
  console.log("Auth:", auth.isAuthenticated());
  const { register, handleSubmit } = useForm();

  const onSubmit = (d) => {
    console.log(JSON.stringify(d));
    //   make request

    // update local storage
    store.set("user", d);

    auth.login(() => {
      props.history.push("/dashboard");
    });
  };

  return (
    <div>
      <h1>sign up</h1>
      <p>Create an account if you don't have one</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          name
          <input {...register("name")} />
        </label>

        <br></br>

        <label>
          email
          <input {...register("email")} />
        </label>

        <br></br>

        <label>
          password
          <input {...register("password")} />
        </label>

        <br></br>

        <input type="submit" value="submit" />
      </form>

      <p>Login if you have an account</p>
      <button>
        <Link to="/">login</Link>
      </button>
    </div>
  );
}

export default Signup;
