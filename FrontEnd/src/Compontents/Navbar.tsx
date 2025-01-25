import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCart } from "../CartContext";
import "sweetalert2/dist/sweetalert2.min.css"; // Ensure SweetAlert2 styles are imported

const Navbar: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const MySwal = withReactContent(Swal);

  const handleCartClick = () => {
    const tableContent = cart
      .map(
        (item) => `
      <tr>
        <td>${item.StockNo}</td>
        <td>${item.Name}</td>
        <td>${item.IssQty}</td>
        <td>${item.Price}</td>
        <td>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${item.StockNo}">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");

    MySwal.fire({
      title: "Your Cart",
      html: `
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>StockNo</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${tableContent}
          </tbody>
        </table>
      `,
      showCancelButton: true,
      confirmButtonText: "Checkout",
      cancelButtonText: "Close",
      focusConfirm: false,
      didOpen: () => {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const target = event.target as HTMLButtonElement;
            const stockNo = target.getAttribute("data-id");
            if (stockNo) {
              removeFromCart(stockNo);
              handleCartClick(); // Refresh the popup
            }
          });
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Success", "Proceeding to checkout!", "success");
      }
    });
  };

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
        <a className="navbar-brand" href="#">
          E-Commerce
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
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Login
              </a>
            </li>
            <li className="nav-item">
              <button
                className="btn position-relative"
                onClick={handleCartClick}
              >
                <i
                  className="fas fa-truck"
                  style={{ color: "#FFFFFF", fontSize: "1.5rem" }}
                ></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.reduce((total, item) => total + item.IssQty, 0)}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
