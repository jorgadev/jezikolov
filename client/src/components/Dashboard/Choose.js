import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Teacher from "./Teacher";
import Student from "./Student";
import Add from "./Add";

function Choose() {
  return (
    <Tabs>
      <TabList>
        <Tab>Učitelj</Tab>
        <Tab>Dijak</Tab>
        <Tab>Dodaj +</Tab>
      </TabList>
      <TabPanels>
        <Teacher />
        <Student />
        <Add />
      </TabPanels>
    </Tabs>
  );
}

export default Choose;
