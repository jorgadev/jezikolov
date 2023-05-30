import React, { useContext } from "react";
import { Box, Flex, Alert, AlertIcon } from "@chakra-ui/react";
import { StoreContext } from "@context/StoreContext";

function Main() {
  const { user } = useContext(StoreContext);

  return (
    <Box flex="1" p="4">
      <Alert status="info" mb="4">
        <AlertIcon />
        Dobrodošli, {user.username}!
      </Alert>
    </Box>
  );
}

export default Main;
