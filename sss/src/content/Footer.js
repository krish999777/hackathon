import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div>
        <footer className="footer bg-light text-dark pt-5 pb-3 mt-5 shadow-sm">
      <div className="container">
        <div className="row">
          {/* Brand / About */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-success">🌱 DonorHub</h4>
            <p className="small text-muted">
              DonorHub connects generous donors with those in need. Together, we
              create meaningful impact and make giving easier than ever.
            </p>
            {/* Social Icons */}
            <div className="d-flex gap-3">
              {/* <a href="#" className="text-dark fs-5">
                <i className="bi bi-facebook"></i>
              </a> */}
              {/* <a href="#" className="text-dark fs-5">
                <i className="bi bi-twitter"></i>
              </a> */}
              <a href="www.instagram.com" className="text-dark fs-5">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-dark fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/donation" className="footer-link">Donations</a></li>
            
              <li><a href="#" className="footer-link">Impact</a></li>
              <li><a href="#" className="footer-link">Campaigns</a></li>
              <li><a href="#" className="footer-link">Fundraisers</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">FAQs</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Guides</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Partners</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Use</a></li>
              <li><a href="#" className="footer-link">Cookies</a></li>
              <li><a href="#" className="footer-link">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p className="small text-muted mb-0">
            © {new Date().getFullYear()} DonorHub — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer