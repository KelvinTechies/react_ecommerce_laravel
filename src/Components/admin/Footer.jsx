import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright © Your Website 2023</div>
          <div>
            <NavLink href="#">Privacy Policy</NavLink>·
            <NavLink href="#">Terms &amp; Conditions</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
