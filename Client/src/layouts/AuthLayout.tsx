import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import { Loading } from '../components';
import useAuth from '../hooks/auth.hook';
import useAlert from '../hooks/alert.hook';

import '../scss/_auth.scss';

export default function AuthLayout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { text, type, visible } = useAlert();

    const verify = useCallback(async () => {
        const response = await useAuth();

        if (!response || !response.isLoggedIn) setLoading(false);
        else navigate('/');
    }, []);

    useEffect(() => {
        verify();
    }, [navigate, verify]);

    return loading ? (
        <Loading />
    ) : (
        <div className="auth-wrapper">
            <div className="auth">
                <Outlet />
                {visible && <Alert className="alert" message={text} type={type} showIcon />}
            </div>
        </div>
    );
}
