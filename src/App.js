import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";
import "./styles/styles.css";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setUserRole(null);
  };

  return (
    <Router>
      <nav className="navbar">
        {/* ✅ Logo */}
        <Link to="/">
          <img src="/logo.webp" alt="Brand Logo" className="logo" />
        </Link>

        {/* ✅ Hamburger Menu Toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* ✅ Navigation Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          {userRole === "admin" && <Link to="/add-product" onClick={() => setMenuOpen(false)}>Add Product</Link>}
          {userRole === "admin" && <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>}
          <Link to="/view-products" onClick={() => setMenuOpen(false)}>View Products</Link>
          {userRole && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
        </div>
      </nav>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/add-product" element={userRole === "admin" ? <AddProduct /> : <h2>Access Denied</h2>} />
        <Route path="/admin-dashboard" element={userRole === "admin" ? <AdminDashboard /> : <h2>Access Denied</h2>} />
        <Route path="/view-products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
