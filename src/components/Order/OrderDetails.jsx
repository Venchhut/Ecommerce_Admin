import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./OrderDetails.css"; // Import the CSS file
import Cookies from "js-cookie";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL parameters
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(""); // State for updating status
  const token = Cookies.get("token");
  useEffect(() => {
    // Fetch the order details from the backend API
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8800/api/order/detail/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrder(data);
        setStatus(data.status); // Initialize status state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      console.log(status);
      const response = await fetch(
        `http://localhost:8800/api/tracking/updateStatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      // alert("Order status updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {/* Add Link to navigate back to order list */}
      <Link to="/order" className="back-button">
        Go back
      </Link>
      {order ? (
        <div className="row">
          <div className="col-md-6">
            <div className="delivery-details">
              <h2>Delivery Details</h2>
              <form>
                {/* <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" value={order.name} readOnly />
                </div> */}
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={order.email} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" id="phone" value={order.phone} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="deliveryType">Delivery Type:</label>
                  <input
                    type="text"
                    id="deliveryType"
                    value={order.payment}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <textarea id="address" readOnly>
                    {order.address}
                  </textarea>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <h2>Order Details</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.OrderItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.Product.image}
                        alt={item.Product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                      {item.Product.name}
                    </td>
                    <td>${item.Product.price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="order-summary">
              {/* <p>
                <strong>Coupon Discount:</strong> {order.couponDiscount} %
              </p> */}
              {/* <p>
                <strong>Delivery:</strong> ${order.deliveryCost}
              </p> */}
              <p>
                <strong>Total Price:</strong> ${order.amount}
              </p>
            </div>
            <div className="order-status">
              <label htmlFor="status">
                <strong>Status:</strong>
              </label>
              <select id="status" value={status} onChange={handleStatusChange}>
                <option value="Under Process">Under Process</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button onClick={handleUpdateStatus}>Update Status</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No order details available</p>
      )}
    </div>
  );
};

export default OrderDetails;
