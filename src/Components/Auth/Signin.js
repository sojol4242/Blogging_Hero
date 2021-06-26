import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import "./auth.css";
import { DataContext } from "../../App";
import { auth } from "./firebase";
const Signin = () => {
  const [signedInUser, setSignedInUser] = useContext(DataContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [userInfo, setUserInfo] = useState({
    isSignIn: false,
    displayName: "",
    email: "",
    password: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data, e) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        const newUserInfo = { ...userInfo };
        newUserInfo.isSignIn = true;
        newUserInfo.email = data.email;
        newUserInfo.password = data.password;
        setUserInfo(newUserInfo);
        setSignedInUser(newUserInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          type="text"
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <small style={{ color: "red" }}>{errors.email.message}</small>
        )}
        <input
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required!",
            // pattern: {
            //   value:
            //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            //   message: `Minimum eight characters,one letter, one number`,
            // },
          })}
        />
        {errors.password && (
          <small style={{ color: "red", textAlign: "center" }}>
            {errors.password.message}
          </small>
        )}
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Signin;
