import React from 'react';
import './Navbar.css';
import '../App.css';

// FIX 1: Corrected the import path.
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">

          {/* FIX 2: Changed the brand from <a> to <Link> and pointed it to the homepage ('/'). */}
          <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
            🌱 DonorHub
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links + Login */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">

              {/* FIX 3: Replaced all <a> tags with <Link> components and set the 'to' prop. */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-door me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <i className="bi bi-info-circle me-1"></i> About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/postdonation">
                  <i className="bi bi-plus-circle me-1"></i> Post Donations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/browsedonation">
                  <i className="bi bi-search-heart me-1"></i> Browse Donations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/impact">
                  <i className="bi bi-bar-chart-line me-1"></i> Impact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;