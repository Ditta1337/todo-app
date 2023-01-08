import React, { useState } from "react";
import Button from "./Button";
import style from "../styles/modules/login.module.css";

function Login() {
  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn && (
        <div className={style.loginBackground}>
          <div className={style.loginText}>Log in</div>
          <form className={style.form}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <Button> Log in </Button>
          </form>
          <div className={style.signUp}>
            <p>No account?</p>
            <Button> Sign up </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
