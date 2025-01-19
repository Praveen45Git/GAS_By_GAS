import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import Swal from "sweetalert2";

const ProductManagement: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [productNumber, setProductNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [newIssuePrice, setNewIssuePrice] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill the form if editing a product
  useEffect(() => {
    if (product) {
      setProductNumber(product.StockNo || '');
      setProductName(product.Name || '');
      setPrice(product.Price || '');
      setNewIssuePrice('');
    }
  }, [product]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const checkProductExistence = async (stockNo: string) => {
    try {
      const response = await axios.get(
        `http://localhost:52944/api/Stocks/CheckStock/${stockNo}`
      );
      return response.data.exists; // The backend should return { exists: true/false }
    } catch (error) {
      console.error("Error checking product existence:", error);
      Swal.fire("Oops!", "Something went wrong while checking the product.", "error");
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('StockNo', productNumber);
    formData.append('Name', productName);
    formData.append('Price', price);
    if (productImage) formData.append('ProductImage', productImage);

    try {
      setLoading(true);

      const exists = await checkProductExistence(productNumber);
      if (exists) {
        Swal.fire({
          title: "Product Already Exists",
          text: `The product "${productName}" is already in the system.`,
          icon: "warning",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return; // Exit function if product exists
      }

      if (product) {
        // API call for updating the product
        await axios.put('http://localhost:52944/api/Stocks/UpdateStocks', formData, {
          headers: {
            'Content-Type': 'application/json', // Ensure this matches the server's expectation
          },
        });
        alert('Product updated successfully!');
      } else {
        // API call for adding a new product
        await axios.post('http://localhost:52944/api/Stocks/CreateStocks', formData, {
          headers: {
            'Content-Type': 'application/json', // Ensure this matches the server's expectation
          },
        });
        alert('Product added successfully!');
      }

      setLoading(false);
      navigate('/admin/products'); // Redirect to the view page after successful submission
    } catch (error) {
      console.error('Error saving the product:', error);
      setLoading(false);
      alert('Failed to save the product. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF6E3', minHeight: '100vh' }}>
      <AdminNavbar/>
      <div className="container py-5">
        <h2 className="mb-4" style={{ color: '#2A3663' }}>
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <Card className="shadow-sm p-4">
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="productNumber">
                  <Form.Label>Product Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Number"
                    value={productNumber}
                    onChange={(e) => setProductNumber(e.target.value)}
                    style={{ backgroundColor: '#D8DBBD', color: '#2A3663' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    style={{ backgroundColor: '#D8DBBD', color: '#2A3663' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ backgroundColor: '#D8DBBD', color: '#2A3663' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="newIssuePrice">
                  <Form.Label>New Issue Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter New Issue Price"
                    value={newIssuePrice}
                    onChange={(e) => setNewIssuePrice(e.target.value)}
                    style={{ backgroundColor: '#D8DBBD', color: '#2A3663' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="productImage">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageUpload}
                    style={{ backgroundColor: '#D8DBBD', color: '#2A3663' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4 gap-3">
              <Button
                type="submit"
                style={{ backgroundColor: '#2A3663', color: '#fff' }}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : product ? (
                  'Save Changes'
                ) : (
                  'Add Product'
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/admin/products')}
                disabled={loading}
              >
                Back
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;
