import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = () => {
  const [isClick, setClick] = useState(false);
  return (
    <div className="auth">
      <div className="auth-left">
        {isClick ? (
          <>
            <img
              src="https://i.ibb.co/DpLZGpV/63787-secure-login.gif"
              alt="img"
            />
            <div className="content">
              <p>Already have acc?</p>
              <button onClick={() => setClick(!isClick)}>Sign Up</button>
            </div>
          </>
        ) : (
          <>
            <img
              src="https://i.ibb.co/3hLHWZZ/39476-login-screen.gif"
              alt="img"
            />
            <div className="content">
              <p>Already have acc?</p>
              <button onClick={() => setClick(!isClick)}>Sign In</button>
            </div>
          </>
        )}
      </div>
      <div className="auth-right">{isClick ? <Signin /> : <Signup />}</div>
    </div>
  );
};

export default Auth;
