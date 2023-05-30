import React, { useContext } from "react";
import { Box, Flex, Alert, AlertIcon } from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";
import Choose from "./Choose";
import { useRouter } from "next/router";
import Add from "./Add";

function Main() {
  const { user } = useContext(StoreContext);
  const router = useRouter();

  let Component;
  switch (router.pathname) {
    case "/dashboard":
      Component = Choose;
      break;
    case "/add-offer":
      Component = Add;
      break;
    default:
      break;
  }

  return (
    <Box flex="1" p="4">
      <Alert status="info" mb="4">
        <AlertIcon />
        Dobrodošli, {user.username}!
      </Alert>
      {<Component />}
    </Box>
  );
}

export default Main;
