import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    Desc: "",
    price: "",
    quantity: "",
    CategoryId: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:8800/api/product/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product created successfully!");
      setTimeout(() => {
        navigate("/product");
      }, 2000);
    } catch (error) {
      toast.error("Failed to create product. Please check your input.");
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
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
          <div style={styles.formRow}>
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
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category:</label>
            <input
              type="text"
              name="CategoryId"
              value={productData.CategoryId}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={{ ...styles.button, ...styles.buttonHover }}
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  formContainer: {
    flex: 1,
    padding: "1rem",
  },
  header: {
    marginBottom: "1rem",
    color: "#333",
    fontSize: "2rem",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  formRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
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
    transition: "border-color 0.3s",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    height: "100px",
    resize: "vertical",
    transition: "border-color 0.3s",
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
    transition: "background-color 0.3s",
  },
  buttonHover: {
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
};

export default CreateProduct;
