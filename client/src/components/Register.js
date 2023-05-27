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

  const [error, setError] = useState("");

  const registerHandler = () => {
    // Username length validation
    if (!state.username) {
      setError("Vnesite veljavno uporabniško ime");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.email || !emailRegex.test(state.email)) {
      setError("Vnesite veljaven e-poštni naslov");
      return;
    }

    // Password length validation
    if (!state.password || state.password.length < 8) {
      setError("Geslo mora vsebovati vsaj 8 znakov");
      return;
    }

    axios
      .post("http://localhost/register.php", {
        username: state.username,
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        // Handle the response
        console.log(res);
      })
      .catch((err) => {
        // Handle the error
        console.error(err);
      });
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
        />
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
        />
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
        />
        <br />
        {error && <p>{error}</p>}
        <Link href="/login">Login</Link>
        <br />
        <button onClick={registerHandler}>Register</button>
      </div>
    </React.Fragment>
  );
}

export default Register;
