import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div class="container flex flex-wrap items-center justify-between px-20 py-5">
        <a className="logo" href="http://localhost:5173">PlantPilot</a>
        <a className="logo" href="http://localhost:5173/credits">Credits</a>
      </div>
    </nav>
  );
};

export default Navbar;
