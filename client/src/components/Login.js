import React, { useState } from "react";

import axios from "axios";
import Link from "next/link";

import Navbar from "@components/Navbar";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const loginHandler = () => {
    axios
      .post("http://localhost/login.php", {
        email: state.email,
        password: state.password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email"
          value={state.email}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        ></input>
        <br />
        <input
          type="password"
          placeholder="password"
          value={state.password}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        ></input>
        <br />
        <Link href="/register">Register</Link>
        <br />
        <button onClick={loginHandler}>Login</button>
      </div>
    </React.Fragment>
  );
}

export default Login;
