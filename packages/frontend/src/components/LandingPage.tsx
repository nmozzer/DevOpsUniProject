import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <div className="h-full">
            <div className="w-full ">HeroBanner</div>
            <div>
                <Link to="/ideas">Enter</Link>
            </div>
        </div>
    );
};

export default LandingPage;
