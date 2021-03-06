import React from "react";
import RequestsPopover from "../rentRequestsPopover/RequestsPopover";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../../userPage/userNavbar/UserNavbar.css";
import RequestsNavLink from "../rentRequestsPopover/RequestsNavLink";
import { logout } from "../../../features/authentication/authSlice";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-color-nav"
        variant="dark"
      >
        <Navbar.Brand
          href="#adminPage"
          style={{ color: "#f3f169", fontSize: "25px" }}
        >
          <img
            src="https://www.euvic.pl/wp-content/uploads/2019/11/logo-euvic-it-1.png"
            width="140"
            height="60"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <RequestsNavLink />
            <RequestsPopover />
            <NavDropdown
              title={
                <span style={{ color: "#f3f169", fontSize: "25px" }}>Cars</span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#adminPage">Add car</NavDropdown.Item>
              <NavDropdown.Item href="#adminPage/removeCar">
                Manage car
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown
              title={
                <span style={{ color: "#f3f169", fontSize: "25px" }}>
                  Employer
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#adminPage/addEmployee">
                Add employee
              </NavDropdown.Item>
              <NavDropdown.Item href="#adminPage/removeEmployer">
                Manage employees
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link
              href="/login"
              onClick={() => dispatch(logout())}
              style={{ color: "red", fontSize: "25px" }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
