import { Route } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import ForgotPassword from './ForgotPassword';
import Resend from './Resend';
import SignIn from './SignIn';
import Verify from './Verify';

const AuthRoutes = () => {
    return (
        <>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/resendCode" element={<Resend />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/changePassword" element={<ChangePassword />} />
        </>
    );
};

export default AuthRoutes;
