import React, { useEffect, useState } from "react";
import "../../../myAsset/assets/vendor/fontawesome-free/css/all.min.css";
import "../../../myAsset/assets/css/bootstrap.min.css";
import "../../../myAsset/assets/css/demo4.min.css";
import "../../../myAsset/assets/css/style.min.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
function Layouts({ children }) {
  const [category, setCategory] = useState([]);
  var totalCartPrice = 0;
  const navigate = useNavigate();
  const user = localStorage.getItem("user_info");
  const [cart, setCart] = useState([]);
  const fetchCategories = () => {
    axios.get("api/view-category").then((res) => {
      if (res.data.status == 200) {
        setCategory(res.data.category);
      }
    });
  };
  useEffect(() => {
    fetchCategories();
    axios.get("api/cart").then((res) => {
      if (res.data.status === 200) {
        setCart(res.data.cart);
      }
    });
  }, [navigate, cart]);

  return (
    <>
      <div class="page-wrapper">
        <div className="top-notice bg-primary text-white">
          <div className="container text-center">
            <h5 className="d-inline-block">
              Get Up to <b>40% OFF</b> New-Season Styles
            </h5>
            <NavLink to="#" className="category">
              MEN
            </NavLink>
            <NavLink to="#" className="category ml-2 mr-3">
              WOMEN
            </NavLink>
            <small>* Limited time only.</small>
            <button title="Close (Esc)" type="button" className="mfp-close">
              ×
            </button>
          </div>
          {/* End .container */}
        </div>
        {/* End .top-notice */}
        <header className="header">
          <div className="header-top">
            <div className="container">
              <div className="header-left d-none d-sm-block">
                <p className="top-message text-uppercase">
                  FREE Returns. Standard Shipping Orders $99+
                </p>
              </div>
              {/* End .header-left */}
              <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
                <div className="header-dropdown dropdown-expanded d-none d-lg-block">
                  <NavLink to="#">Links</NavLink>
                  <div className="header-menu">
                    <ul>
                      {user ? (
                        <li>
                          <NavLink to="dashboard">My Account</NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      <li>
                        <NavLink to="">About Us</NavLink>
                      </li>
                      <li>
                        <NavLink to="">My Wishlist</NavLink>
                      </li>
                      <li>
                        <NavLink to="cart">Cart</NavLink>
                      </li>
                      {user ? (
                        <li>
                          <NavLink to="login" className="login-link">
                            Log In
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                  {/* End .header-menu */}
                </div>
                {/* End .header-dropown */}
                <span className="separator" />
                <div className="header-dropdown">
                  <NavLink to="#">
                    <i className="flag-us flag" />
                    ENG
                  </NavLink>
                  <div className="header-menu">
                    <ul>
                      <li>
                        <NavLink to="#">
                          <i className="flag-us flag mr-2" />
                          ENG
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          <i className="flag-fr flag mr-2" />
                          FRA
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  {/* End .header-menu */}
                </div>
                {/* End .header-dropown */}
                <div className="header-dropdown mr-auto mr-sm-3 mr-md-0">
                  <NavLink to="#">USD</NavLink>
                  <div className="header-menu">
                    <ul>
                      <li>
                        <NavLink to="#">EUR</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">USD</NavLink>
                      </li>
                    </ul>
                  </div>
                  {/* End .header-menu */}
                </div>
                {/* End .header-dropown */}
                <span className="separator" />
                <div className="social-icons">
                  <a
                    href="#"
                    className="social-icon social-facebook icon-facebook"
                    target="_blank"
                  />
                  <a
                    href="#"
                    className="social-icon social-twitter icon-twitter"
                    target="_blank"
                  />
                  <a
                    href="#"
                    className="social-icon social-instagram icon-instagram"
                    target="_blank"
                  />
                </div>
                {/* End .social-icons */}
              </div>
              {/* End .header-right */}
            </div>
            {/* End .container */}
          </div>
          {/* End .header-top */}
          <div
            className="header-middle sticky-header"
            data-sticky-options="{'mobile': true}"
          >
            <div className="container">
              <div className="header-left col-lg-2 w-auto pl-0">
                <button
                  className="mobile-menu-toggler text-primary mr-2"
                  type="button"
                >
                  <i className="fas fa-bars" />
                </button>
                <NavLink to="" className="logo">
                  <img
                    src="assets/images/n_store-removebg-preview.png"
                    width={111}
                    height={44}
                    alt="Porto Logo"
                  />
                </NavLink>
              </div>
              {/* End .header-left */}
              <div className="header-right w-lg-max">
                <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
                  <NavLink to="#" className="search-toggle" role="button">
                    <i className="icon-search-3" />
                  </NavLink>
                  <form action="#" method="get">
                    <div className="header-search-wrapper">
                      <input
                        type="search"
                        className="form-control"
                        name="q"
                        id="q"
                        placeholder="Search..."
                        required=""
                      />
                      <div className="select-custom">
                        <select id="cat" name="cat">
                          <option value="">All Categories</option>
                          <option value={4}>Fashion</option>
                          <option value={12}>- Women</option>
                          <option value={13}>- Men</option>
                          <option value={66}>- Jewellery</option>
                          <option value={67}>- Kids Fashion</option>
                          <option value={5}>Electronics</option>
                          <option value={21}>- Smart TVs</option>
                          <option value={22}>- Cameras</option>
                          <option value={63}>- Games</option>
                          <option value={7}>Home &amp; Garden</option>
                          <option value={11}>Motors</option>
                          <option value={31}>- Cars and Trucks</option>
                          <option value={32}>
                            - Motorcycles &amp; Powersports
                          </option>
                          <option value={33}>- Parts &amp; Accessories</option>
                          <option value={34}>- Boats</option>
                          <option value={57}>
                            - Auto Tools &amp; Supplies
                          </option>
                        </select>
                      </div>
                      {/* End .select-custom */}
                      <button
                        className="btn icon-magnifier p-0"
                        title="search"
                        type="submit"
                      />
                    </div>
                    {/* End .header-search-wrapper */}
                  </form>
                </div>
                {/* End .header-search */}
                <div className="header-contact d-none d-lg-flex pl-4 pr-4">
                  <img
                    alt="phone"
                    src="assets/images/phone.png"
                    width={30}
                    height={30}
                    className="pb-1"
                  />
                  <h6>
                    <span>Call us now</span>
                    <NavLink to="tel:#" className="text-dark font1">
                      (+234) 816-2942-636
                    </NavLink>
                  </h6>
                </div>
                <NavLink to="login" className="header-icon" title="login">
                  <i className="icon-user-2" />
                </NavLink>
                <NavLink to="" className="header-icon" title="wishlist">
                  <i className="icon-wishlist-2" />
                </NavLink>
                <div className="dropdown cart-dropdown">
                  <NavLink
                    to="#"
                    title="Cart"
                    className="dropdown-toggle dropdown-arrow cart-toggle"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-display="static"
                  >
                    <i className="minicart-icon" />
                    <span className="cart-count badge-circle">
                      {" "}
                      {user ? cart.length : 0}
                    </span>
                  </NavLink>
                  <div className="cart-overlay" />
                  <div className="dropdown-menu mobile-cart">
                    <NavLink to="#" title="Close (Esc)" className="btn-close">
                      ×
                    </NavLink>
                    <div className="dropdownmenu-wrapper custom-scrollbar">
                      <div className="dropdown-cart-header">Shopping Cart</div>
                      {/* End .dropdown-cart-header */}
                      <div className="dropdown-cart-products">
                        {/*  <div className="product">
                          <div className="product-details">
                            <h4 className="product-title">
                             <NavLink to="product.html">
                                Ultimate 3D Bluetooth Speaker
                              </NavLink>
                            </h4>
                            <span className="cart-product-info">
                              <span className="cart-product-qty">1</span> ×
                              $99.00
                            </span>
                          </div>
                         
                          <figure className="product-image-container">
                           <NavLink to="product.html" className="product-image">
                              <img
                                src="assets/images/productss/products-1.jpg"
                                alt="product"
                                width={80}
                                height={80}
                              />
                            </NavLink>
                            <a
                              href="#"
                              className="btn-remove"
                              title="Remove Product"
                            >
                              <span>×</span>
                            </NavLink>
                          </figure>
                        </div> */}
                        {cart.map((item) => {
                          totalCartPrice +=
                            item.product_models.selling_price *
                            item.product_models.qty;
                          return (
                            <>
                              <div className="product">
                                <div className="product-details">
                                  <h4 className="product-title">
                                    <NavLink to={`product_detail/${item.id}`}>
                                      {item.product_models.name}
                                    </NavLink>
                                  </h4>
                                  <span className="cart-product-info">
                                    <span className="cart-product-qty">
                                      {item.product_models.qty}
                                    </span>{" "}
                                    × ${item.product_models.selling_price}
                                  </span>
                                </div>
                                <figure className="product-image-container">
                                  <NavLink
                                    to={`product_detail/${item.id}`}
                                    className="product-image"
                                  >
                                    <img
                                      src={`http://localhost:8000/${item.product_models.image}`}
                                      alt="product"
                                      width={80}
                                      height={80}
                                    />
                                  </NavLink>
                                  <NavLink
                                    to="#"
                                    className="btn-remove"
                                    title="Remove Product"
                                  >
                                    <span>×</span>
                                  </NavLink>
                                </figure>
                              </div>

                              {/* <div className="crt_p">
                        <div className="crt_p_t">
                          <p>{item.product_models.name}</p>
                          <p>
                            {item.product_models.qty}x $
                            {item.product_models.selling_price}
                          </p>
                        </div>
                        <div className="crt_img_h">
                          <div className="crt_img">
                            <img
                              src={`http://localhost:8000/${item.product_models.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h3">
                        <h5>
                          ${" "}
                          {item.product_models.qty *
                            item.product_models.selling_price}
                        </h5>
                      </div> */}
                            </>
                          );
                        })}
                      </div>
                      {/* End .cart-product */}
                      <div className="dropdown-cart-total">
                        <span>SUBTOTAL:</span>
                        <span className="cart-total-price float-right">
                          ${totalCartPrice}
                        </span>
                      </div>
                      {/* End .dropdown-cart-total */}
                      <div className="dropdown-cart-action">
                        <NavLink
                          to="cart"
                          className="btn btn-gray btn-block view-cart"
                        >
                          View Cart
                        </NavLink>
                        <NavLink
                          to="checkout"
                          className="btn btn-dark btn-block"
                        >
                          Checkout
                        </NavLink>
                      </div>
                      {/* End .dropdown-cart-total */}
                    </div>
                    {/* End .dropdownmenu-wrapper */}
                  </div>
                  {/* End .dropdown-menu */}
                </div>
                {/* End .dropdown */}
              </div>
              {/* End .header-right */}
            </div>
            {/* End .container */}
          </div>
          {/* End .header-middle */}
          <div
            className="header-bottom sticky-header d-none d-lg-block"
            data-sticky-options="{'mobile': false}"
          >
            <div className="container">
              <nav className="main-nav w-100">
                <ul className="menu">
                  <li className="active">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Categories</NavLink>
                    <div className="megamenu megamenu-fixed-width megamenu-3cols">
                      <div className="row">
                        <div className="col-lg-4">
                          <NavLink to="#" className="nolink">
                            <li>
                              {category.map((item) => {
                                return (
                                  <li>
                                    <NavLink to={`/collections/${item.slug}`}>
                                      {item.name}
                                    </NavLink>
                                  </li>
                                );
                              })}
                            </li>
                          </NavLink>
                          {/*  <ul className="submenu">
                            <li>
                              {category.map((item) => {
                                return (
                                  <li>
                                    <NavLink to={`/collections/${item.slug}`}>
                                      {item.name}
                                    </NavLink>
                                  </li>
                                );
                              })}
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                    {/* End .megamenu */}
                  </li>
                  <li>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Pages</NavLink>
                    <ul>
                      <li>
                        <NavLink to="cart">Shopping Cart</NavLink>
                      </li>
                      <li>
                        <NavLink to="checkout">Checkout</NavLink>
                      </li>

                      <li>
                        <NavLink to="login">Login</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Forgot Password</NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {children}
        {<Outlet />}
        <footer className="footer bg-dark">
          <div className="footer-middle">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <div className="widget">
                    <h4 className="widget-title">Contact Info</h4>
                    <ul className="contact-info">
                      <li>
                        <span className="contact-info-label">Address:</span>
                        Nigeria
                      </li>
                      <li>
                        <span className="contact-info-label">Phone:</span>
                        <NavLink to="tel:">(+234) 816-2942-636</NavLink>
                      </li>
                      <li>
                        <span className="contact-info-label">Email:</span>{" "}
                        <NavLink to="">
                          <span className="__cf_email__" data-cfemail="">
                            [email&nbsp;protected]
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <span className="contact-info-label">
                          Working Days/Hours:
                        </span>{" "}
                        Mon - Sun / 9:00 AM - 8:00 PM
                      </li>
                    </ul>
                    <div className="social-icons">
                      <a
                        href="#"
                        className="social-icon social-facebook icon-facebook"
                        target="_blank"
                        title="Facebook"
                      />
                      <a
                        href="#"
                        className="social-icon social-twitter icon-twitter"
                        target="_blank"
                        title="Twitter"
                      />
                      <a
                        href="#"
                        className="social-icon social-instagram icon-instagram"
                        target="_blank"
                        title="Instagram"
                      />
                    </div>
                    {/* End .social-icons */}
                  </div>
                  {/* End .widget */}
                </div>
                {/* End .col-lg-3 */}
                <div className="col-lg-3 col-sm-6">
                  <div className="widget">
                    <h4 className="widget-title">Customer Service</h4>
                    <ul className="links">
                      <li>
                        <NavLink to="#">Help &amp; FAQs</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Order Tracking</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Shipping &amp; Delivery</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Orders History</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Advanced Search</NavLink>
                      </li>
                      <li>
                        <NavLink to="dashboard">My Account</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Careers</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">About Us</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Corporate Sales</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Privacy</NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="widget">
                    <h4 className="widget-title">Popular Tags</h4>
                    <div className="tagcloud">
                      <NavLink to="#">Bag</NavLink>
                      <NavLink to="#">Black</NavLink>
                      <NavLink to="#">Blue</NavLink>
                      <NavLink to="#">Clothes</NavLink>
                      <NavLink to="#">Fashion</NavLink>
                      <NavLink to="#">Hub</NavLink>
                      <NavLink to="#">Shirt</NavLink>
                      <NavLink to="#">Shoes</NavLink>
                      <NavLink to="#">Skirt</NavLink>
                      <NavLink to="#">Sports</NavLink>
                      <NavLink to="#">Sweater</NavLink>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="widget widget-newsletter">
                    <h4 className="widget-title">Subscribe newsletter</h4>
                    <p>
                      Get all the latest information on events, sales and
                      offers. Sign up for newsletter:
                    </p>
                    <form action="#" className="mb-0">
                      <input
                        type="email"
                        className="form-control m-b-3"
                        placeholder="Email address"
                        required=""
                      />
                      <input
                        type="submit"
                        className="btn btn-primary shadow-none"
                        defaultValue="Subscribe"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="footer-bottom">
              <div className="container d-sm-flex align-items-center">
                <div className="footer-left">
                  <span className="footer-copyright">
                    © N<sub>STORE</sub> eCommerce. 2021. All Rights Reserved
                  </span>
                </div>
                <div className="footer-right ml-auto mt-1 mt-sm-0">
                  <div className="payment-icons">
                    <span
                      className="payment-icon visa"
                      style={{
                        backgroundImage:
                          "url(assets/images/payments/payment-visa.svg)",
                      }}
                    />
                    <span
                      className="payment-icon paypal"
                      style={{
                        backgroundImage:
                          "url(assets/images/payments/payment-paypal.svg)",
                      }}
                    />
                    <span
                      className="payment-icon stripe"
                      style={{
                        backgroundImage:
                          "url(assets/images/payments/payment-stripe.png)",
                      }}
                    />
                    <span
                      className="payment-icon verisign"
                      style={{
                        backgroundImage:
                          "url(assets/images/payments/payment-verisign.svg)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <>
        {/*  <div className="loading-overlay">
          <div className="bounce-loader">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div> */}
        <div className="mobile-menu-overlay" />
        <div className="mobile-menu-container">
          <div className="mobile-menu-wrapper">
            <span className="mobile-menu-close">
              <i className="fa fa-times" />
            </span>
            <nav className="mobile-nav">
              <ul className="mobile-menu">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="#">Categories</NavLink>
                  <ul>
                    {category.map((item) => {
                      return (
                        <li>
                          <NavLink to={`collections/${item.slug}`}>
                            {item.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
              </ul>

              <ul className="mobile-menu">
                <li>
                  <NavLink to="dashboard">My Account</NavLink>
                </li>
                <li>
                  <NavLink to="#">Contact Us</NavLink>
                </li>

                <li>
                  <NavLink to="">My Wishlist</NavLink>
                </li>
                <li>
                  <NavLink to="cart">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="login" className="login-link">
                    Log In
                  </NavLink>
                </li>
              </ul>
            </nav>
            <form className="search-wrapper mb-2" action="#">
              <input
                type="text"
                className="form-control mb-0"
                placeholder="Search..."
                required=""
              />
              <button
                className="btn icon-search text-white bg-transparent p-0"
                type="submit"
              />
            </form>
            <div className="social-icons">
              <NavLink
                to="#"
                className="social-icon social-facebook icon-facebook"
                target="_blank"
              ></NavLink>
              <NavLink
                to="#"
                className="social-icon social-twitter icon-twitter"
                target="_blank"
              ></NavLink>
              <NavLink
                to="#"
                className="social-icon social-instagram icon-instagram"
                target="_blank"
              ></NavLink>
            </div>
          </div>
        </div>
        <div className="sticky-navbar">
          <div className="sticky-info">
            <NavLink to="/">
              <i className="icon-home" />
              Home
            </NavLink>
          </div>
          <div className="sticky-info">
            <NavLink to="#" className="">
              <i className="icon-bars" />
              Categories
            </NavLink>
          </div>
          <div className="sticky-info">
            <NavLink to="/wishlist" className="">
              <i className="icon-wishlist-2" />
              Wishlist
            </NavLink>
          </div>
          <div className="sticky-info">
            <NavLink to="login" className="">
              <i className="icon-user-2" />
              Account
            </NavLink>
          </div>
          <div className="sticky-info">
            <NavLink to="/cart" className="">
              <i className="icon-shopping-cart position-relative">
                <span className="cart-count badge-circle">
                  {user ? cart.length : 0}
                </span>
              </i>
              Cart
            </NavLink>
          </div>
        </div>
        <div
          className="newsletter-popup mfp-hide bg-img"
          id="newsletter-popup-form"
          style={{
            background:
              "#f1f1f1 no-repeat center/cover url(assets/images/newsletter_popup_bg.jpg)",
          }}
        >
          <div className="newsletter-popup-content">
            <img
              src="assets/images/n_store-removebg-preview.png"
              width={111}
              height={44}
              alt="Logo"
              className="logo-newsletter"
            />
            <h2>Subscribe to newsletter</h2>
            <p>
              Subscribe to the Porto mailing list to receive updates on new
              arrivals, special offers and our promotions.
            </p>
            <form action="#">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  id="newsletter-email"
                  name="newsletter-email"
                  placeholder="Your email address"
                  required=""
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  defaultValue="Submit"
                />
              </div>
            </form>
            <div className="newsletter-subscribe">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  defaultValue={0}
                  id="show-again"
                />
                <label htmlFor="show-again" className="custom-control-label">
                  Don't show this popup again
                </label>
              </div>
            </div>
          </div>
          <button title="Close (Esc)" type="button" className="mfp-close">
            ×
          </button>
        </div>
        <NavLink id="scroll-top" href="#top" title="Top" role="button">
          <i className="icon-angle-up" />
        </NavLink>
      </>
    </>
  );
}

export default Layouts;
