import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component
import { Link } from 'react-router-dom';


const AdminPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#FAF6E3', minHeight: '100vh' }}>
      {/* Include Admin Navbar */}
      <AdminNavbar />
      
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="bg-dark text-white p-4">
            <h3>GAS By GAS</h3>
            <nav className="nav flex-column">
              <Link to="/admin/products" className="text-white">Manage Products</Link>
              {/* Add more navigation items here */}
            </nav>
          </Col>

          {/* Main Content */}
          <Col md={10} className="p-4">
            <h1>Welcome to the Admin Dashboard</h1>
            {/* More dashboard content */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
