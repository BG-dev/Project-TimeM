import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import "./LoginForm.scss";

function LoginForm() {
  const navigate = useNavigate();
  const { loading, dispatch } = useContext(AuthContext);

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username is too short")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .required("Password is required"),
  });

  const loginHandler = async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", { ...values });
      console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
    navigate("/");
  };

  return (
    <>
      <h2 className="auth__title">Sign In</h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={(values, actions) => {
          loginHandler(values);
          actions.setFieldValue("password", "");
        }}
      >
        {() => (
          <Form className="auth__form">
            <div className="auth__form-container">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                className="auth__form-error"
                component="span"
                name="username"
              />
            </div>
            <div className="auth__form-container">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className="auth__form-error"
                component="span"
                name="password"
              />
            </div>
            <div className="auth__form-control">
              <button className="btn" type="submit" disabled={loading}>
                Sign In
              </button>
              <NavLink to="/register" className="btn">
                Create new account
              </NavLink>
              <NavLink to="/register" className="auth__form-link">
                Forgot password?
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
