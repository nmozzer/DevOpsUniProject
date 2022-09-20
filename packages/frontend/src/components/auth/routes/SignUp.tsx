import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../cognito/context';
import { useValidateEmail, useValidatePassword, useValidateUsername } from '../../../cognito/validationHooks';
import AuthComponent from '../AuthComponent';

const SignUp = () => {
    const { username, setUsername, usernameIsValid } = useValidateUsername('');
    const { password, setPassword, passwordIsValid } = useValidatePassword('');
    const {
        password: passwordConfirm,
        setPassword: setPasswordConfirm,
        passwordIsValid: passwordConfirmIsValid,
    } = useValidatePassword('');
    const { email, setEmail, emailIsValid } = useValidateEmail('');
    const [error, setError] = React.useState('');

    const isValid =
        !emailIsValid ||
        email.length === 0 ||
        !usernameIsValid ||
        username.length === 0 ||
        !passwordIsValid ||
        password.length === 0 ||
        !passwordConfirmIsValid ||
        passwordConfirm.length === 0;

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const signUpOnClick = async () => {
        try {
            const result = await authContext.signUpWithEmail(username, email, password);
            alert('Sign up successful');
            navigate('/ideas');
        } catch (err: any) {
            alert(err.message);
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Paper className="w-8/12 p-20 m-10">
                <Box m={2}>
                    <Typography variant="h3">Sign Up</Typography>
                </Box>
                {/* Username */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Username'}
                        invalidLabel={'Invalid Username'}
                        isValid={usernameIsValid}
                        setProp={setUsername}
                    />
                </Box>
                {/* Email */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Email'}
                        invalidLabel={'Invalid Email'}
                        isValid={emailIsValid}
                        setProp={setEmail}
                    />
                </Box>
                {/* Password */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Password'}
                        invalidLabel={'Invalid Password'}
                        isValid={passwordIsValid}
                        setProp={setPassword}
                        passwordType="password"
                    />
                </Box>
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Confirm Password'}
                        invalidLabel={'Invalid Password'}
                        isValid={passwordConfirmIsValid}
                        setProp={setPasswordConfirm}
                        passwordType="password"
                    />
                </Box>

                {/* Error */}
                <Box mt={2}>
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                </Box>

                {/* Buttons */}
                <div className="flex justify-start items-center">
                    <Box mt={2} className="flex">
                        <Box m={1}>
                            <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                        </Box>
                        <Box m={1}>
                            <Button disabled={isValid} color="primary" variant="contained" onClick={signUpOnClick}>
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Paper>
        </div>
    );
};

export default SignUp;
