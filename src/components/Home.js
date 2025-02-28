import { Link } from "react-router-dom";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import "@fontsource/poppins";

const Home = () => {
  const message = "Shop Smart, Shop Easy!";
  const [text, setText] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    let i = 0;
    setText(""); // Reset before typing

    const interval = setInterval(() => {
      if (i < message.length) {
        setText(message.substring(0, i + 1)); // ✅ Build text progressively
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed

    setFadeIn(true); // Start fade-in effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* ✅ Logo with Fade-in */}
      <img src="/logo.webp" alt="Brand Logo" className={`logo ${fadeIn ? "fade-in" : ""}`} />

      {/* ✅ Fixed Typewriter Effect */}
      <h1 className="typewriter">{text}</h1>

      <p>Your one-stop destination for trendy fashion, latest gadgets, and unbeatable deals.</p>
      <p>Find everything you need, right at your fingertips!</p>

      {/* ✅ Highlighted Features Section */}
      <div className="features">
        <div className="feature-card">
          <img src="/fast-delivery.avif" alt="Fast Delivery" />
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered within 24 hours.</p>
        </div>

        <div className="feature-card">
          <img src="/secure-payment.webp" alt="Secure Payment" />
          <h3>Secure Payment</h3>
          <p>100% safe and secure transactions.</p>
        </div>

        <div className="feature-card">
          <img src="/best-deals.png" alt="Best Deals" />
          <h3>Best Deals</h3>
          <p>Unbeatable discounts and offers on top brands.</p>
        </div>
      </div>

      

      {/* ✅ Action Buttons */}
      <div className="home-buttons">
        <Link to="/view-products" className="btn">Start Shopping</Link>
        <Link to="/signup" className="btn btn-alt">Join Us</Link>
      </div>
    </div>
  );
};

export default Home;
