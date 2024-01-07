import axios from "axios";
import React, { useEffect, useState } from "react";

function Orders() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrder = () => {
    axios.get("api/order").then((res) => {
      if (res.data.status === 200) {
        setOrder(res.data.order);
        alert(res.data.order);
        console.log(res.data.order);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  console.log(order);
  var categoryHtml = "";
  if (loading) {
    return <h3>Loading...</h3>;
  } else {
    categoryHtml = order.map((item) => {
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
    <div>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header">
            {/*   <h4>
            Category List{" "}
            <Link to="" className="btn btn-primary btn-sm float-end">
              Add Product
            </Link>
          </h4> */}
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
    </div>
  );
}

export default Orders;
