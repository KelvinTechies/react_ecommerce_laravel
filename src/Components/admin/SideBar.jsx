import React from "react";
import { Link, NavLink } from "react-router-dom";
function logOut() {
  /*   localStorage.clear();
      navigate("/myaccounts");
      window.location.reload(); */
  axios.post("api/logout/").then((res) => {
    if (res.data.status === 200) {
      localStorage.removeItem("auth_t");
      localStorage.removeItem("user_info");
      navigate("/login");
    }
  });
}
function SideBar() {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <NavLink className="nav-link" to="">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt" />
            </div>
            Dashboard
          </NavLink>
          <NavLink className="nav-link" to="add_category">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt" />
            </div>
            Add Category
          </NavLink>
          <NavLink className="nav-link" to="view_category">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt" />
            </div>
            View Category
          </NavLink>
          <div className="sb-sidenav-menu-heading">Interface</div>
          <NavLink
            className="nav-link collapsed"
            to="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseProducts"
            aria-expanded="false"
            aria-controls="collapseProducts"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-columns" />
            </div>
            Products
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </NavLink>
          <div
            className="collapse"
            id="collapseProducts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <NavLink className="nav-link" to="add_products">
                Add Products
              </NavLink>
              <NavLink className="nav-link" to="view_products">
                View Products
              </NavLink>
            </nav>
          </div>
          <NavLink className="nav-link collapsed" to="view_orders">
            <div className="sb-nav-link-icon">
              <i className="fas fa-book-open" />
            </div>
            Orders
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down" />
            </div>
          </NavLink>

          <div className="sb-sidenav-menu-heading">Addons</div>
          <NavLink className="nav-link" to="#" onClick={logout}>
            <div className="sb-nav-link-icon">
              <i className="fas fa-chart-area" />
            </div>
            Logout
          </NavLink>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Start Bootstrap
      </div>
    </nav>
  );
}

export default SideBar;
