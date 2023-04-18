import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../assets/img/CredsProtocolLogo.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Github } from "react-bootstrap-icons";
import { Twitter } from "react-bootstrap-icons";
import { BrowserRouter as Router } from "react-router-dom";
import { BookHalf } from "react-bootstrap-icons";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <span className="navbar-text" style={{ color: "white" }}>
              <img src={logo} alt="Logo" /> &nbsp; Creds Protocol
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            </Nav>
            <span className="navbar-text">
            <div className="social-icon">
                <BookHalf
                  color="white"
                  size={30}
                  onClick={() =>
                    openInNewTab("https://creds-protocol-documentation.vercel.app/")
                  }
                />
              </div>
              <div className="social-icon"></div>
              <div className="social-icon">
                <Twitter
                  color="white"
                  size={30}
                  onClick={() =>
                    openInNewTab("https://twitter.com/CredsProtocol")
                  }
                />
              </div>
              <div className="social-icon"></div>
              <div className="social-icon">
                <Github
                  color="white"
                  size={30}
                  onClick={() =>
                    openInNewTab("https://github.com/Creds-Protocol")
                  }
                />
              </div>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};
