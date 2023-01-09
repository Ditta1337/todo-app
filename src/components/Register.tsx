import React, { useState } from "react";
import Button from "./Button";
import style from "../styles/modules/login.module.css";

function Register({setIsRegisterOpen}: {setIsRegisterOpen: (value: boolean) => void}) {
  // State to check if the user is logged in
  const registerStatus = false;

  return (
    <div className={style.loginBackground}>
      <div className={style.loginText}> Register </div>
      <form className={style.form}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <Button onClick={() => setIsRegisterOpen(!registerStatus)}> Register </Button>
      </form>
    </div>
  );
}

export default Register;
