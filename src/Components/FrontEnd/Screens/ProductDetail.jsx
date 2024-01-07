import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import "../../../myAsset/assets/js/jquery-3.7.0.min.js";
import "../../../myAsset/assets/js/plugins.js";
import "../../../myAsset/assets/js/jquery-3.7.0.min.js";
import { FaPlus } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
function ProductDetail() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [product_qty, setProduct_qty] = useState(1);
  const params = useParams();
  const fetchSingleData = async () => {
    let result = await fetch("http://localhost:8000/api/products/" + params.id);
    result = await result.json();
    setData(result);
  };

  const handleIncrmnt = () => {
    if (product_qty < 10) {
      setProduct_qty((count) => count + 1);
    }
  };
  const handleDecrmnt = () => {
    if (product_qty > 1) {
      setProduct_qty((count) => count - 1);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();
    const product_id = params.id;
    // const item = { product_id, product_qty };

    const item = new FormData();
    item.append("product_id", product_id);
    item.append("product_qty", product_qty);

    axios.post("api/add_cart", item).then((res) => {
      if (res.data.status === 201) {
        swal("Success", res.data.message, "success");
      }
      if (res.data.status === 401) {
        swal("Error", res.data.message, "error");
      }
      if (res.data.status === 409) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };

  const singleProducts = () => {
    axios.get("api/products/products/" + params.id).then((res) => {
      if (res.data.status == 200) {
        setProduct(res.data.products);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Error", "", "error");
      }
    });
  };

  const fetchRelatedProducts = () => {
    axios.get("api/products/relatedProducts/" + params.id).then((res) => {
      if (res.data.status === 200) {
        setRelated(res.data.products);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Error", "", "error");
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    // fetchSingleData();
    // addToCartHandler();
    singleProducts();
    fetchRelatedProducts();
  }, [navigate, params.id]);
  // addToCart();

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main className="main">
          <div className="container">
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="demo4-dark.html" title="homing">
                    <i className="icon-home" />
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Products</a>
                </li>
              </ol>
            </nav>
            <form onSubmit={addToCart}>
              <div className="product-single-container product-single-default">
                {/* <Slider {...settings}> */}

                {product.map((item) => {
                  return (
                    <>
                      <div className="cart-message d-none">
                        <strong className="single-cart-notice">
                          {item.name}
                        </strong>
                        <span>has been added to your cart.</span>
                      </div>
                      <div className="row myRow">
                        <div className="col-lg-5 col-md-6 product-single-gallery">
                          <div className="product-slider-container">
                            <div className="label-group">
                              <div className="product-label label-hot">HOT</div>
                              <div className="product-label label-sale">
                                -16%
                              </div>
                            </div>
                            <div className="product-single-carousel  show-nav-hover">
                              <div className="product-item">
                                <div className="proBx">
                                  <img
                                    className="product-single-image"
                                    src={`http://localhost:8000/${item.image}`}
                                    alt={item.name}
                                    data-zoom-image={`http://localhost:8000/${item.image}`}
                                    // width={468}
                                    // height={468}
                                  />
                                </div>
                              </div>
                            </div>
                            <span className="prod-full-screen">
                              <i className="icon-plus" />
                            </span>
                          </div>
                          <div className="prod-thumbnail owl-dots">
                            <div className="owl-dot">
                              <img
                                src={`http://localhost:8000/${item.image}`}
                                width={110}
                                height={110}
                                alt="product-thumbnail"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7 col-md-6 product-single-details">
                          <h1 className="product-title">{item.name}</h1>

                          <div className="ratings-container">
                            <div className="product-ratings">
                              <span
                                className="ratings"
                                style={{ width: "60%" }}
                              />
                              {/* End .ratings */}
                              <span className="tooltiptext tooltip-top" />
                            </div>
                            {/* End .product-ratings */}
                            <a href="#" className="rating-link">
                              ( 6 Reviews )
                            </a>
                          </div>
                          {/* End .ratings-container */}
                          <hr className="short-divider" />
                          <div className="price-box">
                            <span className="old-price">
                              ${item.original_price}
                            </span>
                            <span className="new-price">
                              ${item.selling_price}
                            </span>
                          </div>
                          {/* End .price-box */}
                          <div className="product-desc">
                            <p>{item.description}</p>
                          </div>
                          {/* End .product-desc */}
                          <ul className="single-info-list">
                            <li>
                              SKU: <strong>654613612</strong>
                            </li>
                            <li>
                              CATEGORY:{" "}
                              <strong>
                                <a href="#" className="product-category">
                                  {item.category_models.name}
                                </a>
                              </strong>
                            </li>
                          </ul>
                          <div className="product-action">
                            <div className="product-single-qty">
                              <input
                                className="horizontal-quantity form-control"
                                type="text"
                                title="qty"
                                value={product_qty}
                              />
                            </div>
                            <button
                              //   href="javascript:;"
                              className="btn btn-dark add-cart mr-2"
                              title="Add to Cart"
                            >
                              Add to Cart
                            </button>
                            <a
                              href="cart.html"
                              className="btn btn-gray view-cart d-none"
                            >
                              View cart
                            </a>
                          </div>
                          <hr className="divider mb-0 mt-0" />
                          <div className="product-single-share mb-3">
                            <label className="sr-only">Share:</label>
                            <div className="social-icons mr-2">
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
                                className="social-icon social-linkedin fab fa-linkedin-in"
                                target="_blank"
                                title="Linkedin"
                              />
                              <a
                                href="#"
                                className="social-icon social-gplus fab fa-google-plus-g"
                                target="_blank"
                                title="Google +"
                              />
                              <a
                                href="#"
                                className="social-icon social-mail icon-mail-alt"
                                target="_blank"
                                title="Mail"
                              />
                            </div>
                            {/* End .social-icons */}
                            <a
                              href="wishlist.html"
                              className="btn-icon-wish add-wishlist"
                              title="Add to Wishlist"
                            >
                              <i className="icon-wishlist-2" />
                              <span>Add to Wishlist</span>
                            </a>
                          </div>
                          {/* End .product single-share */}
                        </div>
                      </div>
                    </>
                  );
                })}
                {/* </Slider> */}
              </div>
            </form>
            <div className="product-single-tabs">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="product-tab-desc"
                    data-toggle="tab"
                    href="#product-desc-content"
                    role="tab"
                    aria-controls="product-desc-content"
                    aria-selected="true"
                  >
                    Description
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="product-tab-reviews"
                    data-toggle="tab"
                    href="#product-reviews-content"
                    role="tab"
                    aria-controls="product-reviews-content"
                    aria-selected="false"
                  >
                    Reviews (1)
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                {product.map((detail) => {
                  return (
                    <>
                      <div
                        className="tab-pane fade show active"
                        id="product-desc-content"
                        role="tabpanel"
                        aria-labelledby="product-tab-desc"
                      >
                        <div className="product-desc-content">
                          <p>{detail.description}</p>
                          <ul>
                            <li>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Nobis, nihil. Perferendis deserunt soluta
                              illo animi?
                            </li>
                            <li>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Quod, ut. Fugit amet alias
                              doloribus/ Lorem ipsum dolor sit amet consectetur.
                            </li>
                            <li>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Inventore ullam provident iure dolore
                              reiciendis esse voluptatum reprehenderit nisi
                              cumque?
                            </li>
                          </ul>
                          <p>
                            Sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.{" "}
                          </p>
                        </div>
                        {/* End .product-desc-content */}
                      </div>
                    </>
                  );
                })}
                {/* End .tab-pane */}
                <div
                  className="tab-pane fade"
                  id="product-size-content"
                  role="tabpanel"
                  aria-labelledby="product-tab-size"
                >
                  <div className="product-size-content">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src="/assets/images/products/single/body-shape.png"
                          alt="body shape"
                          width={217}
                          height={398}
                        />
                      </div>
                      {/* End .col-md-4 */}
                      {/*  <div className="col-md-8">
                        <table className="table table-size">
                          <thead>
                            <tr>
                              <th>SIZE</th>
                              <th>CHEST(in.)</th>
                              <th>WAIST(in.)</th>
                              <th>HIPS(in.)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>XS</td>
                              <td>34-36</td>
                              <td>27-29</td>
                              <td>34.5-36.5</td>
                            </tr>
                            <tr>
                              <td>S</td>
                              <td>36-38</td>
                              <td>29-31</td>
                              <td>36.5-38.5</td>
                            </tr>
                            <tr>
                              <td>M</td>
                              <td>38-40</td>
                              <td>31-33</td>
                              <td>38.5-40.5</td>
                            </tr>
                            <tr>
                              <td>L</td>
                              <td>40-42</td>
                              <td>33-36</td>
                              <td>40.5-43.5</td>
                            </tr>
                            <tr>
                              <td>XL</td>
                              <td>42-45</td>
                              <td>36-40</td>
                              <td>43.5-47.5</td>
                            </tr>
                            <tr>
                              <td>XXL</td>
                              <td>45-48</td>
                              <td>40-44</td>
                              <td>47.5-51.5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div> */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/*  <table className="table table-striped mt-2">
                    <tbody>
                      <tr>
                        <th>Weight</th>
                        <td>23 kg</td>
                      </tr>
                      <tr>
                        <th>Dimensions</th>
                        <td>12 × 24 × 35 cm</td>
                      </tr>
                      <tr>
                        <th>Color</th>
                        <td>Black, Green, Indigo</td>
                      </tr>
                      <tr>
                        <th>Size</th>
                        <td>Large, Medium, Small</td>
                      </tr>
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
            <div className="products-section pt-0">
              <h2 className="section-title">Related Products</h2>
              <div className="products-slider owl-carousel owl-theme dots-top dots-small">
                <div className="product-default">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/product-1.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/product-1-2.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                    </a>
                    <div className="label-group">
                      <div className="product-label label-hot">HOT</div>
                      <div className="product-label label-sale">-20%</div>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="category-list">
                      <a
                        href="demo4-dark-shop.html"
                        className="product-category"
                      >
                        Category
                      </a>
                    </div>
                    <h3 className="product-title">
                      <a href="demo4-dark-product.html">
                        Ultimate 3D Bluetooth Speaker
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "80%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top" />
                      </div>
                      {/* End .product-ratings */}
                    </div>
                    {/* End .product-container */}
                    <div className="price-box">
                      <del className="old-price">$59.00</del>
                      <span className="product-price">$49.00</span>
                    </div>
                    {/* End .price-box */}
                    <div className="product-action">
                      <a
                        href="wishlist.html"
                        title="Wishlist"
                        className="btn-icon-wish"
                      >
                        <i className="icon-heart" />
                      </a>
                      <a
                        href="demo4-dark-product.html"
                        className="btn-icon btn-add-cart"
                      >
                        <i className="fa fa-arrow-right" />
                        <span>SELECT OPTIONS</span>
                      </a>
                      <a
                        href="ajax/product-quick-view.html"
                        className="btn-quickview"
                        title="Quick View"
                      >
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                  {/* End .product-details */}
                </div>
                <div className="product-default">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/product-3.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/product-3-2.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                    </a>
                    <div className="label-group">
                      <div className="product-label label-hot">HOT</div>
                      <div className="product-label label-sale">-20%</div>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="category-list">
                      <a
                        href="demo4-dark-shop.html"
                        className="product-category"
                      >
                        Category
                      </a>
                    </div>
                    <h3 className="product-title">
                      <a href="demo4-dark-product.html">
                        Circled Ultimate 3D Speaker
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "80%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top" />
                      </div>
                      {/* End .product-ratings */}
                    </div>
                    {/* End .product-container */}
                    <div className="price-box">
                      <del className="old-price">$59.00</del>
                      <span className="product-price">$49.00</span>
                    </div>
                    {/* End .price-box */}
                    <div className="product-action">
                      <a
                        href="wishlist.html"
                        title="Wishlist"
                        className="btn-icon-wish"
                      >
                        <i className="icon-heart" />
                      </a>
                      <a
                        href="demo4-dark-product.html"
                        className="btn-icon btn-add-cart"
                      >
                        <i className="fa fa-arrow-right" />
                        <span>SELECT OPTIONS</span>
                      </a>
                      <a
                        href="ajax/product-quick-view.html"
                        className="btn-quickview"
                        title="Quick View"
                      >
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                  {/* End .product-details */}
                </div>
                <div className="product-default">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/product-7.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/product-7-2.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                    </a>
                    <div className="label-group">
                      <div className="product-label label-hot">HOT</div>
                      <div className="product-label label-sale">-20%</div>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="category-list">
                      <a
                        href="demo4-dark-shop.html"
                        className="product-category"
                      >
                        Category
                      </a>
                    </div>
                    <h3 className="product-title">
                      <a href="demo4-dark-product.html">
                        Brown-Black Men Casual Glasses
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "80%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top" />
                      </div>
                      {/* End .product-ratings */}
                    </div>
                    {/* End .product-container */}
                    <div className="price-box">
                      <del className="old-price">$59.00</del>
                      <span className="product-price">$49.00</span>
                    </div>
                    {/* End .price-box */}
                    <div className="product-action">
                      <a
                        href="wishlist.html"
                        title="Wishlist"
                        className="btn-icon-wish"
                      >
                        <i className="icon-heart" />
                      </a>
                      <a
                        href="demo4-dark-product.html"
                        className="btn-icon btn-add-cart"
                      >
                        <i className="fa fa-arrow-right" />
                        <span>SELECT OPTIONS</span>
                      </a>
                      <a
                        href="ajax/product-quick-view.html"
                        className="btn-quickview"
                        title="Quick View"
                      >
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                  {/* End .product-details */}
                </div>
                <div className="product-default">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/product-6.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/product-6-2.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                    </a>
                    <div className="label-group">
                      <div className="product-label label-hot">HOT</div>
                      <div className="product-label label-sale">-20%</div>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="category-list">
                      <a
                        href="demo4-dark-shop.html"
                        className="product-category"
                      >
                        Category
                      </a>
                    </div>
                    <h3 className="product-title">
                      <a href="demo4-dark-product.html">
                        Men Black Gentle Belt
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "80%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top" />
                      </div>
                      {/* End .product-ratings */}
                    </div>
                    {/* End .product-container */}
                    <div className="price-box">
                      <del className="old-price">$59.00</del>
                      <span className="product-price">$49.00</span>
                    </div>
                    {/* End .price-box */}
                    <div className="product-action">
                      <a
                        href="wishlist.html"
                        title="Wishlist"
                        className="btn-icon-wish"
                      >
                        <i className="icon-heart" />
                      </a>
                      <a
                        href="demo4-dark-product.html"
                        className="btn-icon btn-add-cart"
                      >
                        <i className="fa fa-arrow-right" />
                        <span>SELECT OPTIONS</span>
                      </a>
                      <a
                        href="ajax/product-quick-view.html"
                        className="btn-quickview"
                        title="Quick View"
                      >
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                  {/* End .product-details */}
                </div>
                <div className="product-default">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/product-4.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/product-4-2.jpg"
                        width={280}
                        height={280}
                        alt="product"
                      />
                    </a>
                    <div className="label-group">
                      <div className="product-label label-hot">HOT</div>
                      <div className="product-label label-sale">-20%</div>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="category-list">
                      <a
                        href="demo4-dark-shop.html"
                        className="product-category"
                      >
                        Category
                      </a>
                    </div>
                    <h3 className="product-title">
                      <a href="demo4-dark-product.html">
                        Blue Backpack for the Young - S
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "80%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top" />
                      </div>
                      {/* End .product-ratings */}
                    </div>
                    {/* End .product-container */}
                    <div className="price-box">
                      <del className="old-price">$59.00</del>
                      <span className="product-price">$49.00</span>
                    </div>
                    {/* End .price-box */}
                    <div className="product-action">
                      <a
                        href="wishlist.html"
                        title="Wishlist"
                        className="btn-icon-wish"
                      >
                        <i className="icon-heart" />
                      </a>
                      <a
                        href="demo4-dark-product.html"
                        className="btn-icon btn-add-cart"
                      >
                        <i className="fa fa-arrow-right" />
                        <span>SELECT OPTIONS</span>
                      </a>
                      <a
                        href="ajax/product-quick-view.html"
                        className="btn-quickview"
                        title="Quick View"
                      >
                        <i className="fas fa-external-link-alt" />
                      </a>
                    </div>
                  </div>
                  {/* End .product-details */}
                </div>
              </div>
              {/* End .products-slider */}
            </div>
            {/* End .products-section */}
            <hr className="mt-0 m-b-5" />
            <div className="product-widgets-container row pb-2">
              <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                <h4 className="section-sub-title">Featured Products</h4>
                <div className="product-default left-details product-widget">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-1.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-1-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Ultimate 3D Bluetooth Speaker
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-2-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Brown Women Casual HandBag
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top">5.00</span>
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-3.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-3-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Circled Ultimate 3D Speaker
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
              <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                <h4 className="section-sub-title">Best Selling Products</h4>
                <div className="product-default left-details product-widget">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-4.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-4-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Blue Backpack for the Young - S
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top">5.00</span>
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-5.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-5-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Casual Spring Blue Shoes
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-6.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-6-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Men Black Gentle Belt
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top">5.00</span>
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
              <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                <h4 className="section-sub-title">Latest Products</h4>
                <div className="product-default left-details product-widget">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-7.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-7-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Men Black Sports Shoes
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-8.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-8-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Brown-Black Men Casual Glasses
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top">5.00</span>
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-9.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-9-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Black Men Casual Glasses
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
              <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                <h4 className="section-sub-title">Top Rated Products</h4>
                <div className="product-default left-details product-widget">
                  <figure>
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-10.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-10-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Basketball Sports Blue Shoes
                      </a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-11.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-11-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">
                        Men Sports Travel Bag
                      </a>
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
                        {/* End .ratings */}
                        <span className="tooltiptext tooltip-top">5.00</span>
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
                    <a href="demo4-dark-product.html">
                      <img
                        src="/assets/images/products/small/product-12.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                      <img
                        src="/assets/images/products/small/product-12-2.jpg"
                        width={74}
                        height={74}
                        alt="product"
                      />
                    </a>
                  </figure>
                  <div className="product-details">
                    <h3 className="product-title">
                      {" "}
                      <a href="demo4-dark-product.html">Brown HandBag</a>{" "}
                    </h3>
                    <div className="ratings-container">
                      <div className="product-ratings">
                        <span className="ratings" style={{ width: "100%" }} />
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
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </main>
      )}
    </>
  );
}

export default ProductDetail;
