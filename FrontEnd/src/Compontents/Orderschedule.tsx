import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Card, Form, Navbar } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

interface Order {
  id: number;
  date: string;
  productName: string;
  quantity: number;
}

const OrderSchedule: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, date: "2025-03-20", productName: "Gas 10kg", quantity: 10 },
    { id: 2, date: "2025-03-21", productName: "Gas 12kg", quantity: 5 },
    { id: 3, date: "2025-03-22", productName: "Gas 16kg", quantity: 20 },
  ]);
  const [date, setDate] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:52944/api/Orders/GetAllOrders')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleAddOrder = () => {
    const newOrder: Order = {
      id: Date.now(),
      date,
      productName,
      quantity,
    };
    setOrders([...orders, newOrder]);
    setDate('');
    setProductName('');
    setQuantity(0);
  };

  const handleDeleteOrder = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter(order => order.id !== id));
        Swal.fire("Deleted!", "Your order has been deleted.", "success");
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#FAF6E3", minHeight: "100vh", padding: "20px" }}>
      <Navbar />
      <div className="container py-5">
        <Card className="shadow-sm p-4">
          <h2 className="mb-4" style={{ color: '#2A3663' }}>Order Schedule</h2>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  />
                </Form.Group>
              </Col>
            </Row>
            </Form>

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default OrderSchedule;
