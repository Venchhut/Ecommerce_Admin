import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Products.css";

const TABLE_HEADS = [
  "No",
  "Categories ID",
  "Name",

  "Description",

  "Image",

  "Price",
  "Stock",
  "Edit",
  "Delete",
];

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/product");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/api/product/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = products.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Products</h4>
        {/* Button for adding a new product */}
        <Link to={"/newproduct"}>
          <button className="add-button">
            <FontAwesomeIcon icon={faPlus} /> New Product
          </button>
        </Link>
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
              <tr key={dataItem.id}>
                <td>{index + 1}</td>
                <td>Category#{dataItem.CategoryId}</td>
                <td>{dataItem.title}</td>

                <td>{dataItem.Desc}</td>

                <td>
                  <img
                    src={dataItem.image}
                    alt={dataItem.name}
                    style={{ width: "50px" }}
                  />
                </td>

                <td>${dataItem.price}</td>
                <td>{dataItem.quantity}</td>
                <td className="dt-cell-action">
                  <Link to={`/editproduct/${dataItem.id}`}>
                    <button className="edit-button">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  </Link>
                </td>
                <td className="dt-cell-action">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProduct(dataItem.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
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

export default Products;
