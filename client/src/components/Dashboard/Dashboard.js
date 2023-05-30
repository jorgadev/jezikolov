import React, { useContext } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";

import { StoreContext } from "@context/StoreContext";

import Sidebar from "./Sidebar";
import Main from "./Main";

function Dashboard() {
  const { user } = useContext(StoreContext);

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    user && (
      <Flex height="100vh" flexDirection={isMobile ? "column" : "row"}>
        <Sidebar />
        <Main />
      </Flex>
    )
  );
}

export default Dashboard;
