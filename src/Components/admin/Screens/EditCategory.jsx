import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function EditCategory() {
  const [categoryInput, setCategory] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    error_list: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const params = useParams();

  const navigate = useNavigate();
  const getSingleCategory = () => {
    axios.get(`api/edit-category/${params.id}`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Error", res.data.Message, "error");
        navigate("view_category");
      }
    });
  };
  const data = {
    slug: categoryInput.slug,
    name: categoryInput.name,
    description: categoryInput.description,
    status: categoryInput.status,
  };
  const updateCategory = (e) => {
    e.preventDefault();
    axios.put("api/update-category/" + params.id, data).then((res) => {
      if (res.data.status === 200) {
        swal("Sucess", res.data.message, "success");
        setError([]);
        navigate("/admin/view_category");
      } else if (res.data.status == 422) {
        swal("All Fields are Mandatory", "", "error");
        setError(res.data.message);
      }
    });
  };
  useEffect(() => {
    getSingleCategory();
  }, [params.id, navigate]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container-fluid px-4">
      <div className="card mt4">
        <div className="card-header">
          <h4>Edit Category</h4>
          <Link
            to="/admin/view_category"
            className="btn btn-primary btn-sm float-end"
          >
            Back
          </Link>
        </div>
        <div className="card-body">
          <form action="" onSubmit={updateCategory}>
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
                    onChange={handleInput}
                    value={categoryInput.slug}
                    className="form-control"
                  />
                  {<span className="text-danger">{error.slug}</span>}
                </div>
                <div className="form mb-3">
                  <label htmlFor="">name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={categoryInput.name}
                    className="form-control"
                  />

                  {<span className="text-danger">{error.name}</span>}
                </div>
                <div className="form mb-3">
                  <label htmlFor="">Description</label>
                  <textarea
                    onChange={handleInput}
                    value={categoryInput.description}
                    type="text"
                    name="description"
                    className="form-control"
                  ></textarea>
                  {<span className="text-danger">{error.description}</span>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 form-group mb-3">
                  <label htmlFor=""> Status status 0=Shown/1=Hidden</label>
                  <input
                    type="checkbox"
                    onChange={handleInput}
                    value={categoryInput.status}
                    name="status"
                    className=" w-50 h-50"
                  />
                  {<span className="text-danger">{error.status}</span>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 mt-2 float-end"
            >
              Update Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
