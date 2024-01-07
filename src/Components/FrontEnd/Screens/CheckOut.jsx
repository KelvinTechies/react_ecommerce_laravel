import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function CheckOut() {
  const [cart, setCart] = useState([]);
  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    companyname: "",
    country: "",
    address: "",
    zip: "",
    city: "",
  });
  const [errs, setErrs] = useState([]);

  const [loading, setLoading] = useState(true);
  var totalCartPrice = 0;
  document.title = "Sas";
  if (!localStorage.getItem("auth_t")) {
    navigate("/");
    swal("Warning", "Login to continue viewing your Cart", "error");
  }
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    axios.get("api/cart").then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        }
        if (res.data.status === 401) {
          // setCart(res.data.cart)
          navigate("/myaccounts");
          swal("Warning", res.data.message, "warning");
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleInput = (e) => {
    e.persist();

    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };
  const checkOutBtn = (e) => {
    e.preventDefault();

    /*  const data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        email: checkoutInput.email,
        companyname: checkoutInput.companyname,
        country: checkoutInput.country,
        zip: checkoutInput.zip,
        city: checkoutInput.city,
        address: checkoutInput.address,
      }; */

    const formdata = new FormData();

    formdata.append("firstname", checkoutInput.firstname);
    formdata.append("lastname", checkoutInput.lastname);
    formdata.append("email", checkoutInput.email);
    formdata.append("companyname", checkoutInput.companyname);
    formdata.append("country", checkoutInput.country);
    formdata.append("zip", checkoutInput.zip);
    formdata.append("city", checkoutInput.city);
    formdata.append("address", checkoutInput.address);

    axios.post("api/order", formdata).then((res) => {
      if (res.data.status === 201) {
        swal(
          "Your Order has been placed Successfully",
          res.data.message,
          "success"
        );
        setErrs([]);
      } else if (res.data.status === 422) {
        swal(
          "All Fields are required, (you can skip the company name) ",
          "",
          "error"
        );
        setErrs(res.data.errors);
      }
    });
  };

  return (
    <main className="main main-test">
      <div className="container checkout-container">
        <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
          <li>
            <a href="/cart">Shopping Cart</a>
          </li>
          <li className="active">
            <a href="/checkout">Checkout</a>
          </li>
          <li className="disabled">
            <a href="#">Order Complete</a>
          </li>
        </ul>
        <div className="login-form-container">
          <h4>
            Returning customer?
            <button
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              className="btn btn-link btn-toggle"
            >
              Login
            </button>
          </h4>
          <div id="collapseOne" className="collapse">
            <div className="login-section feature-box">
              <div className="feature-box-content">
                <form action="#" id="login-form">
                  <p>
                    If you have shopped with us before, please enter your
                    details below. If you are a new customer, please proceed to
                    the Billing &amp; Shipping section.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="mb-0 pb-1">
                          Username or email <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="mb-0 pb-1">
                          Password <span className="required">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn">
                    LOGIN
                  </button>
                  <div className="form-footer mb-1">
                    <div className="custom-control custom-checkbox mb-0 mt-0">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="lost-password"
                      />
                      <label
                        className="custom-control-label mb-0"
                        htmlFor="lost-password"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="forgot-password.html" className="forget-password">
                      Lost your password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7">
            <ul className="checkout-steps">
              <li>
                <h2 className="step-title">Billing details</h2>
                <form action="#" id="checkout-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          First name
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          name="firstname"
                          onChange={handleInput}
                        />
                      </div>
                      <small className="text-danger">{errs.firstname}</small>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          Last name
                          <abbr className="required" title="required">
                            *
                          </abbr>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required=""
                          name="lastname"
                          onChange={handleInput}
                        />
                      </div>
                      <small className="text-danger">{errs.lastname}</small>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Company name (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyname"
                      onChange={handleInput}
                    />
                    <small className="text-danger">{errs.companyname}</small>
                  </div>
                  <div className="form-group mb-1 pb-2">
                    <label>
                      Street address
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleInput}
                      className="form-control"
                      placeholder="House number and street name"
                      required=""
                    />
                    <small className="text-danger">{errs.address}</small>
                  </div>
                  <div className="form-group">
                    <label>
                      Town / City
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleInput}
                      className="form-control"
                      required=""
                    />
                    <small className="text-danger">{errs.city}</small>
                  </div>
                  <div className="select-custom">
                    <label>
                      State / County{" "}
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <select
                      name="country"
                      id=""
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="" selected="selected">
                        NY
                      </option>
                      <option value={1}>Brunei</option>
                      <option value={2}>Bulgaria</option>
                      <option value={3}>Burkina Faso</option>
                      <option value={4}>Burundi</option>
                      <option value={5}>Cameroon</option>
                    </select>
                    <small className="text-danger">{errs.country}</small>
                  </div>
                  <div className="form-group">
                    <label>
                      Postcode / Zip
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      onChange={handleInput}
                      className="form-control"
                      required=""
                    />
                    <small className="text-danger">{errs.zip}</small>
                  </div>

                  <div className="form-group">
                    <label>
                      Email address
                      <abbr className="required" title="required">
                        *
                      </abbr>
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      className="form-control"
                      required=""
                    />
                    <small className="text-danger">{errs.email}</small>
                  </div>
                </form>
              </li>
            </ul>
          </div>
          <div className="col-lg-5">
            <div className="order-summary">
              <h3>YOUR ORDER</h3>
              <table className="table table-mini-cart">
                <thead>
                  <tr>
                    <th colSpan={2}>Product</th>
                  </tr>
                </thead>
                <tbody>
                  {/*  <tr>
                    <td className="product-col">
                      <h3 className="product-title">
                        Circled Ultimate 3D Speaker ×
                        <span className="product-qty">4</span>
                      </h3>
                    </td>
                    <td className="price-col">
                      <span>$1,040.00</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-col">
                      <h3 className="product-title">
                        Fashion Computer Bag ×
                        <span className="product-qty">2</span>
                      </h3>
                    </td>
                    <td className="price-col">
                      <span>$418.00</span>
                    </td>
                  </tr> */}
                  {cart.map((item) => {
                    totalCartPrice +=
                      item.product_models.selling_price *
                      item.product_models.qty;
                    return (
                      <>
                        <tr>
                          <td className="product-col">
                            <h3 className="product-title">
                              {item.product_models.name} ×{" "}
                              <span className="product-qty">
                                {" "}
                                {item.product_models.qty}
                              </span>
                            </h3>
                          </td>
                          <td className="price-col">
                            <span>
                              {" "}
                              $
                              {item.product_models.selling_price *
                                item.product_models.qty}
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="cart-subtotal">
                    <td>
                      <h4>Subtotal</h4>
                    </td>
                    <td className="price-col">
                      <span>${totalCartPrice}</span>
                    </td>
                  </tr>

                  <tr className="order-total">
                    <td>
                      <h4>Total</h4>
                    </td>
                    <td>
                      <b className="total-price">
                        <span>${totalCartPrice}</span>
                      </b>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="payment-methods">
                <h4 className="">Payment methods</h4>
                <div className="info-box with-icon p-0">
                  <p>
                    Sorry, it seems that there are no available payment methods
                    for your state. Please contact us if you require assistance
                    or wish to make alternate arrangements.
                  </p>
                </div>
              </div>
              <button
                onClick={checkOutBtn}
                type="submit"
                className="btn btn-dark btn-place-order"
                form="checkout-form"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckOut;
