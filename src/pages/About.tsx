import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Tech & Beyond</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Tech & Beyond, we're passionate about exploring and sharing the
            latest developments in technology. Our mission is to make complex
            technical concepts accessible to everyone and foster a community of
            lifelong learners.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Do</h2>
          <p>
            We create comprehensive content covering various aspects of
            technology, from web development and programming to artificial
            intelligence and cybersecurity. Our team of experts ensures that our
            content is both accurate and easy to understand.
          </p>
        </div>

        <div className="about-section">
          <h2>Join Our Community</h2>
          <p>
            Whether you're a beginner or an experienced professional, Tech &
            Beyond is your go-to resource for staying updated with the
            ever-evolving world of technology. Join our community and be part of
            the journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
