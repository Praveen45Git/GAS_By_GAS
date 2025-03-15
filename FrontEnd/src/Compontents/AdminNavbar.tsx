import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";

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
                textDecoration: isActive("/admin/dashboard")
                  ? "underline"
                  : "none",
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
                textDecoration: isActive("/admin/products")
                  ? "underline"
                  : "none",
                fontWeight: isActive("/admin/products") ? "bold" : "normal",
              }}
            >
              Manage Products
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link
              to="/admin/products/outlets"
              className="nav-link"
              style={{
                color: isActive("/admin/products/outlets")
                  ? "#2A3663"
                  : "inherit",
                textDecoration: isActive("/admin/products/outlets")
                  ? "underline"
                  : "none",
                fontWeight: isActive("/admin/products/outlets")
                  ? "bold"
                  : "normal",
              }}
            >
              Dispatch
            </Link>
          </Nav.Item>

          {/* Outlet Dropdown Menu */}
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="outlet-dropdown"
              className="nav-link"
              style={{
                color: "#2A3663",
                fontWeight: "bold",
              }}
            >
              Outlet
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/admin/outlet-inventory-summary"
                style={{
                  color: isActive("/admin/outlet-inventory-summary")
                    ? "#2A3663"
                    : "inherit",
                  fontWeight: isActive("/admin/outlet-inventory-summary")
                    ? "bold"
                    : "normal",
                }}
              >
                Outlet Inventory Summary
              </Dropdown.Item>

              <Dropdown.Item
                as={Link}
                to="/admin/order-detail"
                style={{
                  color: isActive("/admin/order-detail")
                    ? "#2A3663"
                    : "inherit",
                  fontWeight: isActive("/admin/order-detail")
                    ? "bold"
                    : "normal",
                }}
              >
                Order Detail
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Add other navigation items as needed */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
