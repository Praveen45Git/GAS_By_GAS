import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavbar from './AdminNavbar';

interface StockDetail {
  StockNo: string;
  Name: string;
  Quantity: number;
  Amount: number;
}



const PaymentInterface: React.FC = () => {
  const [stockDetails, setStockDetails] = useState<StockDetail[]>([]);
  const [orderNo, setOrderNo] = useState<string>(() => `10`);
  const [customerId, setCustomerName] = useState<string>('');
  const [outlet, setOutlet] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [emptyGasCount, setEmptyGasCount] = useState<number>(0);

  const outlets = ['Outlet A', 'Outlet B', 'Outlet C'];

  useEffect(() => {
    axios
      .get<StockDetail[]>('http://localhost:52944/api/Stocks/GetAllStocks')
      .then((response) => setStockDetails(response.data))
      .catch((error) => {
        console.error('Error fetching stock details:', error);
        Swal.fire('Error', 'Failed to fetch stock details.', 'error');
      });
  }, []);

  const handleConfirm = () => {
    if (!customerId.trim() || !outlet || !scheduleDate || emptyGasCount <= 0) {
      Swal.fire('Error', 'Please fill out all the fields correctly.', 'error');
      return;
    }

    const payment = {
      tokenId: orderNo,
      customerId: customerId,
      outletId: outlet,
      payDate: scheduleDate,
      emptyQty: emptyGasCount,
    };

    axios
      .post('http://localhost:52944/api/Payments/ConfirmPayment', payment, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        Swal.fire('Success', 'Order confirmed successfully!', 'success');
        clearForm();
      })
      .catch((error) => {
        console.error('Error confirming the order:', error);
        Swal.fire('Error', 'Failed to confirm the order. Please try again.', 'error');
      });
  };

  const clearForm = () => {
    setOrderNo('10');
    setCustomerName('');
    setOutlet('');
    setScheduleDate('');
    setEmptyGasCount(0);
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel the current order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        clearForm();
        Swal.fire('Cancelled', 'The order has been cancelled.', 'info');
      }
    });
  };

  return (
    <div style={{ backgroundColor: '#FAF6E3', minHeight: '100vh' }}>
      <AdminNavbar />

      <div className="container py-5">
        <h2 className="mb-4" style={{ color: '#2A3663' }}> Payment Interface </h2>

        <Row className='mb-4'>
          <Col sm={5}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stock No</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {stockDetails.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.StockNo}</td>
                    <td>{stock.Name}</td>
                    <td>{stock.Quantity}</td>
                    <td>{stock.Amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col sm={1}></Col>

          <Col sm={5}>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}> Order No </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" value={orderNo} readOnly />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}> Customer Name </Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Enter Customer Name" value={customerId} 
                  onChange={(e) => setCustomerName(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}> Outlet </Form.Label>
                <Col sm={9}>
                  <Form.Control as="select" value={outlet} onChange={(e) => 
                    setOutlet(e.target.value)}>
                    <option value=""> Select an Outlet </option>
                    {outlets.map((outletOption, index) => (
                      <option key={index} value={outletOption}>{outletOption}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}> Schedule Date </Form.Label>
                <Col sm={9}>
                  <Form.Control type="date" value={scheduleDate} onChange={(e) => 
                    setScheduleDate(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}> Empty Gas Count </Form.Label>
                <Col sm={9}>
                  <Form.Control type="number" placeholder="Count" value={emptyGasCount} onChange={(e) => 
                    setEmptyGasCount(Math.max(0, parseInt(e.target.value) || 0))} />
                </Col>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="success" onClick={handleConfirm}> Pay </Button>
                <Button variant="danger" onClick={handleCancel}> Cancel </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentInterface;
