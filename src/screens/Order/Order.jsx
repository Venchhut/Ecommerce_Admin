import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie";
import "./Order.css";

const TABLE_HEADS = [
  "No",

  "User ID",
  "Email",
  "Address",
  "Payment Method",
  "Phone Number",
  "Order date",
  "Order Status",
  "Action",
];

const ITEMS_PER_PAGE = 8;

const Order = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]); // Fetch orders when currentPage changes

  const fetchOrders = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:8800/api/order/all?page=${currentPage + 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = orders.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(orders.length / ITEMS_PER_PAGE);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            {currentItems.map((dataItem, index) => (
              <tr key={index}>
                <td>{offset + index + 1}</td>

                <td>#{dataItem.UserId}</td>
                <td>{dataItem.email}</td>
                <td>{dataItem.address}</td>
                <td>{dataItem.payment}</td>
                <td>{dataItem.phone} </td>
                <td>{dataItem.createdAt}</td>
                <td>
                  <span
                    className={`status-badge ${
                      dataItem.order_status
                        ? dataItem.order_status.toLowerCase()
                        : ""
                    }`}
                  >
                    {dataItem.order_status || "Unknown"}
                  </span>
                </td>
                <td>
                  <Link to={`/order/${dataItem.id}`}>
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
