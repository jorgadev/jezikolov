import React from "react";

import Link from "next/link";

import Navbar from "components/Navbar";

function Register() {
  const registerHandler = () => {};

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <h1>Register</h1>
        <input type="text" placeholder="username"></input>
        <br />
        <input type="text" placeholder="email"></input>
        <br />
        <input type="password" placeholder="password"></input>
        <br />
        <Link href="/login">Login</Link>
        <br />
        <button onClick={registerHandler}>Register</button>
      </div>
    </React.Fragment>
  );
}

export default Register;
