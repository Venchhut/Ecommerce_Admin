import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const EditProduct = ({ match }) => {
  const [productData, setProductData] = useState({
    title: "",
    Desc: "",
    image: "",
    price: "",
    quantity: "",
    CategoryId: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const productId = match.params.id;
      const response = await axios.get(
        `http://localhost:8800/api/product/${productId}`
      );
      setProductData(response.data); // Update productData state with fetched data
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token"); // Get the token from cookies
      const productId = match.params.id;
      await axios.patch(
        `http://localhost:8800/api/product/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      // Redirect to product list page or show a success message
    } catch (error) {
      setError("Failed to update product. Please check your input.");
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Desc"
            value={productData.Desc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            name="CategoryId"
            value={productData.CategoryId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditProduct;
