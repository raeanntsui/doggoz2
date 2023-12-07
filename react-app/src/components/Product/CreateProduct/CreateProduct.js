import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./CreateProduct.css";
import { createProductThunk } from "../../../store/products";

function CreateNewProduct() {
  const [validationErrors, setValidationErrors] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
  const { productId } = useParams();
  console.log("🚀🚀🚀🚀🚀🚀 ~ productId:", productId);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_category", category);
    formData.append("product_price", price);
    formData.append("product_image", productImage);

    if (Object.keys(validationErrors).length === 0) {
      await dispatch(createProductThunk(formData)).then((res) => {
        history.push(`/products/`);
      });
    }
    setSubmit(true);
  };

  useEffect(() => {
    let errorsObject = {};
    if (!name) errorsObject.name = "Name is required";
    if (name && name.length < 5)
      errorsObject.name = "Name must be longer than 5 characters";
    if (!description) errorsObject.description = "Description is required";
    if (description && description.length > 1000)
      errorsObject.description = "Description exceeds 1000 characters";
    if (description && description.length < 10)
      errorsObject.description =
        "Description must more than 10 characters long";
    if (!category) errorsObject.category = "Category is required";
    if (!price) errorsObject.price = "Please enter a price";
    if (price && price <= 0) errorsObject.price = "Price must be at least $1";
    if (price && price < 0) errorsObject.price = "Price cannot be negative";
    if (price && price > 100000)
      errorsObject.price = "Price cannot exceed $100,000";
    setValidationErrors(errorsObject);
  }, [name, description, category, price]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Create a new product here</h1>
        </div>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          {submit && validationErrors.name && (
            <p id="p-error">{validationErrors.name}</p>
          )}
          <div>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          {submit && validationErrors.description && (
            <p id="p-error">{validationErrors.description}</p>
          )}
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
          </div>
          {submit && validationErrors.category && (
            <p id="p-error">{validationErrors.category}</p>
          )}
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          {submit && validationErrors.price && (
            <p id="p-error">{validationErrors.price}</p>
          )}
          <div>
            <label>Image</label>
            <input
              type="text"
              onChange={(e) => setProductImage(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          // disabled={Object.keys(validationErrors).length > 0}
        >
          Create New Product
        </button>
      </form>

      {createdProduct && (
        <div>
          <h2>Details of Created Product:</h2>
          <p>Name: {createdProduct.product_name}</p>
          <p>Description: {createdProduct.product_description}</p>
          <p>Category: {createdProduct.product_category}</p>
          <p>Price: ${createdProduct.product_price}</p>
          <p>Picture: {createdProduct.product_image}</p>
        </div>
      )}
    </>
  );
}

export default CreateNewProduct;
