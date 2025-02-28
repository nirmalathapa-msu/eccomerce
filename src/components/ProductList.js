import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.css"; // ✅ Ensure correct CSS path

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container">
      <h2>Available Products</h2>
      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">₹{product.price}</p>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
