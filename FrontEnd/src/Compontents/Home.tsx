import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { getProducts } from "../Service/StockService";
import Navbar from "./Navbar";
import NoImage from "../image/NoImage.jpeg"; // Import NoImage.jpeg

const Home: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState<any[]>([]); // State to hold products
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

  // Get the quantity of a product from the cart
  const getProductQuantity = (productId: string) => {
    const product = cart.find((item) => item.StockNo === productId);
    return product ? product.IssQty : 0; // Reflect changes dynamically
  };

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function on component mount
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAF6E3", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Products Section */}
      <div className="container py-5">
        <h2
          className="text-center mb-5"
          style={{
            fontWeight: "bold",
            color: "#2A3663",
            textDecoration: "underline",
          }}
        >
          Our Products
        </h2>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.StockNo}>
              <div
                className="card h-100 text-center shadow-sm"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {/* Product Image */}
                <img
                  src={product.img || NoImage} // Use product image or fallback to NoImage
                  className="card-img-top"
                  alt={product.Name || "No Image"}
                  style={{
                    borderRadius: "15px",
                    maxHeight: "200px",
                    maxWidth: "100%",
                    objectFit: "contain", // Ensures the image fits nicely
                  }}
                />

                {/* Card Body */}
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      fontWeight: "bold",
                      color: "#2A3663",
                    }}
                  >
                    {product.Name}
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      color: "#28A745",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Rs.{product.Price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-outline-danger rounded-circle me-2"
                      onClick={() => removeFromCart(product.StockNo)}
                      style={{
                        width: "40px",
                        height: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      -
                    </button>
                    <span
                      className="fw-bold mx-3"
                      style={{
                        fontSize: "1.2rem",
                      }}
                    >
                      {getProductQuantity(product.StockNo)}
                    </span>
                    <button
                      className="btn btn-outline-primary rounded-circle"
                      onClick={() =>
                        addToCart({
                          StockNo: product.StockNo,
                          Name: product.Name,
                          Price: product.Price,
                          IssQty: 1, // Adding one item
                        })
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
