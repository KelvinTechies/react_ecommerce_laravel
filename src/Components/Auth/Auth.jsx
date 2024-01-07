import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function Auth() {
  const [login_email, setlogin_email] = useState("");
  const [login_password, setLpassword] = useState("");
  const [loadingPge, setLoadingPge] = useState(false);

  const navigate = useNavigate();
  const [registration_email, setregistration_email] = useState("");
  const [registration_name, setregistration_name] = useState("");
  const [password, setRpassword] = useState("");
  const [password_confirmation, setRpassword_confirmation] = useState("");
  const [err, setErr] = useState([]);

  const registerBtn = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("registration_name", registration_name);
    formData.append("registration_email", registration_email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);

    let item = {
      registration_name,
      registration_email,
      password,
      password_confirmation,
    };
    axios.post("api/register", formData).then((res) => {
      if (res.data.status === 201) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 422) {
        swal("Error", "All FIelds are required", "error");
        setErr(res.data.errors);
      }
    });
  };

  const loginBtn = async (e) => {
    e.preventDefault();

    let item = { login_email, login_password };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", item).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_t", res.data.token);
          localStorage.setItem("user_info", res.data.user);
          localStorage.setItem("role_play", res.data.role);
          if (res.data.role === 1) {
            navigate("/admin");
          } else if (res.data.role === 0) {
            navigate("/dashboard");
          }
        } else if (res.data.status === 401) {
          swal("Error", res.data.message, "error");
          setErr(res.data.message);
        } else if (res.data.status === 422) {
          swal("Error", "All fields are required", "error");
          setErr(res.data.errors);
        }
      });
    });
  };
  return (
    <>
      <main className="main">
        <div className="page-header">
          <div className="container d-flex flex-column align-items-center">
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
              <div className="container">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="demo4.html">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="category.html">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    My Account
                  </li>
                </ol>
              </div>
            </nav>
            <h1>My Account</h1>
          </div>
        </div>
        <div className="container login-container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                <div className="col-md-6">
                  <div className="heading mb-1">
                    <h2 className="title">Login</h2>
                  </div>
                  <form onSubmit={loginBtn}>
                    <label htmlFor="login-email">
                      email address
                      <span className="required">*</span>
                    </label>
                    <span className="text-danger">{err.login_email}</span>

                    <input
                      type="email"
                      className="form-input form-wide"
                      id="login-email"
                      required=""
                      name="login_email"
                      onChange={(w) => setlogin_email(w.target.value)}
                    />
                    <label htmlFor="login-password">
                      Password
                      <span className="required">*</span>
                    </label>
                    <span className="text-danger">{err.login_password}</span>

                    <input
                      type="password"
                      className="form-input form-wide"
                      id="login-password"
                      required=""
                      name="login_password"
                      onChange={(w) => setLpassword(w.target.value)}
                    />

                    <div className="form-footer">
                      <div className="custom-control custom-checkbox mb-0">
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
                      <a
                        href="#"
                        className="forget-password text-dark form-footer-right"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <button type="submit" className="btn btn-dark btn-md w-100">
                      LOGIN
                    </button>
                  </form>
                </div>
                <div className="col-md-6">
                  <div className="heading mb-1">
                    <h2 className="title">Register</h2>
                  </div>
                  <form onSubmit={registerBtn}>
                    <label htmlFor="register-fullname">
                      Fullname
                      <span className="required">*</span>
                    </label>
                    <span className="text-danger">{err.registration_name}</span>

                    <input
                      type="text"
                      onChange={(e) => setregistration_name(e.target.value)}
                      className="form-input form-wide"
                      id="register-fullname"
                      required=""
                    />

                    <label htmlFor="register-email">
                      Email address
                      <span className="required">*</span>
                    </label>

                    <span className="text-danger">
                      {err.registration_email}
                    </span>
                    <input
                      type="email"
                      className="form-input form-wide"
                      id="register-email"
                      required=""
                      onChange={(e) => setregistration_email(e.target.value)}
                    />

                    <label htmlFor="register-password">
                      Password
                      <span className="required">*</span>
                    </label>
                    <span className="text-danger">{err.password}</span>

                    <input
                      type="password"
                      className="form-input form-wide"
                      id="register-password"
                      required=""
                      onChange={(e) => setRpassword(e.target.value)}
                    />

                    <label htmlFor="register-c_pwd">
                      Confirm Password
                      <span className="required">*</span>
                    </label>
                    {err.password_confirmation}

                    <input
                      type="password"
                      className="form-input form-wide"
                      id="register-c_pwd"
                      required=""
                      onChange={(e) =>
                        setRpassword_confirmation(e.target.value)
                      }
                    />
                    <span className="text-danger"></span>

                    <div className="form-footer mb-2">
                      <button
                        type="submit"
                        className="btn btn-dark btn-md w-100 mr-0"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* End .main */}
    </>
  );
}

export default Auth;
