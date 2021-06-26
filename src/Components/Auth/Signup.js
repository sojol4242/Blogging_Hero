import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
// import {auth } from "./firebase";

import "./auth.css";
import { auth } from "./firebase";
import { DataContext } from "../../App";
// import { auth } from "./firebase";
const Signup = () => {
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
    getValues,
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    if (data.email && data.password) {
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
           
            const newUserInfo = { ...userInfo };
            newUserInfo.isSignIn = true;
            newUserInfo.displayName = data.name;
            newUserInfo.email = data.email;
            newUserInfo.password = data.password;
            setUserInfo(newUserInfo);
            if(newUserInfo){
              alert("Successfully Signed in");
             }
            setSignedInUser(newUserInfo);
            history.replace(from);
            updateUserName(data.name);
       
       
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    e.target.reset();
  };
  const updateUserName = (name) => {
    const user = auth.currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("update user name successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Full Name"
          type="text"
          {...register("name", {
            required: "Name is a required",
            minLength: {
              value: 4,
              message: "Name should be 4 characters and more",
            },
            // pattern: {
            //   value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            //   message: "Name Contains Letter",
            // },
          })}
        />
        {errors.name && (
          <small style={{ color: "red" }}>{errors.name.message}</small>
        )}
        <input
          placeholder="Email"
          type="text"
          {...register("email", {
            required: "Email is required!",
            // pattern: {
            //   value:
            //     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            //   message: "Invalid email address",
            // },
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
            //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            //   message: `Minimum eight characters,one letter, one number`,
            // },
          })}
        />
        {errors.password && (
          <small style={{ color: "red", textAlign: "center" }}>
            {errors.password.message}
          </small>
        )}

        <input
          placeholder="Confirm Password"
          type="password"
          {...register("passwordConfirmation", {
            required: "Please confirm password!",
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || "Password should be matched!";
              },
            },
          })}
        />
        {errors.passwordConfirmation && (
          <small style={{ color: "red" }}>
            {errors.passwordConfirmation.message}
          </small>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
