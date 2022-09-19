import { Paper, Box, Typography, Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../cognito/context';
import {
    useValidateVerificationCode,
    useValidatePassword,
    useValidateUsername,
} from '../../../cognito/validationHooks';
import AuthComponent from '../AuthComponent';

const ForgotPassword = () => {
    const { code, setCode, codeIsValid } = useValidateVerificationCode('');
    const { password, setPassword, passwordIsValid } = useValidatePassword('');
    const { username, setUsername, usernameIsValid } = useValidateUsername('');
    const [error, setError] = React.useState('');

    const {
        password: passwordConfirm,
        setPassword: setConfirmPassword,
        passwordIsValid: passwordConfirmIsValid,
    } = useValidatePassword('');

    const isValid =
        !codeIsValid ||
        code.length === 0 ||
        !usernameIsValid ||
        username.length === 0 ||
        !passwordIsValid ||
        password.length === 0 ||
        !passwordConfirmIsValid ||
        passwordConfirm.length === 0;

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    const onResetPassword = async () => {
        try {
            await authContext.forgotPassword(username, code, password);
            alert('Reset Successfully');
            navigate('/signIn');
        } catch (err) {
            setError('Unable to reset');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Paper className="w-8/12 p-20 m-10">
                <Box m={2}>
                    <Typography variant="h3">Reset Password</Typography>
                </Box>
                {/* Code */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Code'}
                        invalidLabel={'Invalid Code'}
                        isValid={codeIsValid}
                        setProp={setCode}
                    />
                </Box>

                {/* Username */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Username'}
                        invalidLabel={'Invalid username'}
                        isValid={usernameIsValid}
                        setProp={setUsername}
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

                {/* Confirm Password */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Confirm Password'}
                        invalidLabel={'Invalid password'}
                        isValid={passwordConfirmIsValid}
                        setProp={setConfirmPassword}
                        passwordType="password"
                    />
                </Box>

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
                            <Button color="primary" disabled={isValid} variant="contained" onClick={onResetPassword}>
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Paper>
        </div>
    );
};

export default ForgotPassword;
