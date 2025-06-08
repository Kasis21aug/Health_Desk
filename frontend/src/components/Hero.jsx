import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            HealthDesk transforms hospitals into smart healthcare hubs by combining patient convenience with backend efficiency. Whether you're a patient seeking care or an admin managing operations, HealthDesk is your trusted partner in healthcare delivery.
          </p>
        </div>
        <div className="banner">
          <img src="d1.webp" alt="hero" className="animated-image" />
        </div>
      </div>
    </>
  );
};

export default Hero;