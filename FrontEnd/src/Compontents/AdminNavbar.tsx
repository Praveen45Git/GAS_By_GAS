import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AdminNavbar: React.FC = () => {
  const location = useLocation();

  // Function to check if the current route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="#" style={{ color: "#2A3663", fontWeight: "bold" }}>
        GAS BY GAS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

        <Nav.Item>
            <Link
              to="/admin/dashboard"
              className="nav-link"
              style={{
                color: isActive("/admin/dashboard") ? "#2A3663" : "inherit",
                textDecoration: isActive("/admin/dashboard") ? "underline" : "none",
                fontWeight: isActive("/admin/dashboard") ? "bold" : "normal",
              }}
            >
              Dashboard
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              to="/admin/products"
              className="nav-link"
              style={{
                color: isActive("/admin/products") ? "#2A3663" : "inherit",
                textDecoration: isActive("/admin/products") ? "underline" : "none",
                fontWeight: isActive("/admin/products") ? "bold" : "normal",
              }}
            >
              Manage Products
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              to="/admin/Dispatch"
              className="nav-link"
              style={{
                color: isActive("/admin/Dispatch") ? "#2A3663" : "inherit",
                textDecoration: isActive("/admin/Dispatch") ? "underline" : "none",
                fontWeight: isActive("/admin/Dispatch") ? "bold" : "normal",
              }}
            >
              Dispatch
            </Link>
          </Nav.Item>
          {/* Add other navigation items as needed */}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
