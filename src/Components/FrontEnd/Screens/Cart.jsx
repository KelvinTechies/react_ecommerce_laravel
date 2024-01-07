import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  var totalCartPrice = 0;
  document.title = "Sas";
  if (!localStorage.getItem("auth_t")) {
    navigate("/");
    swal("Warning", "Login to continue viewing your Cart", "error");
  }
  const navigate = useNavigate();
  const deleteCartItem = (cart_id) => {
    // const

    axios.delete("api/cart_del/" + cart_id).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message);
      }
    });
  };
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
  }, [navigate, cart]);

  if (loading) {
    return;
    {
      /* <div style={{ width: "50%", margin: "auto" }}>
        <ClipLoader
          color="#ccc"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div> */
    }
    <h1>Loading Cart Products...</h1>;
  }

  var cart_html = "";
  if (cart.length > 0) {
    cart_html = (
      <main className="main">
        <div className="container">
          <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
            <li className="active">
              <NavLink to="/cart">Shopping Cart</NavLink>
            </li>
            <li>
              <NavLink to="/checkout">Checkout</NavLink>
            </li>
            <li className="disabled">
              <NavLink to="/cart">Order Complete</NavLink>
            </li>
          </ul>
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-table-container">
                <table className="table table-cart">
                  <thead>
                    <tr>
                      <th className="thumbnail-col" />
                      <th className="product-col">Product</th>
                      <th className="price-col">Price</th>
                      <th className="qty-col">Quantity</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      totalCartPrice +=
                        item.product_models.selling_price *
                        item.product_models.qty;
                      return (
                        <>
                          <tr className="product-row">
                            <td>
                              <figure className="product-image-container">
                                <NavLink to="#" className="product-image">
                                  <img
                                    src={`http://localhost:8000/${item.product_models.image}`}
                                    alt="product"
                                  />
                                </NavLink>
                                <a
                                  href="#"
                                  onClick={() => deleteCartItem(item.id)}
                                  className="btn-remove icon-cancel"
                                  title="Remove Product"
                                />
                              </figure>
                            </td>
                            <td className="product-col">
                              <h5 className="product-title">
                                <NavLink to="#">
                                  {item.product_models.name}
                                </NavLink>
                              </h5>
                            </td>
                            <td>$17.90</td>
                            <td>
                              <div className="product-single-qty">
                                <input
                                  className="horizontal-quantity form-control"
                                  type="text"
                                  value={item.product_models.qty}
                                />
                              </div>
                            </td>
                            <td className="text-right">
                              <span className="subtotal-price">
                                {" "}
                                ${item.product_models.selling_price}
                              </span>
                            </td>
                          </tr>
                        </>
                      );
                    })}{" "}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5} className="clearfix">
                        <div className="float-left">
                          <div className="cart-discount">
                            <form action="#">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Coupon Code"
                                  required=""
                                />
                                <div className="input-group-append">
                                  <button className="btn btn-sm" type="submit">
                                    Apply Coupon
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="float-right">
                          <button
                            type="submit"
                            className="btn btn-shop btn-update-cart"
                          >
                            Update Cart
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-summary">
                <h3>CART TOTALS</h3>
                <table className="table table-totals">
                  {/* <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>${totalCartPrice}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-left">
                        <h4>Shipping</h4>
                        <div className="form-group form-group-custom-control">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="radio"
                              defaultChecked=""
                            />
                            <label className="custom-control-label">
                              Local pickup
                            </label>
                          </div>
                        </div>
                        <div className="form-group form-group-custom-control mb-0">
                          <div className="custom-control custom-radio mb-0">
                            <input
                              type="radio"
                              name="radio"
                              className="custom-control-input"
                            />
                            <label className="custom-control-label">
                              Flat rate
                            </label>
                          </div>
                        </div>
                        <form action="#">
                          <div className="form-group form-group-sm">
                            <label>
                              Shipping to <strong>NY.</strong>
                            </label>
                            <div className="select-custom">
                              <select className="form-control form-control-sm">
                                <option value="USA">United States (US)</option>
                                <option value="Turkey">Turkey</option>
                                <option value="China">China</option>
                                <option value="Germany">Germany</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group form-group-sm">
                            <div className="select-custom">
                              <select className="form-control form-control-sm">
                                <option value="NY">New York</option>
                                <option value="CA">California</option>
                                <option value="TX">Texas</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group form-group-sm">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Town / City"
                            />
                          </div>
                          <div className="form-group form-group-sm">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="ZIP"
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-shop btn-update-total"
                          >
                            Update Totals
                          </button>
                        </form>
                      </td>
                    </tr>
                  </tbody> */}
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td>${totalCartPrice}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="checkout-methods">
                  <NavLink to="/checkout" className="btn btn-block btn-dark">
                    Proceed to Checkout
                    <i className="fa fa-arrow-right" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6" />
      </main>
    );
  }
  return <>{cart_html}</>;
}

export default Cart;
