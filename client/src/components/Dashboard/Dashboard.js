import React, { useContext, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { StoreContext } from "@context/StoreContext";

function Dashboard() {
  const { user } = useContext(StoreContext);

  return (
    user && (
      <Flex height="100vh">
        <Sidebar />
        <Main />
      </Flex>
    )
  );
}

export default Dashboard;
