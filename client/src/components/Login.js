import React from "react";

import Link from "next/link";

import Navbar from "components/Navbar";

function Login() {
  const loginHandler = () => {};

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <h1>Login</h1>
        <input type="text" placeholder="email"></input>
        <br />
        <input type="password" placeholder="password"></input>
        <br />
        <Link href="/register">Register</Link>
        <br />
        <Link href="/reset-password">Reset password</Link>
        <br />
        <button onClick={loginHandler}>Log in</button>
      </div>
    </React.Fragment>
  );
}

export default Login;
