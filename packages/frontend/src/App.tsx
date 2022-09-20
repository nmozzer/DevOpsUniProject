import React, { useEffect } from 'react';
import './css/App.css';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import AuthProvider from './cognito/context';
import ChangePassword from './components/auth/routes/ChangePassword';
import ForgotPassword from './components/auth/routes/ForgotPassword';
import Resend from './components/auth/routes/Resend';
import SignIn from './components/auth/routes/SignIn';
import Verify from './components/auth/routes/Verify';
import { apiCall } from './api/client';
import Header from './components/Header';
import SignUp from './components/auth/routes/SignUp';

function App() {
    useEffect(() => {
        const getResult = async () => {
            const result = await apiCall('/api/');
            console.log(result);
        };

        getResult();
    }, []);

    return (
        <React.Fragment>
            <AuthProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/ideas" element={<MainPage />} />
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/resendCode" element={<Resend />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                        <Route path="/signUp" element={<SignUp />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </React.Fragment>
    );
}

export default App;
