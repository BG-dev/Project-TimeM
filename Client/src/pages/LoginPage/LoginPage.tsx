import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import authApi from '../../api/authApi';
import IUser from '../../types/user';
import useAlert from '../../hooks/alert.hook';
import useServerError from '../../hooks/serverError.hook';
import './LoginPage.scss';

interface IFormValues {
  username: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { setAlertState } = useAlert();
  const { handleServerError } = useServerError();

  const loginHandler = async (userData: IUser) => {
    try {
      const response = await authApi.login(userData);
      const { token, message } = response.data;
      localStorage.setItem('token', token);
      setAlertState(message, 'success');
      navigate('/');
    } catch (error) {
      setAlertState(handleServerError(error), 'error');
    }
  };

  const submitForm = (values: IFormValues) => {
    const userData: IUser = {
      username: values.username.toLowerCase(),
      password: values.password,
    };

    loginHandler(userData);
  };

  return (
    <>
      <h2 className="auth__title">Sign In</h2>
      <Form
        className="login-form"
        layout="vertical"
        style={{ minWidth: 500 }}
        onFinish={submitForm}
      >
        <Form.Item<IFormValues> label="Username" name="username" validateFirst>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item<IFormValues> label="Password" name="password" validateFirst>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Space size="middle">
          <Button type="primary" size="large" htmlType="submit">
            Sign In
          </Button>
          <Button type="primary" size="large" style={{ margin: '0 8px' }}>
            <NavLink to="/signup">Create new account</NavLink>
          </Button>
          <NavLink to="/signup" className="auth__form-link">
            Forgot password?
          </NavLink>
        </Space>
      </Form>
    </>
  );
}

export default LoginPage;
