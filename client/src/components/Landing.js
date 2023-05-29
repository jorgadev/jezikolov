import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Testimonials from "./Testimonials";
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
