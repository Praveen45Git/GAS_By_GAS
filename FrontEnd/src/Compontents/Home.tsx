import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { getProducts } from '../Service/StockService'

const Home: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const [products, setProducts] = useState<any[]>([]); // State to hold products
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading


    // Get the quantity of a product from the cart
    const getProductQuantity = (productId: string) => {
        const product = cart.find((item) => item.id === productId); // Match with StockNo
        return product ? product.quantity : 0;
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
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div>
            {/* Carousel Section */}
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://via.placeholder.com/800x400?text=Slide+1" className="d-block w-100" alt="Slide 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/800x400?text=Slide+2" className="d-block w-100" alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://via.placeholder.com/800x400?text=Slide+3" className="d-block w-100" alt="Slide 3" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Products Section */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Our Product</h2>
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.StockNo}>
                            <div className="card h-100 text-center rounded-4 shadow">
                                <img
                                    src={product.img}
                                    className="card-img-top p-3 rounded-4"
                                    alt={product.name}
                                    style={{ borderRadius: '10px' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.StockNo} {product.Name}</h5>
                                    <p className="card-text text-success fw-bold">{product.Price}</p>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button
                                            className="btn btn-outline-danger rounded-circle me-2"
                                            onClick={() => removeFromCart(product.StockNo)}
                                        >
                                            -
                  </button>
                                        <span className="fw-bold mx-2">{getProductQuantity(product.StockNo)}</span>
                                        <button
                                            className="btn btn-outline-primary rounded-circle"
                                            onClick={() => addToCart({ ...product, quantity: 1 })}
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
