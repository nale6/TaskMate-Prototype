import React from "react";
import "../App.css";
import iphone from "../iphonetransparent.png";
import taskmatetitle from "../taskmatenewtitle2.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="main-body">
        <div className="iphone-centered">
          <div className="iphone-background"></div>

          <img src={taskmatetitle} alt="TaskMate title" className="title" />
          <img
            src={iphone}
            alt="Transparent iphone border"
            className="iphone-border"
          />
          <div className="login-interface">
            <div className="username">
              Username<input className="username-input"></input>
            </div>
            <div className="password">
              Password<input className="password-input"></input>
            </div>
            <button className="sign-in">Sign In</button>
            <button className="register">Register</button>
            <button className="guest" onClick={() => navigate("/dashboard")}>
              Continue as Guest
            </button>
          </div>
        </div>
        <div className="note">
          Note: There is no register/login functionality in this prototype,
          please continue as guest.
        </div>
      </div>
    </div>
  );
}

export default Login;
