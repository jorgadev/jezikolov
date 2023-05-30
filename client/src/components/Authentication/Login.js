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
  useToast,
} from "@chakra-ui/react";

function Login() {
  const router = useRouter();
  const { user, dispatch } = useContext(StoreContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const loginHandler = () => {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.email || !emailRegex.test(state.email)) {
      toast({
        title: "Napaka",
        description: "Vnesite veljaven e-poštni naslov",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Password length validation
    if (!state.password || state.password.length < 8) {
      toast({
        title: "Napaka",
        description: "Geslo mora vsebovati vsaj 8 znakov",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

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

        router.push("/dashboard");
      })
      .catch((err) => {
        // Handle the error
        toast({
          title: "Napaka",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (user) {
    router.push("/dashboard");
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
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
              <Link as={NextLink} href="/register" color={"blue.500"}>
                Še nimaš računa?
              </Link>
            </Stack>
            <Button
              onClick={loginHandler}
              colorScheme={"blue"}
              variant={"solid"}
              isLoading={isLoading}
              loadingText="Prijava..."
              disabled={isLoading}
            >
              Prijavi se
            </Button>
          </Stack>
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
}

export default Login;
