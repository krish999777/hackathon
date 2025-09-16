import React from 'react';
// Importing all the necessary icons
import { FaPaperPlane, FaBell, FaTruck, FaMapMarkerAlt, FaChartPie, FaUsers } from 'react-icons/fa';
import './HomePage.css'; // We'll u
// pdate this stylesheet
import {Link} from 'react-router-dom'
const HomePage = () => {
  return (
    <div className="homepage-pro">
      {/* --- Hero Section with Animated Gradient Background --- */}
      <section className="hero-section-pro">
        {/* Animated background shapes for a modern feel */}
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>

        
        <div className="hero-content">
          <h2>Don't Waste It. Donate It.</h2>
          <p>The real-time platform connecting surplus meals from restaurants to communities in need. Effortlessly.</p>
          <div className="hero-buttons">
            
              <Link to="/postdonation" className="btn btn-primary-pro" >Donate a Meal</Link>
               <Link to='/browsedonation' className="btn-secondary-pro btn">Receive Donations</Link>
          </div>
        </div>
      </section>

      {/* --- Mission Section (Unchanged, but benefits from new global styles) --- */}
      <section className="mission-section">
        <div className="container-pro mission-layout">
          <div className="mission-image">
            {/* You can replace this div with an <img> tag */}
          </div>
          <div className="mission-text">
            <h3>Bridging the Gap Between Surplus & Scarcity</h3>
            <p>Every day, delicious, unsold food is thrown away while people in our own communities go hungry. We built RescueBites to be the seamless link, using technology to redirect that surplus food to where it's needed most—quickly, safely, and effectively.</p>
          </div>
        </div>
      </section>

      {/* --- How It Works Section with Real Icons --- */}
      <section className="how-it-works-pro">
        <div className="container-pro">
          <h2 className="section-title">A Simple 3-Step Process</h2>
          <div className="steps-container-pro">
            <div className="step">
              <div className="step-icon-pro"><FaPaperPlane /></div>
              <h4>1. Post a Donation</h4>
              <p>Restaurants list surplus food in under 60 seconds with our streamlined photo and location upload.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-icon-pro"><FaBell /></div>
              <h4>2. Instantly Notify</h4>
              <p>Nearby NGOs and volunteers get an immediate push notification and can claim the donation with one tap.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-icon-pro"><FaTruck /></div>
              <h4>3. Track & Impact</h4>
              <p>Coordinate the pickup with live GPS tracking and watch your positive impact grow on your dashboard.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- Features Section with Real Icons --- */}
      {/* --- Features Section with Floating UI Cards --- */}
      <section className="features-pro">
        <div className="container-pro features-layout">
            <div className="features-content">
                <h2 className="section-title-left">Technology for Good</h2>
                <p className="features-subtitle">We handle the logistics so you can focus on the impact.</p>
                <ul>
                    <li><FaMapMarkerAlt /> <strong>Live GPS Tracking:</strong> Real-time map view of volunteer location for seamless handoffs.</li>
                    <li><FaChartPie /> <strong>Impact Dashboards:</strong> Visualize your contribution with beautiful graphs showing meals saved.</li>
                    <li><FaBell /> <strong>Smart Notifications:</strong> Instant alerts ensure no donation opportunity is missed.</li>
                </ul>
            </div>
            {/* NEW: Floating UI Cards instead of a phone */}
            <div className="features-image-wrapper">
                {/* Decorative background shape remains */}
                <div className="ui-card notification">
                    <FaBell /> New Donation: Star Cafe!
                </div>
                <div className="ui-card main-card">
                    <h4>5kg Rice & Dal</h4>
                    <p>Pickup: Juhu, Mumbai</p>
                    <div className="status">
                        <span className="status-dot"></span>
                        Awaiting Confirmation
                    </div>
                </div>
                <div className="ui-card impact-widget">
                    <p>Meals Saved Today</p>
                    <span>128</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- NEW Impact Stats Section --- */}
       <section className="stats-section-pro">
            <div className="container-pro">
                <div className="stat-card-pro">
                    <h3>15,000+</h3>
                    <p>Meals Rescued</p>
                </div>
                <div className="stat-card-pro">
                    <h3>200+</h3>
                    <p>Community Partners</p>
                </div>
                <div className="stat-card-pro">
                    <h3><FaUsers /> Mumbai</h3>
                    <p>Live & Expanding</p>
                </div>
            </div>
        </section>
      
      {/* --- Call to Action Section --- */}
      {/* <section className="cta-section">
        <div className="container-pro">
            <h2>Join the Movement Today</h2>
            <p>Whether you're a restaurant with surplus food or an NGO ready to distribute it, you can start making a difference right now.</p>
            <button className="btn btn-primary-pro btn-large">Get Started for Free</button>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;

