import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function ViewProducts() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const fetchPro = () => {
    axios.get("api/admin/products").then((res) => {
      if (res.data.status == 200) {
        setProductList(res.data.product);
      }
      setLoading(false);
    });
  };
  const deletePro = (e, id) => {
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios.delete("api/delete_category/" + id).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status == 400) {
        swal("Error", "error");
      }
    });
  };

  useEffect(() => {
    fetchPro();
  }, [navigate]);

  var categoryHtml = "";

  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    categoryHtml = productList.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category_models.name}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>{item.original_price}</td>
          <td>
            <NavLink
              className="btn btn-success btn-sm"
              to={`/admin/edit_product/${item.id}`}
            >
              Edit
            </NavLink>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => deletePro(item.id)}
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
              Add Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <div className="table table-bordered table-strip">
            <thead>
              <tr>
                <th>ID</th>
                <th>category_id</th>
                <th>Name</th>
                <th>selling_price</th>
                <th>original_price</th>
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

export default ViewProducts;
