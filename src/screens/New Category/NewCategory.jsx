import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./NewCategory.css";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image); // Use 'image' as the key to match the backend
    }

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:8800/api/category",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Category created successfully!");
      navigate("/category");
    } catch (error) {
      toast.error("Failed to create category");

      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="new-category-container">
      <h2>New Category</h2>
      <form onSubmit={handleSubmit} className="new-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={handleNameChange}
          className="new-category-input"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="new-category-input"
        />
        {imageUrl && (
          <img src={imageUrl} alt="Image Preview" className="preview-image" />
        )}
        <button type="submit" className="new-category-button">
          Create Category
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewCategory;
