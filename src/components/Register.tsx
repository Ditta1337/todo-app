import React, { SyntheticEvent, useState } from "react";
import Button from "./Button";
import style from "../styles/modules/login.module.css";
import toast from "react-hot-toast";

function Register({
  setIsRegisterOpen,
}: {
  setIsRegisterOpen: (value: boolean) => void;
}) {
  // register modal is not open by default
  const registerStatus = false;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // send registration form to server
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // get content
    const content = await response.json();

    // if the user is logged in, set the state to true
    if (content != null) {
      setIsRegisterOpen(false);
      toast.success("You have successfully registered!");
    }
  };

  return (
    <div className={style.loginBackground}>
      <div className={style.loginText}> Register </div>
      <form onSubmit={submit} className={style.form}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          required
          minLength={5}
          maxLength={20}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
          minLength={5}
          maxLength={20}
        />
        <Button type="submit"> Register </Button>
      </form>
    </div>
  );
}

export default Register;
