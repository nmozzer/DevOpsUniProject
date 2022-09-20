import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
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
                            <Link to="/signout">Signout</Link>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
