import React from 'react';
import './css/App.css';
import LandingPage from './components/LandingPage';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MainPage from './components/MainPage';
import SignIn from './components/auth/routes/SignIn';
import AuthProvider from './cognito/context';
import Verify from './components/auth/routes/Verify';
import Resend from './components/auth/routes/Resend';

function App() {
    return (
        <React.Fragment>
            <AuthProvider>
                <Router>
                    <div className="flex flex-col bg-pink-500">
                        <AppBar position="sticky">
                            <Toolbar variant="dense" className="flex justify-between flex-row items-start bg-pink-500">
                                <div className="flex">
                                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" component="div" className="p-2">
                                        <Link to="/" className="pr-1">
                                            Home
                                        </Link>
                                        <Link to="/ideas">Enter</Link>
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="h6" color="inherit" component="div">
                                        <Link to="/signout">Signout</Link>
                                    </Typography>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/ideas" element={<MainPage />} />
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/resendCode" element={<Resend />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </React.Fragment>
    );
}

export default App;
