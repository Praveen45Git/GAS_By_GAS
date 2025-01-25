import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Swal from "sweetalert2";

const ProductManagement: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [productNumber, setProductNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [newPrice, setNewIssuePrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Pre-fill the form if editing a product
  useEffect(() => {
    if (product) {
      axios
        .get("http://localhost:52944/api/Stocks/GetStock/" + product.StockNo)
        .then((response) => {
          const stockData = response.data;
          setProductNumber(stockData[0].StockNo || "");
          setProductName(stockData[0].Name || "");
          setPrice(stockData[0].Price || "");
          setNewIssuePrice(stockData[0].NewPrice || "");
        })
        .catch((error) => {
          console.error("There was an error fetching the products:", error);
        });
    }
  }, [product]);

  // Separate function to upload the image
  const uploadImageToFrontend = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:52944/upload-image", // Endpoint for image upload
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Image Uploaded",
          text: "The image has been uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        return response.data.filePath; // Path to the uploaded file
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to upload the image. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong while uploading the image.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return null;
    }
  };

  // Handle image selection and upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Display the image preview

      // Upload image to the server
      uploadImageToServer(file).then((filePath) => {
        if (filePath) {
          console.log("Image saved at:", filePath);
        }
      });
    }
  };

  const uploadImageToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:52944/upload-image", // Backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log("Image uploaded successfully:", response.data.filePath);
        Swal.fire("Success!", "Image uploaded successfully!", "success");
        return response.data.filePath; // Use this filePath to display the uploaded image
      } else {
        Swal.fire("Error!", "Image upload failed!", "error");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire(
        "Oops!",
        "Something went wrong while uploading the image.",
        "error"
      );
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("StockNo", productNumber);
    formData.append("Name", productName);
    formData.append("Price", price);
    formData.append("NewPrice", newPrice);

    if (productNumber === "") {
      errormsg("Please enter a Product No!", "Error");
      return;
    } else if (productName === "") {
      errormsg("Please enter a Product Name!", "Error");
      return;
    } else if (price === "") {
      errormsg("Please enter a Price!", "Error");
      return;
    } else if (newPrice === "") {
      errormsg("Please enter a New Price!", "Error");
      return;
    }

    try {
      setLoading(true);
      if (product) {
        // API call for updating the product
        await axios.put(
          "http://localhost:52944/api/Stocks/UpdateStocks",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({
          title: "Edit Product",
          text: `Product has been Updated!..`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/products");
        });
      } else {
        // API call for adding a new product
        await axios.post(
          "http://localhost:52944/api/Stocks/CreateStocks",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Swal.fire({
          title: "Product Added",
          text: `Product has been Added!..`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/products");
        });
      }
    } catch (error) {
      console.error("Error saving the product:", error);
      setLoading(false);
      alert("Failed to save the product. Please try again.");
    }
  };

  function errormsg(msg: string, title: string) {
    Swal.fire({
      title: title,
      text: msg,
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

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
            {product ? "Edit Product" : "Add New Product"}
          </h2>
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
                    style={{ backgroundColor: "#D8DBBD", color: "#2A3663" }}
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
                    style={{ backgroundColor: "#D8DBBD", color: "#2A3663" }}
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
                    style={{ backgroundColor: "#D8DBBD", color: "#2A3663" }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="newIssuePrice">
                  <Form.Label>New Issue Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter New Issue Price"
                    value={newPrice}
                    onChange={(e) => setNewIssuePrice(e.target.value)}
                    style={{ backgroundColor: "#D8DBBD", color: "#2A3663" }}
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
                    style={{ backgroundColor: "#D8DBBD", color: "#2A3663" }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {imagePreview && (
              <Row className="mt-3">
                <Col md={6}>
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Col>
              </Row>
            )}
            <div className="d-flex justify-content-center mt-4 gap-3">
              <Button
                type="submit"
                style={{ backgroundColor: "#2A3663", color: "#fff" }}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : product ? (
                  "Save Changes"
                ) : (
                  "Add Product"
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/admin/products")}
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
