import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CustomField } from "../../components";

import "./SignupPage.scss";
import authApi from "../../api/authApi";
import IUser from "../../types/user";
import { useAlert } from "../../hooks/alert.hook";
import { useServerError } from "../../hooks/serverError.hook";

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

interface IFormValues {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAlertState } = useAlert();
  const { handleServerError } = useServerError();

  const signUpHandler = async (userData: IUser) => {
    setLoading(true);
    try {
      const response = await authApi.signup(userData);
      const { message } = response.data;
      setAlertState(message, "success");
      navigate("/login");
    } catch (error) {
      setAlertState(handleServerError(error), "error");
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (
    values: IFormValues,
    { setFieldValue }: FormikHelpers<IFormValues>,
  ) => {
    const newUserData = {
      username: values.username.toLowerCase(),
      email: values.email.toLowerCase(),
      password: values.password,
    };

    signUpHandler(newUserData);
    setFieldValue("password", "");
    setFieldValue("passwordRepeat", "");
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
        onSubmit={submitForm}
      >
        {() => (
          <Form className="auth__form">
            <CustomField name="username" label="Username" type="text" />
            <CustomField name="email" label="Email" type="email" />
            <CustomField name="password" label="Password" type="password" />
            <CustomField
              name="passwordRepeat"
              label="Repeat password"
              type="password"
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

export default SignupPage;
