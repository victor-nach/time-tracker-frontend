import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import auth from "../auth";
import store from "store";
import axios from "axios";
import { baseURl } from '../config/config';

function Signup(props) {
  console.log("Auth:", auth.isAuthenticated());
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const query = (data) =>
    `mutation { signUp( email: \"${data.email}\", name: \"${data.name}\", passcode: \"${data.password}\") {  success jwtToken refreshToken  User {id name email} } }`;

  var postData = { query: query(data) };
  axios
    .post(baseURl, postData)
    .then(function (response) {
      // if error
      if (response.data.errors) {
        const {
          message,
          extensions: { code, errorType },
        } = response.data.errors[0];
        console.log({ message });
        console.log({ code });

        if (code === 108) {

        }
        console.log({ errorType });
      }

      console.log({ response });
      const { success, jwtToken, User } = response.data.data.signUp;
      console.log(success, jwtToken);
      console.log(User);

      store.set("token", jwtToken);
      store.set("user", User);

      auth.login(() => {
        props.history.push("/dashboard");
      });
    })
    .catch(function (error) {
      console.log({ error });
    });
  };

  return (
    <div>
      <h1>sign up</h1>
      <p>Create an account if you don't have one</p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          name
          <input {...register("name")} />
        </label>

        <label>
          email
          <input {...register("email")} />
        </label>

        <label>
          password
          <input {...register("password")} />
        </label>

        <input type="submit" value="submit" />

        <p>Login if you have an account <Link className="link" to="/time-tracker-frontend">login</Link></p>
      </form>

    </div>
  );
}

export default Signup;
