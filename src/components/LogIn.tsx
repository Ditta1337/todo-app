import React, { useState } from "react";
import Register from "./Register";
import Button from "./Button";
import style from "../styles/modules/login.module.css";

function Login() {
  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  if (!isLoggedIn && !isRegisterOpen) {
    return (
      <div className={style.loginBackground}>
        <div className={style.loginText}>Log in</div>
        <form className={style.form}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <Button> Log in </Button>
        </form>
        <div className={style.signUp}>
          <p>No account?</p>
          <Button onClick={() => setIsRegisterOpen(true)}> Sign up </Button>
        </div>
      </div>
    );
  } else if (!isLoggedIn && isRegisterOpen) {
    return (
      <Register setIsRegisterOpen={setIsRegisterOpen} />
    );
  } else {
    return (
      <></>
    )
  }
}

export default Login;
