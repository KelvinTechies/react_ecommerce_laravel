import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

import "../../admin/asset/css/styles.css";
import "../../admin/asset/js/scripts";
import AddProducts from "./Screens/AddProducts";
import AddCategory from "./Screens/AddCategory";
import ViewCategory from "./Screens/ViewCategory";
import EditCategory from "./Screens/EditCategory";
import { Outlet } from "react-router-dom";
function MasterLayout({ children }) {
  return (
    <div className="sb-nav-fixed">
      <NavBar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideBar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            {/*   <AddProducts />
            <AddCategory />
            <ViewCategory />
            <EditCategory /> */}
            {children}
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
