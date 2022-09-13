import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap"; 

import { FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Navbar.css";

function NavMenu() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="navbars">
      <Container fluid>
        {/* <Navbar.Brand href="#">NextDr</Navbar.Brand> */}
        <Link className="nav-logo" to="/">
          NextDr
          <img
            alt="logo"
            style={{ width: "3.2rem" }}
            src={require("./logo.png")}
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", fontSize: "20px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Doctors</Nav.Link>
            <NavDropdown title="List" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>

          {/* user icon */}
          <Nav className="NavIcon">
            <NavDropdown title={<FaUserMd />} id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <FaUserMd />
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
               Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
