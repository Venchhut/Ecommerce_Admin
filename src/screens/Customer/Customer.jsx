import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";

const Customer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/user");
        setUsers(res.data.user); // Accessing the 'user' array from the response
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getAllUser();
  }, []);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Users</h4>
      </div>
      <div className="data-table-diagram">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Avatar</th>
                <th>Address</th>
                {/* <th>Role</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber || "-"}</td>
                  <td>{user.avatar}</td>
                  <td>{user.address || "-"}</td>
                  {/* <td>{user.role}</td> */}
                  <td className="dt-cell-action">
                    {" "}
                    {/* Placeholder for actions */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </section>
  );
};

export default Customer;
