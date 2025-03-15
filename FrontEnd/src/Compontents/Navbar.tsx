import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCart } from "../CartContext";
import "sweetalert2/dist/sweetalert2.min.css"; // Ensure SweetAlert2 styles are imported
import axios from "axios";

interface NavbarProps {
  username: string; // Add a prop for the username
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const MySwal = withReactContent(Swal);

  const handleCartClick = (userName: string) => {
    if (cart.length === 0) {
      MySwal.fire("oops!", "Your order is empty!", "warning");
      return;
    }
    const renderTableContent = () =>
      cart
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

    const renderPopupHtml = () => `
      <div>
        <h5 class="text-center mb-3" style="font-weight: bold;">Hello, ${userName}!</h5>
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
            ${renderTableContent()}
          </tbody>
        </table>
      </div>
      <div class="row ">      
        <div class="col-6">
          <label for="outlet" style="font-weight: bold;">Outlet:</label>
          <select id="outlet" class="form-control mt-1">
            <option value="">Select Outlet</option>
            <option value="Outlet 1">Outlet 1</option>
            <option value="Outlet 2">Outlet 2</option>
            <option value="Outlet 3">Outlet 3</option>
          </select>
        </div>
        <div class="col-6">
          <label for="deliveryDate" style="font-weight: bold;">Delivery Date:</label>
          <input type="date" id="deliveryDate" class="form-control mt-1" />
        </div>
          <div class="col-6 mt-3">
          <label style="font-weight: bold;">Total Price:</label>
          <span>Rs.${cart.reduce(
            (acc, item) => acc + item.Price * item.IssQty,
            0
          )}</span>
        </div>
      </div>
    `;

    const openPopup = () => {
      MySwal.fire({
        title: "",
        html: renderPopupHtml(),
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

                // Dynamically update the popup content
                Swal.update({
                  html: renderPopupHtml(),
                });
              }
            });
          });
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deliveryDate = (
            document.getElementById("deliveryDate") as HTMLInputElement
          )?.value;
          const selectedOutlet = (
            document.getElementById("outlet") as HTMLSelectElement
          )?.value;

          if (!deliveryDate || !selectedOutlet) {
            MySwal.fire("Error", "Please fill in all details!", "error");
            return;
          }
          try {
            // Prepare the payload
            const Orders = {
              TokenId: new Date().getTime(), // Replace with actual token ID
              OutletId: selectedOutlet,
              CustomerId: userName, // Replace with actual customer ID
              DeliveryDate: deliveryDate,
              OrderDetail: cart.map((item) => ({
                StockNo: item.StockNo,
                Qty: item.IssQty,
                Price: item.Price,
                Amount: item.IssQty * item.Price,
              })),
            };

            // Make the API call
            const response = await axios.post(
              "http://localhost:52944/api/Stocks/InsertOrder",
              Orders
            );

            if (response.status === 200) {
              MySwal.fire("Success", "Order placed successfully!", "success");
              // Clear the cart and reset inputs
              cart.splice(0, cart.length); // Clear the cart array
              const outletSelect = document.getElementById(
                "outlet"
              ) as HTMLSelectElement;
              const deliveryDateInput = document.getElementById(
                "deliveryDate"
              ) as HTMLInputElement;
              // Clear the cart using the CartContext
              clearCart();
              if (outletSelect) outletSelect.value = ""; // Reset the outlet dropdown
              if (deliveryDateInput) deliveryDateInput.value = ""; // Reset the delivery date

              // Dynamically update the popup to reflect changes
              Swal.update({
                html: renderPopupHtml(),
              });
            } else {
              MySwal.fire("Error", "Failed to place the order!", "error");
            }
          } catch (error) {
            console.error(error);
            MySwal.fire("Error", "An error occurred during checkout.", "error");
          }
        }
      });
    };

    openPopup();
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
        {/* Username */}
        <span
          className="navbar-text me-auto"
          style={{ color: "#FFFFFF", fontSize: "1.2rem" }}
        >
          Welcome, {username}!
        </span>
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
                Orders
              </a>
            </li>
            <li className="nav-item">
              <button
                className="btn position-relative"
                onClick={() => handleCartClick(username)}
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
