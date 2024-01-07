import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoies = () => {
    axios.get("api/view-category").then((res) => {
      if (res.data.status == 200) {
        setCategoryList(res.data.category);
      }
      setLoading(false);
    });
  };
  const navigate = useNavigate();
  const deleteCategory = (id) => {
    // const thisClicked = e.currentTarget;
    // thisClicked.innerText = "Deleting";
    axios.delete("api/delete_category/" + id).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        // thisClicked.closest("tr").remove();
      } else if (res.data.status == 400) {
        swal("Error", "error");
      }
    });
  };

  useEffect(() => {
    fetchCategoies();
  }, [navigate]);

  var categoryHtml = "";

  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    categoryHtml = categoryList.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>
            <img
              width={50}
              src={`http://localhost:8000/${item.image}`}
              alt=""
            />
          </td>
          <td>{item.status}</td>
          <td>
            <NavLink
              className="btn btn-success btn-sm"
              to={`/admin/edit-category/${item.id}`}
            >
              Edit
            </NavLink>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => deleteCategory(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Category List{" "}
            <Link to="" className="btn btn-primary btn-sm float-end">
              Add Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <div className="table table-bordered table-strip">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Image</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{categoryHtml}</tbody>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;
