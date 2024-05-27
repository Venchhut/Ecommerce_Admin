import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [productData, setProductData] = useState({
    category: "",
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleSaveProduct = async () => {
    try {
      await axios.post("http://localhost:8800/api/product/create", productData);
      navigate("/product");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Category"
        value={productData.category}
        onChange={(e) =>
          setProductData({ ...productData, category: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Name"
        value={productData.name}
        onChange={(e) =>
          setProductData({ ...productData, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        value={productData.description}
        onChange={(e) =>
          setProductData({ ...productData, description: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Image URL"
        value={productData.image}
        onChange={(e) =>
          setProductData({ ...productData, image: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) =>
          setProductData({ ...productData, price: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Stock"
        value={productData.stock}
        onChange={(e) =>
          setProductData({ ...productData, stock: e.target.value })
        }
      />
      <button onClick={handleSaveProduct}>Save</button>
    </div>
  );
};

export default NewProduct;
