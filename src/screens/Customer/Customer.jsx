import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Customer.css";

const TABLE_HEADS = [
  "ID",
  "Name",
  "Email",
  "Phone Number",
  "Avatar",
  "Address",
  "Action",
];

const ITEMS_PER_PAGE = 9;

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/user");
      setUsers(res.data.user); // Accessing the 'user' array from the response
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentUsers = users.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Users</h4>
      </div>
      <div className="data-table-diagram">
        {currentUsers.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  {TABLE_HEADS.map((th, index) => (
                    <th key={index}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1 + offset}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber || "-"}</td>
                    <td>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{user.address || "-"}</td>
                    <td className="dt-cell-action">
                      {/* Placeholder for actions */}
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
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"pagination-button"}
              previousClassName={"pagination-button"}
              nextClassName={"pagination-button"}
              breakLinkClassName={"pagination-button"}
            />
          </>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </section>
  );
};

export default Customer;
