import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchRequests();
    fetchOrders();
    fetchRevenueData();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/admin/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5001/admin/product-requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching product requests:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5001/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchRevenueData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/admin/orders");
      const sales = res.data.map(order => ({
        name: order.productId.name,
        revenue: order.totalPrice,
      }));
      setRevenueData(sales);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const addUser = async () => {
    const name = prompt("Enter Name:");
    const email = prompt("Enter Email:");
    const role = prompt("Enter Role (user/admin):");

    try {
      await axios.post("http://localhost:5001/admin/add-user", { name, email, role });
      alert("User added!");
      fetchUsers();
    } catch (error) {
      alert("Failed to add user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/admin/delete-user/${id}`);
      alert("User deleted!");
      fetchUsers();
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/admin/delete-product/${id}`);
      alert("Product deleted!");
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  const approveProduct = async (id) => {
    try {
      await axios.post(`http://localhost:5001/admin/approve-product/${id}`);
      alert("Product approved!");
      fetchRequests();
    } catch (error) {
      alert("Failed to approve product.");
    }
  };

  const rejectProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/admin/reject-product/${id}`);
      alert("Product request rejected!");
      fetchRequests();
    } catch (error) {
      alert("Failed to reject request.");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* Users Section */}
      <h3>Users</h3>
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.role}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Product Requests Section */}
      <h3>Product Requests</h3>
      <ul>
        {requests.map(request => (
          <li key={request._id}>
            {request.name} - ${request.price}
            <button onClick={() => approveProduct(request._id)}>Approve</button>
            <button onClick={() => rejectProduct(request._id)}>Reject</button>
          </li>
        ))}
      </ul>

      {/* Products Section */}
      <h3>Products</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Orders Section */}
      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            {order.productId.name} - {order.quantity} units - ${order.totalPrice}
          </li>
        ))}
      </ul>

      {/* Revenue Chart */}
      <h3>Revenue Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboard;
