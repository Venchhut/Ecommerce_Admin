import React from "react";
import { useParams, Link } from "react-router-dom";
import "./OrderDetails.css"; // Add necessary CSS for styling

const orders = [
  // Your data here...
  // For demonstration purposes, duplicate the original data
  // and add more entries to simulate a larger dataset
  {
    no: 1,
    order_id: "Order #93",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 1134,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 2,
    order_id: "Order #94",
    username: "Chheavvey",
    address: "No address available",
    order_type: "Receive",
    price: 1000,
    payment_method: "Cash",
    order_status: "Pending",
  },
  {
    no: 3,
    order_id: "Order #95",
    username: "Chheavvey",
    address: "23 Ta Quang Buu , Bach Khoa Hai Ba Trung, Hanoi",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Canceled",
  },
  {
    no: 4,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 5,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 6,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 7,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 8,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 9,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 10,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 11,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 12,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 13,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
  {
    no: 14,
    order_id: "Order #96",
    username: "Chheavvey",
    address: "បុរីសៀមរាប សង្កាត់សាលាកំរើក ខណ្ឌសាលាកំរើក",
    order_type: "Delivery",
    price: 410,
    payment_method: "Cash",
    order_status: "Delivered",
  },
];

const OrderDetails = () => {
  const { orderId } = useParams();
  const order = orders.find((o) => o.order_id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details-container">
      <button className="back-button">
        <Link to="/">Back</Link>
      </button>
      <div className="details-section">
        <h3>Delivery Details</h3>
        <p>
          <strong>Name:</strong> {order.username}
        </p>
        <p>
          <strong>Email:</strong> veykh@gmail.com
        </p>{" "}
        {/* Example email */}
        <p>
          <strong>Phone:</strong> 0879703710
        </p>{" "}
        {/* Example phone */}
        <p>
          <strong>Delivery Type:</strong> {order.order_type}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
      </div>
      <div className="details-section">
        <h3>Order Details</h3>
        <p>
          <strong>Product:</strong> {order.order_id}
        </p>
        <p>
          <strong>Price:</strong> {order.price} $
        </p>
        {/* Add more product details if available */}
        <p>
          <strong>Coupon Discount:</strong> 20 %
        </p>
        <p>
          <strong>Delivery:</strong> 10 $
        </p>
        <p>
          <strong>Total Price:</strong> 1134 $
        </p>
      </div>
      <div className="details-section">
        <h3>Status</h3>
        <p>{order.order_status}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
