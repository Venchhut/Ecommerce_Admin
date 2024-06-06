import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "./Category.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const TABLE_HEADS = ["No", "Category Name", "Category Icon", "Edit", "Delete"];
const ITEMS_PER_PAGE = 6;
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:8800/api/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories(); // Refresh the category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentCategories = categories.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(categories.length / ITEMS_PER_PAGE);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Category</h4>
        <div className="add-category-btn">
          <Link to={"/newCategory/${categoryId}"}>
            <button>
              <FontAwesomeIcon icon={faPlus} /> Add Category
            </button>
          </Link>
        </div>
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
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <tr key={category.id}>
                  <td>{offset + index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    {
                      <img
                        src={category.image}
                        alt=""
                        style={{ width: "50px" }}
                      />
                    }
                  </td>
                  <td className="dt-cell-action">
                    <Link to={`/editCategory/${category.id}`}>
                      <button className="edit-button">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                    </Link>
                  </td>
                  <td className="dt-cell-action">
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
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
      </div>
    </section>
  );
};

export default Category;
