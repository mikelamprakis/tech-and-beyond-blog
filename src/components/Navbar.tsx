import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Tech & Beyond</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/blog" className="nav-link">
          Blog
        </Link>
        <Link to="/about" className="nav-link">
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
