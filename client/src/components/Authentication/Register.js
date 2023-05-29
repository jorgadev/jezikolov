import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "@context/StoreContext";
import { SET_USER } from "@constants/dispatchActions";
import { useRouter } from "next/router";
import NextLink from "next/link";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

function Register() {
  const router = useRouter();
  const { user, dispatch } = useContext(StoreContext);
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
    router.push("/dashboard");
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <FormControl id="username">
            <FormLabel>Uporabniško ime</FormLabel>
            <Input
              value={state.username}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }
              type="text"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>E-mail naslov</FormLabel>
            <Input
              value={state.email}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Geslo</FormLabel>
            <Input
              value={state.password}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              type="password"
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Link as={NextLink} href="/login" color={"blue.500"}>
                Prijavi se?
              </Link>
            </Stack>
            <Button
              onClick={registerHandler}
              colorScheme={"blue"}
              variant={"solid"}
            >
              Registriraj se
            </Button>
          </Stack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );

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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link href="/login">Login</Link>
        <br />
        <button onClick={registerHandler}>Register</button>
      </div>
    </React.Fragment>
  );
}

export default Register;
