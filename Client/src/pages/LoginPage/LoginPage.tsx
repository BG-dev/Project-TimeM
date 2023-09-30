import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { CustomField } from "../../components";
import * as Yup from "yup";
import "./LoginPage.scss";
import authApi from "../../api/authApi";
import IUser from "../../types/user";

const signInSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Username is too short")
        .required("Username is required"),
    password: Yup.string()
        .min(8, "Password is too short")
        .required("Password is required"),
});

interface IFormValues {
    username: string;
    password: string;
}

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const loginHandler = async (userData: IUser) => {
        setLoading(true);
        try {
            const response = await authApi.login(userData);
            const token: string = response.data.token;
            setLoading(false);
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            setLoading(false);
        }
    };

    const submitForm = (
        values: IFormValues,
        { setFieldValue }: FormikHelpers<IFormValues>
    ) => {
        const userData: IUser = {
            username: values.username.toLowerCase(),
            password: values.password,
        };

        loginHandler(userData);
        setFieldValue("password", "");
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
                onSubmit={submitForm}
            >
                {() => (
                    <Form className="auth__form">
                        <CustomField
                            name="username"
                            label="Username"
                            type="text"
                        />
                        <CustomField
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <div className="auth__form-control">
                            <button
                                className="btn btn-blue"
                                type="submit"
                                disabled={loading}
                            >
                                Sign In
                            </button>
                            <NavLink to="/signup" className="btn btn-blue">
                                Create new account
                            </NavLink>
                            <NavLink to="/signup" className="auth__form-link">
                                Forgot password?
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default LoginPage;
