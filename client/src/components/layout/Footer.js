import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="social">
        <Link className="nav-logo" to="/">
          NextDr
          <img
            alt="logo"
            style={{ width: "3.2rem" }}
            src={process.env.PUBLIC_URL + "/logo.png"}
          />
        </Link>

        <p className="copyright">Copyright © 2022, Nextdr. All Rights Reserved.</p>
      </div>
    </div>
  );
}
