import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Compontents/Home'
import Login from './Compontents/Login'
import AdminPage from './Compontents/AdminPage'
import ProdutManagement from './Compontents/ProdutManagement'
import ViewProduct from './Compontents/Viewproduct'



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
      </Routes>
    </Router>
    </div>
  )
}

export default App
