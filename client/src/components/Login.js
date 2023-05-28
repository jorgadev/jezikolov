import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@components/Navbar";
import { StoreContext } from "@context/StoreContext";
import { SET_USER } from "@constants/dispatchActions";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const { user, dispatch } = useContext(StoreContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginHandler = () => {
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
      .post("http://localhost/login.php", {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        // Handle the response
        const data = res.data.user;
        const token = res.data.user.token;
        localStorage.setItem("userToken", token);
        dispatch({ type: SET_USER, payload: data });
      })
      .catch((err) => {
        // Handle the error
        setError(err.response.data.message);
      });
  };

  if (user) {
    router.push("/");
  }

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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link href="/register">Register</Link>
        <br />
        <button onClick={loginHandler}>Login</button>
      </div>
    </React.Fragment>
  );
}

export default Login;
