import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import "./LoginForm.scss";
import authApi from "../../api/authApi";

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
    const userData = {
      username: values.username.toLowerCase(),
      password: values.password,
    };
    try {
      const response = await authApi.login(userData);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: response.token,
          username: response.username,
        },
      });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.message });
    }
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
        onSubmit={async (values, actions) => {
          await loginHandler(values);
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
              <button className="btn btn-blue" type="submit" disabled={loading}>
                Sign In
              </button>
              <NavLink to="/register" className="btn btn-blue">
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
