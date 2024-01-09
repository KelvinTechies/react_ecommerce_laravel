import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/FrontEnd/Screens/Home";
import Layouts from "./Components/FrontEnd/Screens/Layouts";
import axios from "axios";
import ProductDetail from "./Components/FrontEnd/Screens/ProductDetail";
import Cart from "./Components/FrontEnd/Screens/Cart";
import CheckOut from "./Components/FrontEnd/Screens/CheckOut";
import Slug from "./Components/FrontEnd/Collection/Slug";
import Products from "./Components/FrontEnd/Screens/Products";
import AllProducts from "./Components/FrontEnd/Screens/AllProducts";
import Dashboard from "./Components/FrontEnd/Screens/Dashboard";
import Auth from "./Components/Auth/Auth";
import Dashbard from "./Components/Admin/Screens/Dashbard";
import AddProducts from "./Components/Admin/Screens/AddProducts";
import ViewProducts from "./Components/Admin/Screens/ViewProducts";
import ViewCategory from "./Components/Admin/Screens/ViewCategory";
import EditCategory from "./Components/Admin/Screens/EditCategory";
import AddCategory from "./Components/Admin/Screens/AddCategory";
import EditProduct from "./Components/Admin/Screens/EditProduct";
import MasterLayout from "./Components/Admin/MasterLayout";
import UserDashboard from "./Components/FrontEnd/Screens/UserDashboard";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_t");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="product_detail/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="collections/:slug" element={<Slug />} />

            <Route
              path="login"
              element={
                localStorage.getItem("auth_t") ? <Navigate to="/" /> : <Auth />
              }
            />
          </Route>

          <Route path="/admin" element={<MasterLayout />}>
            <Route index path="admin_dashboard" element={<Dashbard />} />
            <Route path="add_products" element={<AddProducts />} />
            <Route path="view_products" element={<ViewProducts />} />
            <Route path="add_category" element={<AddCategory />} />
            <Route path="view_category" element={<ViewCategory />} />
            <Route path="edit_product/:id" element={<EditProduct />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
