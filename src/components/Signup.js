import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


  // Ensure CSS file is linked

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", user);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <select name="role" onChange={handleChange} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
