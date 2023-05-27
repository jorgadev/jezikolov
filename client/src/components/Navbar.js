import React, { useContext } from "react";

import { StoreContext } from "context/StoreContext";

import { useRouter } from "next/router";
import { DISPATCH_ACTIONS } from "../constants";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const { user, dispatch } = useContext(StoreContext);

  const loginHandler = () => {
    router.push("/login");
  };
  const logoutHandler = () => {
    dispatch({ type: DISPATCH_ACTIONS.USER_LOGOUT });
  };

  return (
    <div>
      <header>
        <div className="left">
          <Link href="/">Jezikolov</Link>
        </div>
        <div className="right">
          {user ? (
            <button onClick={logoutHandler}>Odjavi se</button>
          ) : (
            <button onClick={loginHandler}>Prijavi se</button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
