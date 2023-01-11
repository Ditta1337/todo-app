import React, { useEffect, useState } from "react";
import toaster from "react-hot-toast";
import Button from "./Button";
import style from "../styles/modules/login.module.css";

function TopBar() {
  const [username, setUsername] = useState("");

  // set username to show who is logged in
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setUsername(content.username);
    })();
  }, []);

  // send logout request to server
  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // get content
    const content = await response.json();

    if (content != null) {
      toaster.success("You have successfully logged out!");
      // reload to show log in modal
      await setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className={style.loggedInBar}>
      <div className={style.loggedInText}>Logged in as: {username} </div>
      <Button variant="secondary" onClick={logout}>
        Log out
      </Button>
    </div>
  );
}

export default TopBar;
