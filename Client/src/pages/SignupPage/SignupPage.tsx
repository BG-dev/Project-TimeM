import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import './SignupPage.scss';
import authApi from '../../api/authApi';
import IUser from '../../types/user';
import useAlert from '../../hooks/alert.hook';
import useServerError from '../../hooks/serverError.hook';
import {
    confirmPasswordValidation,
    emailValidation,
    passwordValidation,
    usernameValidation,
} from '../../utils/validations';

interface IFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function SignupPage() {
    const navigate = useNavigate();
    const { setAlertState } = useAlert();
    const { handleServerError } = useServerError();

    const signUpHandler = async (userData: IUser) => {
        try {
            const response = await authApi.signup(userData);
            const { message } = response.data;
            setAlertState(message, 'success');
            navigate('/login');
        } catch (error) {
            setAlertState(handleServerError(error), 'error');
        }
    };

    const submitForm = (values: IFormValues) => {
        const newUserData = {
            username: values.username.toLowerCase(),
            email: values.email.toLowerCase(),
            password: values.password,
        };

        signUpHandler(newUserData);
    };

    return (
        <>
            <h2 className="auth__title">Sign Up</h2>
            <Form
                layout="vertical"
                style={{ maxWidth: 600, minWidth: 500 }}
                className="signup-form"
                onFinish={submitForm}>
                <Form.Item<IFormValues>
                    label="Username"
                    name="username"
                    validateFirst
                    rules={usernameValidation}
                    hasFeedback>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item<IFormValues>
                    label="Email"
                    name="email"
                    validateFirst
                    rules={emailValidation}
                    hasFeedback>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item<IFormValues>
                    label="Password"
                    name="password"
                    validateFirst
                    rules={passwordValidation}
                    hasFeedback>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item<IFormValues>
                    label="Confirm Password"
                    name="confirmPassword"
                    validateFirst
                    dependencies={['password']}
                    rules={confirmPasswordValidation}
                    hasFeedback>
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Space size="middle">
                    <Button type="primary" size="large" htmlType="submit">
                        Sign Up
                    </Button>
                    <Space size={5}>
                        <span>Already have an account?</span>
                        <NavLink to="/login" className="auth__form-link">
                            Sign In
                        </NavLink>
                    </Space>
                </Space>
            </Form>
        </>
    );
}

export default SignupPage;
