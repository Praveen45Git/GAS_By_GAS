import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Compontents/Home";
import Login from "./Compontents/Login";
import AdminPage from "./Compontents/AdminPage";
import ProdutManagement from "./Compontents/ProdutManagement";
import ViewProduct from "./Compontents/Viewproduct";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <div>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/products" element={<ViewProduct />} />
            <Route path="/admin/products/add" element={<ProdutManagement />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
