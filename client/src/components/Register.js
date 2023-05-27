import React, { useState } from "react";

import axios from "axios";
import Link from "next/link";

import Navbar from "@components/Navbar";

function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerHandler = () => {
    axios
      .post("http://localhost/register.php", {
        username: state.username,
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
        <h1>Register</h1>
        <input
          type="text"
          placeholder="username"
          value={state.username}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
        ></input>
        <br />
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
        <Link href="/login">Login</Link>
        <br />
        <button onClick={registerHandler}>Register</button>
      </div>
    </React.Fragment>
  );
}

export default Register;
