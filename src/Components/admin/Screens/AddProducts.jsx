import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddProducts() {
  const [categoryId, setCategoryId] = useState([]);
  const [errorLists, setErrorsList] = useState([]);
  const [productInput, setProductInput] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",
    selling_price: "",
    original_price: "",
    qty: "",
    brand: "",
    featured: "",
    popular: "",
    status: "",
  });
  const [picture, setPicture] = useState([]);

  const handleImg = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const getAllCategory = () => {
    axios.get("api/all_category").then((res) => {
      if (res.data.status == 200) {
        setCategoryId(res.data.category);
      }
    });
  };

  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("qty", productInput.qty);
    formData.append("brand", productInput.brand);
    formData.append("popular", productInput.popular);
    formData.append("featured", productInput.featured);
    formData.append("status", productInput.status);

    axios.post("api/products", formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrorsList([]);
      } else if (res.data.status == 422) {
        swal("All Fields Are Required", "", "error");
        setErrorsList(res.data.errors);
      }
    });
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  console.log(picture);

  return (
    <div className="container-fluid px-4">
      <div className="card mt4">
        <div className="card-header">
          <h4>Add Product</h4>
          <Link to="view_product" className="btn btn-primary btn-sm float-end">
            View Product
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={submitProduct} encType="multipart/form-data">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>

              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="otherDetails-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#otherDetails-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="otherDetails-tab-pane"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane card-body border fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
                <div className="form-group mb-3">
                  <label htmlFor="">Select Category</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.id}
                    className="form-control"
                    id=""
                  >
                    <option value="">Select Category</option>
                    {categoryId.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <small className="text-danger">
                    {errorLists.category_id}
                  </small>
                </div>
                <div className="form mb-3">
                  <label htmlFor="">Slug</label>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={productInput.slug}
                    name="slug"
                    className="form-control"
                  />
                  <small className="text-danger">{errorLists.slug}</small>
                </div>
                <div className="form mb-3">
                  <label htmlFor="">name</label>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={productInput.name}
                    name="name"
                    className="form-control"
                  />
                  <small className="text-danger">{errorLists.name}</small>
                </div>
                <div className="form mb-3">
                  <label htmlFor="">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleInput}
                    value={productInput.description}
                    className="form-control"
                  ></textarea>
                  <small className="text-danger">
                    {errorLists.description}
                  </small>
                </div>
              </div>

              <div
                class="tab-pane card-body border fade"
                id="otherDetails-tab-pane"
                role="tabpanel"
                aria-labelledby="otherDetails-tab"
                tabindex="0"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="">Selling Price</label>
                    <input
                      type="text"
                      name="selling_price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.selling_price}
                    />
                    <small className="text-danger">
                      {errorLists.selling_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="">Originak Price</label>
                    <input
                      type="text"
                      name="original_price"
                      className="form-control"
                      onChange={handleInput}
                      value={productInput.original_price}
                    />
                    <small className="text-danger">
                      {errorLists.original_price}
                    </small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="">Quantity</label>
                    <input
                      type="text"
                      name="qty"
                      onChange={handleInput}
                      value={productInput.qty}
                      className="form-control"
                    />
                    <small className="text-danger">{errorLists.qty}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInput}
                      value={productInput.brand}
                      className="form-control"
                    />
                    <small className="text-danger">{errorLists.brand}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor="">Image </label>
                    <input
                      type="file"
                      onChange={handleImg}
                      name="image"
                      className="form-control"
                    />
                    <small className="text-danger">{errorLists.image}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor=""> Featured(Checked=Shown)</label>
                    <input
                      type="checkbox"
                      name="featured"
                      className=" w-50 h-50"
                      onChange={handleInput}
                      value={productInput.featured}
                    />
                    <small className="text-danger">{errorLists.featured}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor=""> Popular(Checked=Shown)</label>
                    <input
                      type="checkbox"
                      name="popular"
                      className=" w-50 h-50"
                      onChange={handleInput}
                      value={productInput.popular}
                    />
                    <small className="text-danger">{errorLists.popular}</small>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label htmlFor=""> Status(Checked=Hidden)</label>
                    <input
                      type="checkbox"
                      name="status"
                      className=" w-50 h-50"
                    />
                  </div>
                  <small className="text-danger">{errorLists.status}</small>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Add Products
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
