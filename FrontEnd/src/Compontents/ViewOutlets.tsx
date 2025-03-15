import React, { useState } from "react";
import { Button, Table, Card } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import Swal from "sweetalert2";

interface Order {
  OrderID: string;
  CustomerName: string;
  ProductName: string;
  Quantity: number;
  Status: string;
}

interface Outlet {
  OutletID: string;
  Name: string;
  Location: string;
  Orders: Order[];
}

const ViewOutlets: React.FC = () => {
  const [outlets, setOutlets] = useState<Outlet[]>([
    {
      OutletID: "1",
      Name: "SVM",
      Location: "Galle",
      Orders: [
        {
          OrderID: "101",
          CustomerName: "John Doe",
          ProductName: "Laptop",
          Quantity: 2,
          Status: "Pending",
        },
        {
          OrderID: "102",
          CustomerName: "Jane Smith",
          ProductName: "Phone",
          Quantity: 1,
          Status: "Dispatched",
        },
      ],
    },
    {
      OutletID: "2",
      Name: "SVS",
      Location: "Wattala",
      Orders: [
        {
          OrderID: "103",
          CustomerName: "Alice Johnson",
          ProductName: "Tablet",
          Quantity: 3,
          Status: "Pending",
        },
      ],
    },
  ]);

  const handleDispatch = (orderId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark order ${orderId} as dispatched?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2A3663",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Dispatch!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOutlets((prevOutlets) =>
          prevOutlets.map((outlet) => ({
            ...outlet,
            Orders: outlet.Orders.map((order) =>
              order.OrderID === orderId
                ? { ...order, Status: "Dispatched" }
                : order
            ),
          }))
        );
        Swal.fire(
          "Dispatched!",
          "Order has been marked as dispatched.",
          "success"
        );
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF6E3",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <AdminNavbar />
      <div className="container py-5">
        <Card className="shadow-sm p-4">
          <h2 className="mb-4" style={{ color: "#2A3663" }}>
            Dispatch Management
          </h2>
          {outlets.map((outlet) => (
            <Card key={outlet.OutletID} className="mb-4 p-3">
              <h4 style={{ color: "#2A3663" }}>{outlet.Name}</h4>
              <p style={{ color: "#555" }}>Location: {outlet.Location}</p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {outlet.Orders.map((order) => (
                    <tr key={order.OrderID}>
                      <td>{order.OrderID}</td>
                      <td>{order.CustomerName}</td>
                      <td>{order.ProductName}</td>
                      <td>{order.Quantity}</td>
                      <td>{order.Status}</td>
                      <td>
                        {order.Status !== "Dispatched" && (
                          <Button
                            variant="success"
                            onClick={() => handleDispatch(order.OrderID)}
                          >
                            Dispatch
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default ViewOutlets;
