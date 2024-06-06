import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditCategory.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image file

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/category/${id}`
        );
        const { name } = response.data;
        setName(name);
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to fetch category details");
        navigate("/category");
      }
    };
    fetchCategory();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    // Update the image state when a new file is selected
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }
      const token = Cookies.get("token");
      await axios.put(`http://localhost:8800/api/category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Specify content type for FormData
        },
      });
      toast.success("Category updated successfully!");
      navigate("/category");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="edit-category-container">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit} className="edit-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="edit-category-input"
        />
        <input
          type="file" // File input for selecting image
          onChange={handleImageChange} // Function to handle image selection
          className="edit-category-input"
        />
        <button type="submit" className="edit-category-button">
          Update Category
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditCategory;
