import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeaderComponent.css";
import clockImage from "../assets/clockImage.png";
const HeaderComponent = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="color-nav"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="#home">
            <div className="d-flex">
              <img
                alt=""
                src={clockImage}
                width="100px"
                height="40px"
                className="d-inline-block align-top"
              />
              <h2>Simply Book</h2>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarScroll"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <NavLink eventKey="1" as={Link} to="/home">
                HOME
              </NavLink>
              <NavLink eventKey="2" as={Link} to="/login">
                LOGIN
              </NavLink>
              <NavLink eventKey="3" as={Link} to="/signup">
                SIGN UP
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
