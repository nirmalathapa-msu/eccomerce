import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // ✅ Ensure correct CSS path

const Login = ({ setUserRole }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", user);
      alert("Login successful!");

      // ✅ Save token & user role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setUserRole(res.data.role);

      // ✅ Redirect based on role
      if (res.data.role === "admin") {
        navigate("/add-product");
      } else {
        navigate("/view-products");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

