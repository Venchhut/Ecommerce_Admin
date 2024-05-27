import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Order.css";

const TABLE_HEADS = [
  "No",
  "Order ID",
  "Username",
  "Address",
  "Order Type",
  "Price",
  "Payment Method",
  "Order Status",
  "Action",
];

const TABLE_DATA = [
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

const ITEMS_PER_PAGE = 5;

const Order = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = TABLE_DATA.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(TABLE_DATA.length / ITEMS_PER_PAGE);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Orders</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((dataItem) => (
              <tr key={dataItem.no}>
                <td>{dataItem.no}</td>
                <td>{dataItem.order_id}</td>
                <td>{dataItem.username}</td>
                <td>{dataItem.address}</td>
                <td>{dataItem.order_type}</td>
                <td>{dataItem.price} $</td>
                <td>{dataItem.payment_method}</td>
                <td>
                  <span
                    className={`status-badge ${dataItem.order_status.toLowerCase()}`}
                  >
                    {dataItem.order_status}
                  </span>
                </td>
                <td>
                  <Link to={`/order/:orderId`}>
                    <button className="view-details-btn">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"pagination-button"}
          previousClassName={"pagination-button"}
          nextClassName={"pagination-button"}
          breakLinkClassName={"pagination-button"}
        />
      </div>
    </section>
  );
};

export default Order;
