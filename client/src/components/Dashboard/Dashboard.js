import React, { useContext, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useRouter } from "next/router";
import { StoreContext } from "@context/StoreContext";

function Dashboard() {
  const { user } = useContext(StoreContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

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
