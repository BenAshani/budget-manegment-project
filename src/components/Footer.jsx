import React from "react";
import "../style/Footer.css";

//Footer images
import facebook from "../../images/facebook-footer-white.png";
import twitter from "../../images/twitter-footer-white.png";
import linkedin from "../../images/linkedin-footer-white.png";
import youtube from "../../images/youtube-footer-white.png";
import appLogo from "../../images/navbar-icon.png";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="title">
            <img src={appLogo} style={{ width: "50px", height: "50px" }} />
            <h2>BudgetBuddy</h2>
          </div>
          <p>
            Could your money be working harder for you? There’s a richer way to
            wealth. Contact our team today.
          </p>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>© 2023 BudgetBuddy | All Rights Reserved.</p>
        <div className="footer-bottom-images">
          <img src={facebook} style={{ width: "28px", height: "28px" }} />
          <img src={twitter} style={{ width: "28px", height: "28px" }} />
          <img src={linkedin} style={{ width: "28px", height: "28px" }} />
          <img src={youtube} style={{ width: "27px", height: "27px" }} />
        </div>
      </div>
    </div>
  );
}