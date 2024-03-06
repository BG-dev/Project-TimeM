import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthLayout, AppLayout } from './layouts';
import {
    LoginPage,
    SignupPage,
    ProfilePage,
    HomePage,
    BoardsPage,
    ContactsPage,
    BoardPage,
    ErrorPage,
    SettingsPage,
} from './pages';

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>
            <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
                <Route index element={<HomePage />} />
                <Route path="/user/:id" element={<ProfilePage />} />
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/board/:id" element={<BoardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}

export default App;
