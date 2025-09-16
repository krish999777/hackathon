import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold fs-4 text-success" href="#">
          🌱 DonorHub
        </a>

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
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-house-door me-1"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-info-circle me-1"></i> About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-plus-circle me-1"></i> Post Donations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-search-heart me-1"></i> Browse Donations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-bar-chart-line me-1"></i> Impact
              </a>
            </li>
          </ul>

          {/* Login Button */}
          <div className="d-flex align-items-center">
            <a href="#login" className="btn btn-success d-flex align-items-center">
              <i className="bi bi-person-circle me-2"></i> Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
