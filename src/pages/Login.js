import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import auth from "../auth";
import store from "store";
import { baseURl } from "../config/config";

function Login(props) {
  console.log("Auth:", auth.isAuthenticated());
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const query = (email, password) =>
      `mutation { login( email: \"${email}\", passcode: \"${password}\") {  success jwtToken refreshToken  User {id name email} } }`;

    var postData = { query: query(data.email, data.password) };
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
          console.log({ errorType });
          return;
        }

        console.log({ response });
        const { message, success, jwtToken, User } = response.data.data.login;
        console.log({ message, success });

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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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

        <p>Sign up if you don't have an account <Link className="link" to="/signup">signup</Link></p>
      </form>

    
      
      
        
      
    </div>
  );
}

export default Login;
