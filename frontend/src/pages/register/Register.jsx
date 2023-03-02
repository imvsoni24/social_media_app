import { useRef } from "react";
import "./register.css";
import {useNavigate} from "react-router";
import axios from "axios";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(passwordAgain.current.value!==password.current.value){
      passwordAgain.current.setCustomValidity("Password don't match!")
    }else{
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      await axios.post("http://localhost:4500/api/auth/register",user)
      navigate("/login")
    }
  }

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
            <input
              ref={username}
              placeholder="Username"
              className="loginInput"
            />
            <input
              type="email"
              ref={email}
              placeholder="Email"
              className="loginInput"
            />
            <input
              ref={password}
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <input
              type="password"
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
