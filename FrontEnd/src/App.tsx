import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Login from './Components/Login'
import AdminPage from './Components/AdminPage'
import ProdutManagement from './Components/ProdutManagement'
import ViewProduct from './Components/Viewproduct'
import Payment from './Components/Payment'


function App() {
  return (
    <div>
     <Router>
      <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/products" element={<ViewProduct />} />
      <Route path="/admin/products/add" element={<ProdutManagement />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
