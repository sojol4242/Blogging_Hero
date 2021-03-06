import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const Auth = () => {
  const [isClick, setClick] = useState(false);
  return (
  
      <div className="auth">
        
        <div className="auth-left">
        <h2 className="welcome">Welcome to Hero Blogging</h2>
          {isClick ? (
            <>
               
              <div className="content">
                <p>Already have acc?</p>
                <button onClick={() => setClick(!isClick)}>Sign Up</button>
              </div>
            </>
          ) : (
            <>
              {/* <img
                src="https://i.ibb.co/3hLHWZZ/39476-login-screen.gif"
                alt="img"
              /> */}
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
