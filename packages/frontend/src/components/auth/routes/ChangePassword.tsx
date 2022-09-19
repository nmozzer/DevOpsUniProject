import { Paper, Box, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthState } from '../../../cognito/context';
import { useValidatePassword } from '../../../cognito/validationHooks';
import AuthComponent from '../AuthComponent';

const ChangePassword = () => {
    const [error, setError] = React.useState('');

    const {
        password: oldPassword,
        setPassword: setOldPassword,
        passwordIsValid: oldPasswordIsValid,
    } = useValidatePassword('');

    const {
        password: newPassword,
        setPassword: setNewPassword,
        passwordIsValid: newPasswordIsValid,
    } = useValidatePassword('');

    const isValid = !oldPasswordIsValid || oldPassword.length === 0 || !newPasswordIsValid || newPassword.length === 0;

    const navigate = useNavigate();
    const authContext = React.useContext(AuthContext);

    const onChangePasswordClick = async () => {
        try {
            await authContext.changePassword(oldPassword, newPassword);
            alert('Password successfully reset');
            navigate('/signIn');
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (authContext.authState !== AuthState.SignedIn) {
            alert('Must be signed in to change password');
            navigate(-1);
        }
    });

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Paper className="w-8/12 p-20 m-10">
                <Box m={2}>
                    <Typography variant="h3">Reset Password</Typography>
                </Box>

                {/* Old Password */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Old Password'}
                        invalidLabel={'Invalid Password'}
                        isValid={oldPasswordIsValid}
                        setProp={setOldPassword}
                        passwordType="password"
                    />
                </Box>

                {/* New Password */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'New Password'}
                        invalidLabel={'Invalid password'}
                        isValid={newPasswordIsValid}
                        setProp={setNewPassword}
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
                            <Button
                                color="primary"
                                disabled={isValid}
                                variant="contained"
                                onClick={onChangePasswordClick}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Paper>
        </div>
    );
};

export default ChangePassword;
