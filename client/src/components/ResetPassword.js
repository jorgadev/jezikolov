import React from "react";

import Link from "next/link";

import Navbar from "components/Navbar";

function ResetPassword() {
  const resetPasswordHandler = () => {};

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <h1>Reset password</h1>
        <input type="text" placeholder="email"></input>
        <br />
        <Link href="/login">Login</Link>
        <br />
        <button onClick={resetPasswordHandler}>Reset password</button>
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;
