import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "../../features/user/userActions";
import { userLogout } from "../../features/user/userActions";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Badge } from "antd";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Navbar.css";

let user = {
  isAdmin: true,
  isDoctor: false,
};

const userMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Appointments",
    path: "/appointments",
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
  },
];

const doctorMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Appointments",
    path: "/doctor/appointments",
  },
  {
    name: "Profile",
    // path: `/doctor/profile/${user?._id}`,
    path: "/",
  },
];

const adminMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Users",
    path: "/admin/userslist",
  },
  {
    name: "Doctors",
    path: "/admin/doctorslist",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];

const menuToBeRendered = user?.isAdmin
  ? adminMenu
  : user?.isDoctor
  ? doctorMenu
  : userMenu;
// const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

function NavMenu() {
  const { userInfo, userToken } = useSelector((state) => state.user);
  console.log(userInfo, userToken);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //logout user function
  function logoutUser() {
    navigate("/login", { replace: true });
    dispatch(userLogout());
    localStorage.clear();
  }

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbars">
      <Container fluid>
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
            {menuToBeRendered.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  className={isActive ? "Active" : undefined}
                  key={item.name + "3asfd2"}
                >
                  <Nav.Link as={Link} to={item.path}>
                    {item.name}
                  </Nav.Link>
                </div>
              );
            })}
            <NavDropdown title="List" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">Action 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Somet</NavDropdown.Item>
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
            <Badge count={1} color="white">
              <Icon
                icon="clarity:notification-line"
                color="white"
                hFlip={true}
                width="26"
                height="26"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </Badge>
            <NavDropdown
              title={
                <Icon
                  icon="bxs:user-circle"
                  color="white"
                  width="30"
                  height="30"
                  hFlip={true}
                />
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                {" "}
                <Button
                  variant="dark"
                  // style={{ marginLeft: "5%" }}
                  onClick={() => logoutUser()}
                >
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;
