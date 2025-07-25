import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "40px 0" }}>
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5 style={{ color: "#fff" }}>BookMyShow</h5>
            <p style={{ fontSize: "14px" }}>
              India's biggest entertainment destination. Movies, Events, Plays, Sports & more.
            </p>
          </Col>
          <Col md={3} sm={6}>
            <h6 style={{ color: "#ddd" }}>Help</h6>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="#" style={linkStyle}>About Us</a></li>
              <li><a href="#" style={linkStyle}>Contact Us</a></li>
              <li><a href="#" style={linkStyle}>FAQs</a></li>
              <li><a href="#" style={linkStyle}>Terms & Conditions</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h6 style={{ color: "#ddd" }}>Explore</h6>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="#" style={linkStyle}>Movies</a></li>
              <li><a href="#" style={linkStyle}>Events</a></li>
              <li><a href="#" style={linkStyle}>Plays</a></li>
              <li><a href="#" style={linkStyle}>Offers</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h6 style={{ color: "#ddd" }}>Connect with Us</h6>
            <div style={{ fontSize: "20px" }}>
              <a href="#" style={iconStyle}><i className="fab fa-facebook"></i></a>
              <a href="#" style={iconStyle}><i className="fab fa-twitter"></i></a>
              <a href="#" style={iconStyle}><i className="fab fa-instagram"></i></a>
              <a href="#" style={iconStyle}><i className="fab fa-youtube"></i></a>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "#666" }} />
        <p className="text-center" style={{ fontSize: "14px", marginTop: "10px" }}>
          © {new Date().getFullYear()} BookMyShow. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

const linkStyle = {
  color: "#ccc",
  textDecoration: "none",
  fontSize: "14px",
  marginBottom: "8px",
  display: "block",
};

const iconStyle = {
  color: "#fff",
  marginRight: "15px",
};

export default Footer;
