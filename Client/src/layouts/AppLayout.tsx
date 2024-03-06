/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from 'antd/es/alert/Alert';
import { Loading, Navbar } from '../components';
import useAlert from '../hooks/alert.hook';
import useAuth from '../hooks/auth.hook';
import { setUser } from '../redux/features/userSlice';
import WelcomeLayer from '../components/WelcomeLayer';

export default function AppLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [isHomePage, setIsHomePage] = useState(false);
    const { text, type, visible } = useAlert();

    useEffect(() => {
        async function verify() {
            const response = await useAuth();
            if (!response || !response.isLoggedIn) navigate('/login');
            else {
                dispatch(setUser(response.user));
                setLoading(false);
            }
        }
        verify();

        if (location.pathname === '/') {
            setIsHomePage(true);
        } else {
            setIsHomePage(false);
        }
    }, [navigate]);

    return loading ? (
        <Loading />
    ) : (
        <>
            {/* {isHomePage && <WelcomeLayer />} */}
            <Navbar />
            <div className="container">
                <div className="content">
                    <Outlet />
                    {visible && <Alert className="alert" message={text} type={type} showIcon />}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
}
