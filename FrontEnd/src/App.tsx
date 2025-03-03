import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./Compontents/Home";
import Login from "./Compontents/Login";
import AdminPage from "./Compontents/AdminPage";
import ProdutManagement from "./Compontents/ProdutManagement";
import ViewProduct from "./Compontents/Viewproduct";
import { CartProvider } from "./CartContext";
import ConnectionStatus from "./Compontents/ConnectionStatus";
import ViewOutlets from "./Compontents/ViewOutlets";
import Orderschedule from "./Compontents/Orderschedule";

function App() {
  const [username, setUsername] = useState<string>("");
  return (
    <div>
      <ConnectionStatus />
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/products" element={<ViewProduct />} />
            <Route path="/admin/products/add" element={<ProdutManagement />} />
            <Route path="/admin/products/outlets" element={<ViewOutlets />} />
            <Route path="/Outlet/Orderschedule" element={<Orderschedule />} />
            <Route path="/" element={<Login setUsername={setUsername} />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
