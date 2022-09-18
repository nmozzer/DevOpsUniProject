import React from 'react';
import './css/App.css';
import LandingPage from './components/LandingPage';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
    return (
        <React.Fragment>
            <Router>
                <div className="flex flex-col">
                    <AppBar position="fixed">
                        <Toolbar variant="dense" className="flex justify-between flex-row items-start">
                            <div className="flex">
                                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" component="div" className="p-2">
                                    <Link to="/ideas">Enter</Link>
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h6" color="inherit" component="div">
                                    <Link to="/signout">Signout</Link>
                                </Typography>
                            </div>
                        </Toolbar>
                        <LandingPage />
                    </AppBar>
                </div>
            </Router>
        </React.Fragment>
    );
}

export default App;
