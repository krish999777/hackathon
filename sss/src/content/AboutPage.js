// src/AboutPage.js
import React from "react";
import { FaHeart, FaUsers, FaSeedling, FaHandshake, FaGlobeAsia } from "react-icons/fa";
import "./AboutPage.css"; // create a matching CSS file

const AboutPage = () => {
  return (
    <div className="about-pro">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 >About Us</h1>
          <p>
            We’re on a mission to transform surplus food into hope and full
            plates—leveraging technology, compassion, and collaboration.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story container-pro">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>Food waste is a major global issue, with surplus food often going to landfill while many people face food insecurity. This project aims to design and develop Food Rescue Matchmaker website that connects restaurants and cafes with surplus food to NGOs and volunteers who can redistribute it. By leveraging features like GPS and images the platform will enable real-time coordination to minimize food waste and maximize community impact.
          </p>
        </div>
        <div className="story-image">
          {/* Replace with an actual team image */}
          <img src="./logo-main.png" alt="RescueBites Team" />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="about-values">
        <div className="container-pro">
          <h2 className="section-title">Our Mission & Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaHeart className="value-icon" />
              <h4>Compassion</h4>
              <p>Driven by empathy, we prioritize people and dignity above all.</p>
            </div>
            <div className="value-card">
              <FaUsers className="value-icon" />
              <h4>Community</h4>
              <p>Building bridges between donors, NGOs, and volunteers.</p>
            </div>
            <div className="value-card">
              <FaSeedling className="value-icon" />
              <h4>Sustainability</h4>
              <p>Reducing food waste for a healthier planet and future.</p>
            </div>
            <div className="value-card">
              <FaHandshake className="value-icon" />
              <h4>Collaboration</h4>
              <p>Together, we achieve more and reach further.</p>
            </div>
            <div className="value-card">
              <FaGlobeAsia className="value-icon" />
              <h4>Impact</h4>
              <p>Creating measurable change for communities across regions.</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Call To Action */}
      {/* <section className="about-cta">
        <h2>Be Part of the Change 🌍</h2>
        <p>
          Whether you’re a restaurant, NGO, or an individual, you have the power
          to make an impact. Together, we can rescue meals and restore hope.
        </p>
        <button className="btn btn-primary-pro-pp btn-large">
          Join the Movement
        </button>
      </section> */}
    </div>
  );
};

export default AboutPage;
