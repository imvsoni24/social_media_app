import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../apiCalls";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef()
  const password = useRef()
  const {user,isFetching,dispatch}= useContext(AuthContext)
  const handleSubmit=(e)=>{
    e.preventDefault()
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Vinsta</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Vinsta.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleSubmit} className="loginBox">
            <input ref={email} required placeholder="Email" type="email" className="loginInput" />
            <input ref={password} required placeholder="Password" className="loginInput" />
            <button type="submit" className="loginButton">{isFetching?<CircularProgress/>:"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
