import React, { useEffect, useState } from "react";
import Products from "./Products";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function AllProducts() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    axios.get("api/products/").then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.product);
        setProducts(res.data.product);
        setLoading(false);
      } else if (res.data.status === 404) {
        alert(res.data.message);
      } else if (res.data.status === 400) {
        alert(res.data.message);
      }
    });
  };

  const fetchCategories = () => {
    axios.get("api/all_category").then((res) => {
      if (res.data.status == 200) {
        setCategory(res.data.category);
        console.log(res.data.category);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category, products]);

  var proModel = "";
  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <main className="main">
        <div className="category-banner-container bg-gray">
          <div
            className="category-banner banner text-uppercase"
            style={{
              background:
                'no-repeat 60%/cover url("assets/images/banners/banner-top.jpg")',
            }}
          >
            <div className="container position-relative">
              <div className="row">
                <div className="pl-lg-5 pb-5 pb-md-0 col-sm-5 col-xl-4 col-lg-4 offset-1">
                  <h3>
                    Electronic
                    <br />
                    Deals
                  </h3>
                  <NavLink to="category.html" className="btn btn-dark">
                    Get Yours!
                  </NavLink>
                </div>
                <div className="pl-lg-3 col-sm-4 offset-sm-0 offset-1 pt-3">
                  <div className="coupon-sale-content">
                    <h4 className="m-b-1 coupon-sale-text bg-white text-transform-none">
                      Exclusive COUPON
                    </h4>
                    <h5 className="mb-2 coupon-sale-text d-block ls-10 p-0">
                      <i className="ls-0">UP TO</i>
                      <b className="text-dark">$100</b> OFF
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="demo4.html">
                  <i className="icon-home" />
                </NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to="#">Men</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Accessories
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-9 main-content">
              <nav
                className="toolbox sticky-header"
                data-sticky-options="{'mobile': true}"
              >
                <div className="toolbox-left">
                  <NavLink to="#" className="sidebar-toggle">
                    <svg
                      data-name="Layer 3"
                      id="Layer_3"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1={15} x2={26} y1={9} y2={9} className="cls-1" />
                      <line x1={6} x2={9} y1={9} y2={9} className="cls-1" />
                      <line x1={23} x2={26} y1={16} y2={16} className="cls-1" />
                      <line x1={6} x2={17} y1={16} y2={16} className="cls-1" />
                      <line x1={17} x2={26} y1={23} y2={23} className="cls-1" />
                      <line x1={6} x2={11} y1={23} y2={23} className="cls-1" />
                      <path
                        d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                        className="cls-2"
                      />
                      <path
                        d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z"
                        className="cls-2"
                      />
                      <path
                        d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z"
                        className="cls-3"
                      />
                      <path
                        d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                        className="cls-2"
                      />
                    </svg>
                    <span>Filter</span>
                  </NavLink>
                  <div className="toolbox-item toolbox-sort">
                    <label>Sort By:</label>
                    <div className="select-custom">
                      <select name="orderby" className="form-control">
                        <option value="menu_order" selected="selected">
                          Default sorting
                        </option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="date">Sort by newness</option>
                        <option value="price">
                          Sort by price: low to high
                        </option>
                        <option value="price-desc">
                          Sort by price: high to low
                        </option>
                      </select>
                    </div>
                    {/* End .select-custom */}
                  </div>
                  {/* End .toolbox-item */}
                </div>
                {/* End .toolbox-left */}
                <div className="toolbox-right">
                  <div className="toolbox-item toolbox-show">
                    <label>Show:</label>
                    <div className="select-custom">
                      <select name="count" className="form-control">
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                      </select>
                    </div>
                    {/* End .select-custom */}
                  </div>
                  {/* End .toolbox-item */}
                  <div className="toolbox-item layout-modes">
                    <NavLink
                      to="category.html"
                      className="layout-btn btn-grid active"
                      title="Grid"
                    >
                      <i className="icon-mode-grid" />
                    </NavLink>
                    <NavLink
                      to="category-list.html"
                      className="layout-btn btn-list"
                      title="List"
                    >
                      <i className="icon-mode-list" />
                    </NavLink>
                  </div>
                  {/* End .layout-modes */}
                </div>
                {/* End .toolbox-right */}
              </nav>
              <div className="row">
                {products.map((product) => {
                  return (
                    <>
                      {/* {
                      <Products
                        id={product.id}
                        name={product.name}
                        slug={product.slug}
                        selling_price={product.selling_price}
                        original_price={product.original_price}
                        qty={product.qty}
                        img={product.image}
                      />



                    } */}

                      <NavLink to={`product_detail/${product.id}`}>
                        <div className="col-6 col-sm-4">
                          <div className="product-default">
                            <figure>
                              <NavLink to="">
                                <div className="imgbx">
                                  <img
                                    src={`http://localhost:8000/${product.image}`}
                                    alt="product"
                                    width={280}
                                    height={280}
                                  />
                                </div>
                                <img
                                  src={`http://localhost:8000/${product.image}`}
                                  alt="product"
                                  width={280}
                                  height={280}
                                />
                              </NavLink>
                              <div className="label-group">
                                <div className="product-label label-hot">
                                  HOT
                                </div>
                                <div className="product-label label-sale">
                                  -20%
                                </div>
                              </div>
                            </figure>
                            <div className="product-details">
                              <div className="category-wrap">
                                <div className="category-list">
                                  <NavLink
                                    to="category.html"
                                    className="product-category"
                                  >
                                    {product.category_models_name}
                                  </NavLink>
                                </div>
                              </div>
                              <h3 className="product-title">
                                {" "}
                                <NavLink to="">{product.name}</NavLink>{" "}
                              </h3>
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span
                                    className="ratings"
                                    style={{ width: "100%" }}
                                  />
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="price-box">
                                <span className="old-price">
                                  ${product.original_price}
                                </span>
                                <span className="product-price">
                                  ${product.selling_price}
                                </span>
                              </div>
                              <div className="product-action">
                                <NavLink
                                  to="wishlist.html"
                                  className="btn-icon-wish"
                                  title="wishlist"
                                >
                                  <i className="icon-heart" />
                                </NavLink>
                                <NavLink
                                  to=""
                                  className="btn-icon btn-add-cart"
                                >
                                  <i className="fa fa-arrow-right" />
                                  <span>SELECT OPTIONS</span>
                                </NavLink>
                                <NavLink
                                  to="ajax/product-quick-view.html"
                                  className="btn-quickview"
                                  title="Quick View"
                                >
                                  <i className="fas fa-external-link-alt" />
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </>
                  );
                })}
              </div>
              {/* End .row */}
              <nav className="toolbox toolbox-pagination">
                <div className="toolbox-item toolbox-show">
                  <label>Show:</label>
                  <div className="select-custom">
                    <select name="count" className="form-control">
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={36}>36</option>
                    </select>
                  </div>
                  {/* End .select-custom */}
                </div>
                {/* End .toolbox-item */}
                <ul className="pagination toolbox-item">
                  <li className="page-item disabled">
                    <NavLink className="page-link page-link-btn" to="#">
                      <i className="icon-angle-left" />
                    </NavLink>
                  </li>
                  <li className="page-item active">
                    <NavLink className="page-link" to="#">
                      1 <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="page-item">
                    <NavLink className="page-link" to="#">
                      2
                    </NavLink>
                  </li>
                  <li className="page-item">
                    <NavLink toclassName="page-link" to="#">
                      3
                    </NavLink>
                  </li>
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                  <li className="page-item">
                    <NavLink className="page-link page-link-btn" to="#">
                      <i className="icon-angle-right" />
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            {/* End .col-lg-9 */}
            <div className="sidebar-overlay" />
            <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
              <div className="sidebar-wrapper">
                <div className="widget">
                  <h3 className="widget-title">
                    <NavLink
                      data-toggle="collapse"
                      to="#widget-body-2"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-body-2"
                    >
                      Categories
                    </NavLink>
                  </h3>
                  <div className="collapse show" id="widget-body-2">
                    <div className="widget-body">
                      <ul className="cat-list">
                        {category.map((item) => {
                          return (
                            <li>
                              <NavLink
                                to={`/collections/${item.slug}`}
                                href="#widget-category-1"
                                data-toggle="collapse"
                                role="button"
                                aria-expanded="true"
                                aria-controls="widget-category-1"
                              >
                                {item.name}
                                <span className="products-count"></span>
                                <span className="toggle" />
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {/* End .widget-body */}
                  </div>
                  {/* End .collapse */}
                </div>
                {/* End .widget */}

                <div className="widget widget-featured">
                  <h3 className="widget-title">Featured</h3>
                  <div className="widget-body">
                    <div className="owl-carousel widget-featured-products">
                      <div className="featured-col">
                        <div className="product-default left-details product-widget">
                          <figure>
                            <NavLink to="">
                              <img
                                src="assets/images/products/small/product-4.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                              <img
                                src="assets/images/products/small/product-4-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                            </NavLink>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <NavLink to="">
                                Blue Backpack for the Young - S
                              </NavLink>{" "}
                            </h3>
                            <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings */}
                                <span className="tooltiptext tooltip-top" />
                              </div>
                              {/* End .product-ratings */}
                            </div>
                            {/* End .product-container */}
                            <div className="price-box">
                              <span className="product-price">$49.00</span>
                            </div>
                            {/* End .price-box */}
                          </div>
                          {/* End .product-details */}
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <NavLink to="">
                              <img
                                src="assets/images/products/small/product-5.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                              <img
                                src="assets/images/products/small/product-5-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                            </NavLink>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <NavLink to="">
                                Casual Spring Blue Shoes
                              </NavLink>{" "}
                            </h3>
                            <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings */}
                                <span className="tooltiptext tooltip-top" />
                              </div>
                              {/* End .product-ratings */}
                            </div>
                            {/* End .product-container */}
                            <div className="price-box">
                              <span className="product-price">$49.00</span>
                            </div>
                            {/* End .price-box */}
                          </div>
                          {/* End .product-details */}
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <NavLink to="">
                              <img
                                src="assets/images/products/small/product-6.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                              <img
                                src="assets/images/products/small/product-6-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                            </NavLink>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <NavLink to="">
                                Men Black Gentle Belt
                              </NavLink>{" "}
                            </h3>
                            <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings */}
                                <span className="tooltiptext tooltip-top" />
                              </div>
                              {/* End .product-ratings */}
                            </div>
                            {/* End .product-container */}
                            <div className="price-box">
                              <span className="product-price">$49.00</span>
                            </div>
                            {/* End .price-box */}
                          </div>
                          {/* End .product-details */}
                        </div>
                      </div>
                      {/* End .featured-col */}
                      <div className="featured-col">
                        <div className="product-default left-details product-widget">
                          <figure>
                            <NavLink to="">
                              <img
                                src="assets/images/products/small/product-1.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                              <img
                                src="assets/images/products/small/product-1-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                            </NavLink>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <NavLink to="">
                                Ultimate 3D Bluetooth Speaker
                              </NavLink>{" "}
                            </h3>
                            <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings */}
                                <span className="tooltiptext tooltip-top" />
                              </div>
                              {/* End .product-ratings */}
                            </div>
                            {/* End .product-container */}
                            <div className="price-box">
                              <span className="product-price">$49.00</span>
                            </div>
                            {/* End .price-box */}
                          </div>
                          {/* End .product-details */}
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <NavLink to="">
                              <img
                                src="assets/images/products/small/product-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                              <img
                                src="assets/images/products/small/product-2-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                            </NavLink>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <NavLink to="">
                                Brown Women Casual HandBag
                              </NavLink>{" "}
                            </h3>
                            <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings */}
                                <span className="tooltiptext tooltip-top" />
                              </div>
                              {/* End .product-ratings */}
                            </div>
                            {/* End .product-container */}
                            <div className="price-box">
                              <span className="product-price">$49.00</span>
                            </div>
                            {/* End .price-box */}
                          </div>
                          {/* End .product-details */}
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <NavLink to="">
                              <img
                                src="assets/images/products/small/product-3.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                              <img
                                src="assets/images/products/small/product-3-2.jpg"
                                width={75}
                                height={75}
                                alt="product"
                              />
                            </NavLink>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <NavLink to="">
                                Circled Ultimate 3D Speaker
                              </NavLink>{" "}
                            </h3>
                            <div className="ratings-container">
                              <div className="product-ratings">
                                <span
                                  className="ratings"
                                  style={{ width: "100%" }}
                                />
                                {/* End .ratings */}
                                <span className="tooltiptext tooltip-top" />
                              </div>
                              {/* End .product-ratings */}
                            </div>
                            {/* End .product-container */}
                            <div className="price-box">
                              <span className="product-price">$49.00</span>
                            </div>
                            {/* End .price-box */}
                          </div>
                          {/* End .product-details */}
                        </div>
                      </div>
                      {/* End .featured-col */}
                    </div>
                    {/* End .widget-featured-slider */}
                  </div>
                  {/* End .widget-body */}
                </div>
                {/* End .widget */}

                {/* End .widget */}
              </div>
              {/* End .sidebar-wrapper */}
            </aside>
            {/* End .col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
        <div className="mb-4" />
        {/* margin */}
      </main>
    </>
  );
}

export default AllProducts;
