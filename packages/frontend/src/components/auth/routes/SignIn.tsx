import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../cognito/context';
import { useValidatePassword, useValidateUsername } from '../../../cognito/validationHooks';
import AuthComponent from '../AuthComponent';

export const SignIn = () => {
    const { username, setUsername, usernameIsValid } = useValidateUsername('');
    const { password, setPassword, passwordIsValid } = useValidatePassword('');
    const [error, setError] = React.useState('');

    const isValid = !usernameIsValid || username.length === 0 || !passwordIsValid || password.length === 0;

    const navigate = useNavigate();
    const authContext = React.useContext(AuthContext);

    const signInOnClick = async () => {
        try {
            await authContext.signInWithEmail(username, password);
            navigate('/ideas');
        } catch (err: any) {
            if (err.code === 'UserNotConfirmedException') {
                navigate('verify');
            } else {
                setError(err.message);
            }
        }
    };

    const resetPasswordOnClick = async () => {
        navigate('/resetPassword');
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Paper className="w-full p-20">
                <Box m={2}>
                    <Typography variant="h3">Sign In</Typography>
                </Box>
                {/* Username */}
                <Box className="w-9/12" m={1}>
                    <AuthComponent
                        validLabel={'Username'}
                        invalidLabel={'Invalid Username'}
                        isValid={usernameIsValid}
                        setProp={setUsername}
                    />
                </Box>
                {/* Password */}
                <Box className="w-9/12" m={1}>
                    <AuthComponent
                        validLabel={'Password'}
                        invalidLabel={'Invalid Password'}
                        isValid={passwordIsValid}
                        setProp={setPassword}
                        passwordType="password"
                    />
                </Box>
                {/* Forgot Password */}
                <Box onClick={resetPasswordOnClick} mt={2}>
                    <Typography variant="body2">Forgot Password?</Typography>
                </Box>

                {/* Error */}
                <Box mt={2}>
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                </Box>

                {/* Buttons */}
                <Box mt={2}>
                    <Box m={1}>
                        <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button disabled={isValid} color="primary" variant="contained" onClick={signInOnClick}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Box mt={2}>
                    <Box onClick={() => navigate('/signup')}>
                        <Typography variant="body1">Register a new account</Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
};
