import React from "react";

import Hero from "./Hero";
import Navbar from "./Navbar";
import Shop from "./Shop";
import About from "./About";
import Fruit from "./Fruit";
import Client from "./Client";
import Contact from "./Contact";
import Footer from "./Footer";

function Landing() {
  return (
    <React.Fragment>
      <Hero />
      <Navbar />
      <Shop />
      <About />
      <Fruit />
      <Client />
      <Contact />
      <Footer />
    </React.Fragment>
  );
}

export default Landing;
