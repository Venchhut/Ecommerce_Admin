import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    Desc: "",
    image: "",
    price: "",
    quantity: "",
    CategoryId: "",
  });
  const [createdProduct, setCreatedProduct] = useState(null);
  const [error, setError] = useState("");

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
      const response = await axios.post(
        "http://localhost:8800/api/product/create",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreatedProduct(response.data.product);
      setError("");
    } catch (error) {
      setError("Failed to create product. Please check your input.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="Desc"
              value={productData.Desc}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL:</label>
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category ID:</label>
            <input
              type="text"
              name="CategoryId"
              value={productData.CategoryId}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Create Product
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        {createdProduct && (
          <p style={styles.success}>Product created successfully!</p>
        )}
      </div>
      <div style={styles.imageContainer}>
        <img
          src="https://img.freepik.com/free-photo/laptop-near-smartphone-digital-devices-shopping-trolley_23-2147957579.jpg?t=st=1716888452~exp=1716892052~hmac=d1335f73bd4a27cd0be0308f0f642cbe5af287341515daddc80b2113c1a17d37&w=996"
          alt="Product display"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  formContainer: {
    flex: 1,
    paddingRight: "1rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#333",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    height: "100px",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "1rem",
  },
  success: {
    color: "green",
    textAlign: "center",
    marginTop: "1rem",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1rem",
    height: "100%", // Set the height of the container to 100%
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%", // Change height to maxHeight
    borderRadius: "8px",
  },
};

export default CreateProduct;
