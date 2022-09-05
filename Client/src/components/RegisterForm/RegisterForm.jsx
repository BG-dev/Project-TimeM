import React, { useState } from "react";
import { Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { CustomField, FormContainer } from "../../components";
import * as Yup from "yup";

import "./RegisterForm.scss";
import authApi from "../../api/authApi";

function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username is too short")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .required("Password is required"),
    passwordRepeat: Yup.string()
      .min(8, "Password confirmation is too short")
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const signUpHandler = async (values) => {
    setLoading(true);
    try {
      const newUserData = {
        username: values.username.toLowerCase(),
        email: values.email.toLowerCase(),
        password: values.password,
      };
      await authApi.signup(newUserData);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="auth__title">Sign Up</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordRepeat: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values, actions) => {
          await signUpHandler(values);
          actions.setFieldValue("password", "");
          actions.setFieldValue("passwordRepeat", "");
        }}
      >
        {() => (
          <Form className="auth__form">
            <FormContainer
              value={"username"}
              placeholder={"Username"}
              type={"text"}
            />
            <FormContainer
              value={"email"}
              placeholder={"Email"}
              type={"email"}
            />
            <FormContainer
              value={"password"}
              placeholder={"Password"}
              type={"password"}
            />
            <FormContainer
              value={"passwordRepeat"}
              placeholder={"Repeat password"}
              type={"password"}
            />
            <div className="auth__form-control">
              <button className="btn btn-blue" type="submit" disabled={loading}>
                Sign Up
              </button>
              <span className="auth__form-text">Already have an account?</span>
              <NavLink to="/login" className="auth__form-link">
                Sign In
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
