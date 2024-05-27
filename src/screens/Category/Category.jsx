import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons"; // Added faPlus icon
import "./Category.css";

const TABLE_HEADS = ["No", "Category Name", "Category Icon", "Edit", "Delete"];

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/category");
        setCategories(response.data); // Assuming the response data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Category</h4>
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
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.icon}</td>
                  <td className="dt-cell-action">
                    <button className="edit-button">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  </td>
                  <td className="dt-cell-action">
                    <button className="delete-button">
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_HEADS.length}>No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="add-category-btn">
        <button>
          <FontAwesomeIcon icon={faPlus} /> Add Category
        </button>
      </div>
    </section>
  );
};

export default Category;
