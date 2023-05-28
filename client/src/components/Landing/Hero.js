import React from "react";

function Hero() {
  return (
    <div className="hero_area">
      <section className=" slider_section position-relative">
        <div
          id="carouselExampleControls"
          className="carousel slide "
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="img-box">
                <img src="images/slider-img.jpg" alt="" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="img-box">
                <img src="images/slider-img.jpg" alt="" />
              </div>
            </div>
            <div className="carousel-item">
              <div className="img-box">
                <img src="images/slider-img.jpg" alt="" />
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Hero;
