import React from "react";

import { useRouter } from "next/router";

import Navbar from "components/Navbar";

function Index() {
  return (
    <div>
      <Navbar />
      <main>Predstavitveni page</main>
    </div>
  );
}

export default Index;
