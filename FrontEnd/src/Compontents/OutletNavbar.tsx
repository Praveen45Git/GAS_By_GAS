import React from "react";

const OutletNavbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#2A3663",
        color: "#FFFFFF",
        padding: "10px 20px",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          Outlet Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Payment
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Customer Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Order Schedule
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default OutletNavbar;
