import React, { SyntheticEvent, useState, useEffect } from "react";
import Register from "./Register";
import Button from "./Button";
import style from "../styles/modules/login.module.css";
import { toast } from "react-hot-toast";

function Login() {
  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to check if the register form is open
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // send form to server
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // get cookies
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // response if login password combination is correct
    if (response.status !== 200) {
      toast.error("Wrong username or password!");
      return;
    }

    // get content
    const content = await response.json();

    // if the user is logged in, set the state to true and close modal
    if (content != null) {
      setIsLoggedIn(true);
      toast.success("You have successfully logged in!");
    }

    // necesarry to show username that is logged in
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // check if user is logged in (so you dont have to login after every refresh)
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      if (content) {
        setIsLoggedIn(true);
      }
    })();
  }, []);

  if (!isLoggedIn && !isRegisterOpen) {
    return (
      <div className={style.loginBackground}>
        <div className={style.loginText}>Log in</div>
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
          <Button type="submit"> Log in </Button>
        </form>
        <div className={style.signUp}>
          <p>No account?</p>
          <Button onClick={() => setIsRegisterOpen(true)}> Sign up </Button>
        </div>
      </div>
    );
  } else if (!isLoggedIn && isRegisterOpen) {
    return <Register setIsRegisterOpen={setIsRegisterOpen} />;
  } else {
    return (
      <></> // Otherwise typescript cries
    );
  }
}

export default Login;
