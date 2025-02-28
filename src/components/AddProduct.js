import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"; // ✅ Ensure correct CSS path

const AddProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "", description: "", image: null });
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.image);

    try {
      const token = localStorage.getItem("token");

      if (role === "admin") {
        await axios.post("http://localhost:5000/add-product", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: token },
        });
        alert("Product added successfully!");
      } else {
        await axios.post("http://localhost:5000/request-product", formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: token },
        });
        alert("Product request submitted! Awaiting admin approval.");
      }

      navigate("/view-products");
    } catch (error) {
      alert("Error submitting product!");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>{role === "admin" ? "Add Product" : "Request Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
          <button type="submit">{role === "admin" ? "Add Product" : "Request Product"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
