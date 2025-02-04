import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleCartClick = () => {
        if (cartCount > 0) {
            navigate('/payment');
        } else {
            alert('Your cart is empty! Please add products before proceeding to payment.')
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">E-Commerce</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link position-relative" href="#" onClick={handleCartClick}>
                                Cart
                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                >
                                    {cartCount}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
