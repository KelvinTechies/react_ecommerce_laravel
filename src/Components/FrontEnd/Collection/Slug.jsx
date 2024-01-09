import React, { useEffect, useState } from "react";
import Products from "../Screens/Products";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Slug() {
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
                  <a href="#" className="btn btn-dark">
                    Get Yours!
                  </a>
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
                <a href="/">
                  <i className="icon-home" />
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Men</a>
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
                  <a href="#" className="sidebar-toggle">
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
                  </a>
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
                    <a
                      href="#"
                      className="layout-btn btn-grid active"
                      title="Grid"
                    >
                      <i className="icon-mode-grid" />
                    </a>
                    <a href="#" className="layout-btn btn-list" title="List">
                      <i className="icon-mode-list" />
                    </a>
                  </div>
                  {/* End .layout-modes */}
                </div>
                {/* End .toolbox-right */}
              </nav>
              <div className="row">
                {category.map((category) => {
                  return (
                    <>
                      {" "}
                      <div className="col-6 col-sm-4">
                        <div className="product-default">
                          <figure>
                            <a href="">
                              <div className="imgbx">
                                <LazyLoadImage
                                  effect="blur"
                                  src={`http://localhost:8000/${category.image}`}
                                  key={category.image}
                                  placeholderSrc="assets/images/products/product-1-2.jpg"
                                />
                              </div>
                              {/* <LazyLoadImage
              effect="blur"
              src={`http://localhost:8000/${category.image}`}
              key={image}/> */}
                              {/* <img
                                src={`http://localhost:8000/${category.image}`}
                                alt="product"
                                width={280}
                                height={280}
                              /> */}
                              <img
                                src={`http://localhost:8000/${category.image}`}
                                alt="product"
                                width={280}
                                height={280}
                              />
                            </a>
                            <div className="label-group">
                              <div className="product-label label-hot">HOT</div>
                              <div className="product-label label-sale">
                                -20%
                              </div>
                            </div>
                          </figure>
                          <div className="product-details">
                            <div className="category-wrap">
                              <div className="category-list">
                                <a href="#" className="product-category">
                                  {category.name}
                                </a>
                              </div>
                            </div>
                            <h3 className="product-title">
                              {" "}
                              <a href="">{category.name}</a>{" "}
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

                            <div className="product-action">
                              <a
                                href="#"
                                className="btn-icon-wish"
                                title="wishlist"
                              >
                                <i className="icon-heart" />
                              </a>
                              <a href="" className="btn-icon btn-add-cart">
                                <i className="fa fa-arrow-right" />
                                <span>SELECT OPTIONS</span>
                              </a>
                              <a
                                href="#"
                                className="btn-quickview"
                                title="Quick View"
                              >
                                <i className="fas fa-external-link-alt" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
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
                    <a className="page-link page-link-btn" href="#">
                      <i className="icon-angle-left" />
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1 <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link page-link-btn" href="#">
                      <i className="icon-angle-right" />
                    </a>
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
                    <a
                      data-toggle="collapse"
                      href="#widget-body-2"
                      role="button"
                      aria-expanded="true"
                      aria-controls="widget-body-2"
                    >
                      Products
                    </a>
                  </h3>
                  <div className="collapse show" id="widget-body-2">
                    <div className="widget-body">
                      <ul className="cat-list">
                        {products.map((item) => {
                          return (
                            <li>
                              <NavLink
                                to={`/product_detail/${item.id}`}
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
                  </div>
                </div>

                <div className="widget widget-featured">
                  <h3 className="widget-title">Featured</h3>
                  <div className="widget-body">
                    <div className="owl-carousel widget-featured-products">
                      <div className="featured-col">
                        <div className="product-default left-details product-widget">
                          <figure>
                            <a href="">
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
                            </a>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <a href="">
                                Blue Backpack for the Young - S
                              </a>{" "}
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
                              <span className="product-price">$49.00</span>
                            </div>
                          </div>
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <a href="">
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
                            </a>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <a href="">Casual Spring Blue Shoes</a>{" "}
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
                              <span className="product-price">$49.00</span>
                            </div>
                          </div>
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <a href="">
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
                            </a>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <a href="">Men Black Gentle Belt</a>{" "}
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
                              <span className="product-price">$49.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="featured-col">
                        <div className="product-default left-details product-widget">
                          <figure>
                            <a href="">
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
                            </a>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <a href="">Ultimate 3D Bluetooth Speaker</a>{" "}
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
                              <span className="product-price">$49.00</span>
                            </div>
                          </div>
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <a href="">
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
                            </a>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <a href="">Brown Women Casual HandBag</a>{" "}
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
                              <span className="product-price">$49.00</span>
                            </div>
                          </div>
                        </div>
                        <div className="product-default left-details product-widget">
                          <figure>
                            <a href="">
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
                            </a>
                          </figure>
                          <div className="product-details">
                            <h3 className="product-title">
                              {" "}
                              <a href="">Circled Ultimate 3D Speaker</a>{" "}
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
                              <span className="product-price">$49.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <div className="mb-4" />
      </main>
    </>
  );
}

export default Slug;
