import React from "react";
import {
  Table,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import OutletNavBar from "./outletnavbar";

const OutletDashboard: React.FC = () => {
  return (
    <>
      <OutletNavBar />
      <Container className="mt-4">
        <h2 className="text-center mb-4" style={{ color: "#2A3663" }}>
          Outlet Dashboard
        </h2>
        <Row>
          <Col md={6}>
            <Card className="shadow-lg rounded">
              <CardBody>
                <CardTitle className="text-center fw-bold text-primary">
                  Pending Orders
                </CardTitle>
                <Table className="table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Token No</th>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>Item Count</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>101</td>
                      <td>John Doe</td>
                      <td>2025-02-05</td>
                      <td>2</td>
                      <td>5000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg rounded">
              <CardBody>
                <CardTitle className="text-center fw-bold text-success">
                  Delivered Orders
                </CardTitle>
                <Table className="table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Token No</th>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>Item Count</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>102</td>
                      <td>Jane Smith</td>
                      <td>2025-02-04</td>
                      <td>1</td>
                      <td>25000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
            <Card className="shadow-lg rounded">
              <CardBody>
                <CardTitle className="text-center fw-bold text-warning">
                  Order Schedule
                </CardTitle>
                <Table className="table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Token No</th>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>Item Count</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>103</td>
                      <td>Mike Ross</td>
                      <td>2025-02-06</td>
                      <td>3</td>
                      <td>70005</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg rounded">
              <CardBody>
                <CardTitle className="text-center fw-bold text-danger">
                  Stock Details
                </CardTitle>
                <Table className="table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Stock No</th>
                      <th>Stock Name</th>
                      <th>Price</th>
                      <th>Stock in Qty</th>
                      <th>Received Qty</th>
                      <th>Issued Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2001</td>
                      <td>LP Gas Cylinder</td>
                      <td>5000</td>
                      <td>500</td>
                      <td>100</td>
                      <td>50</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OutletDashboard;
