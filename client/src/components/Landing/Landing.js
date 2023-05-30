import React from "react";

import Hero from "./Hero";
import Testimonials from "./Testimonials";
import Features from "./Features";
import Footer from "./Footer";

function Landing() {
  return (
    <React.Fragment>
      <Hero />
      <Testimonials />
      <Features />
      <Footer />
    </React.Fragment>
  );
}

export default Landing;
