import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

function AddCategory() {
  const [categoryInput, setCategory] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    error_list: [],
  });
  // const [picture, setPicture] = useState([]);
  const [img, setPicture] = useState([]);
  const [error_list, seterror_list] = useState([]);
  const [slug, setslug] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };
  const handleImg = (e) => {
    setPicture((pictures) => ({
      ...pictures,
      [e.target.name]: e.target.files[0],
    }));
  };

  const submitCategoty = (e) => {
    e.preventDefault();
    console.log(img);

    const formData = new FormData();
    formData.append("img", img);
    formData.append("slug", slug);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status);

    /* const data = {
      slug,
      name,
      description,
      status,
      img: img,
      // formData,
    };
 */
    console.log(formData);

    axios.post("/api/store-category", formData).then((res) => {
      if (res.data.status === 200) {
        console.warn(res.data.message);
        swal("Success", res.data.message, "success");
        seterror_list([]);
        document.getElementById("CATEGORY_FORM").reset();
      } else if (res.data.status === 400) {
        // setCategory({ ...categoryInput, error_list: res.data.errors });
        // swal("Error", res.data.errors, "error");
        seterror_list(res.data.errors);
        console.log(res.data.errors);
      }
    });
  };

  return (
    <div className="container-fluid px-4">
      <div className="card mt4">
        <div className="card-header">
          <h4>Add Category</h4>
          <Link
            to="/admin/view_category"
            className="btn btn-primary btn-sm float-end"
          >
            View Category
          </Link>
        </div>
        <div className="card-body">
          <form
            action=""
            onSubmit={submitCategoty}
            id="CATEGORY_FORM"
            encType="multipart/form-data"
          >
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
                <div className="form mb-3">
                  <label htmlFor="">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={(e) => setslug(e.target.value)}
                    value={slug}
                    className="form-control"
                  />
                  <span>{error_list.slug}</span>
                </div>
                <div className="form mb-3">
                  <label htmlFor="">name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                    className="form-control"
                  />

                  <span>{error_list.name}</span>
                </div>
                <div className="form mb-3">
                  <label htmlFor="">Description</label>
                  <textarea
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                    type="text"
                    name="description"
                    className="form-control"
                  ></textarea>
                  <span>{error_list.description}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 form-group mb-3">
                  <label htmlFor=""> Status status 0=Shown/1=Hidden</label>
                  <input
                    type="checkbox"
                    onChange={(e) => setstatus(e.target.value)}
                    value={status}
                    name="status"
                    className=" w-50 h-50"
                  />
                  <span>{error_list.status}</span>
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label htmlFor="">Image </label>
                  <input
                    type="file"
                    name="img"
                    onChange={(e) => setPicture(e.target.files[0])}
                    className="form-control"
                  />
                  <small className="text-danger">{error_list.img}</small>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
