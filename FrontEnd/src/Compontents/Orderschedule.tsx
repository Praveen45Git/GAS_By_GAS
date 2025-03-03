import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Card,  Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing FontAwesome icons
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


interface Product {
  StockNo: string;
  Name: string;
  Price: number;
  RecQty: number;
  IssQty: number;
  StockInQty: number;
}

const Orderschedule: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const navigate = useNavigate();
  // Fetch product data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:52944/api/Stocks/GetAllStocks') // Adjust the URL to your API
      .then((response) => {
        setProducts(response.data); // Set the fetched data to the state
      })
      .catch((error) => {
        console.error('There was an error fetching the products:', error);
      });
  }, []);

  const handleEdit = (product: any) => {
    // Navigate to ProductManagement with the selected product
    navigate('/admin/products/add', { state: { product } });
  };

  const refreshPage = () => {
    navigate(0); // This will force a page reload without using `window.location.reload()`
  };
  
  // Handle product deletion
  const deleteProduct = async (stockNo: string) => {  
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete Stock with Account No: ${stockNo}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:52944/api/Stocks/DeleteStocks/${stockNo}`);
            Swal.fire("Deleted!", response.data, "success").then(() => {;
            refreshPage();
            });
            return;
            // Refresh the page or perform necessary actions after deletion
          } catch (error) {
            console.error("Error deleting product:", error);
            Swal.fire("Oops!", "Something went wrong.", "error");
          }
        }
      });   
  };


  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#FAF6E3", minHeight: "100vh", padding: "20px" }}>
      <AdminNavbar />

      <div className="container py-5">

      <Card className="shadow-sm p-4">
        <h2 className="mb-4" style={{ color: '#2A3663' }}>Product Management</h2>

        {/* Search Box */}
        <Form className="mb-4">
          <Form.Group controlId="searchQuery">
            <Form.Label>Search by Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: '#D8DBBD', color: '#2A3663' }}
            />
          </Form.Group>
        </Form>

        {/* Add New Product Button */}
        <Link to="/admin/products/add">
          <Button style={{ backgroundColor: '#2A3663', color: '#fff' }}>Add New Product</Button>
        </Link>

        {/* Product Table */}
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Stock No</th>
              <th style={{ width: '25%' }}>Name</th> {/* Make Name column wider */}
              <th>Price</th>
              <th>Received Qty</th>
              <th>Issued Qty</th>
              <th>Stock In Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.StockNo}</td>
                <td>{product.Name}</td>
                <td>{product.Price}</td>
                <td>{product.RecQty}</td>
                <td>{product.IssQty}</td>
                <td>{product.StockInQty}</td>
                <td>
                  {/* Action buttons */}
                  <Row className="justify-content-center">
                    <Col className="text-center" md={6} sm={3} xs={6}>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit style={{ marginRight: '5px' }} /> Edit
                      </Button>
                    </Col>
                    <Col className="text-center" md={6} sm={3} xs={6}>
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(product.StockNo)}
                      >
                        <FaTrash style={{ marginRight: '5px' }} /> Delete
                      </Button>
                    </Col>
                  </Row>
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



export default Orderschedule;