import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { userLogout } from "../../features/user/userActions";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Badge } from "antd";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Navbar.css";

const logoutUserMenu = [];

const userMenu = [
  {
    name: "Home",
    path: "/home",
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
    path: "/home",
  },
  {
    name: "Appointments",
    path: "/appointments",
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
    path: "/home",
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

// const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

function NavMenu() {
  const location = useLocation();
  const pathElements = location.pathname.split("/");
  const pathname = `/${pathElements[1]}`;

  const { userInfo, userToken } = useSelector((state) => state.user);

  const menuToBeRendered =
    userInfo?.role === "admin"
      ? adminMenu
      : userInfo?.role === "doctor"
      ? doctorMenu
      : userInfo?.role === "patient"
      ? userMenu
      : logoutUserMenu;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //logout user function
  function logoutUser() {
    navigate("/", { replace: true });
    dispatch(userLogout());
    localStorage.clear();
  }

  // automatically authenticate user if token is found
  useEffect(() => {}, [userToken, dispatch, userInfo]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbars">
      <Container fluid>
        <Link className="nav-logo" to="/">
          NextDr
          <img
            alt="logo"
            style={{ width: "3.2rem" }}
            src={process.env.PUBLIC_URL + "logo.png"}
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", fontSize: "20px", marginLeft: "10%" }}
            navbarScroll
          >
            {menuToBeRendered.map((item) => {
              const isActive = pathname === item.path;

              return (
                <div key={item.name + "3asfd2"}>
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    className={isActive ? "Active" : undefined}
                  >
                    {item.name}
                  </Nav.Link>
                </div>
              );
            })}
            {userInfo ? (
              <>
                <NavDropdown title="List" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Action 2</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Somet</NavDropdown.Item>
                </NavDropdown>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </>
            ) : null}
          </Nav>
          {userInfo ? (
            <>
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
                  <NavDropdown.Item href="#action/3.2">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {/* <NavDropdown.Item href="#"> */}{" "}
                  <Button
                    variant="dark"
                    style={{ marginLeft: "5%" }}
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </Button>
                  {/* </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <>
              {/* user icon */}
              <Nav className="NavIcon">
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
                  <NavDropdown.Item as={Link} to="/login">
                    <i className="fas fa-user-md"> Login</i>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    <i className="fas fa-users"> Register</i>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;