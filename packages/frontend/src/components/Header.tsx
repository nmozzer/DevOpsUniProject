import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../cognito/context';
import { apiCall } from '../api/client';

const Header = () => {
    const navigate = useNavigate();
    const auth = React.useContext(AuthContext);

    const signOutOnClick = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            alert('Failed to signOut try again');
            navigate('/');
        }
    };

    return (
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
                            <Link to="/signIn">Sign In | </Link>
                            <Button onClick={signOutOnClick}>Sign Out</Button>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
