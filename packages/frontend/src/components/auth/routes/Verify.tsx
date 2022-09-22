import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../cognito/context';
import { useValidateUsername, useValidateVerificationCode } from '../../../cognito/validationHooks';
import AuthComponent from '../AuthComponent';

const Verify = () => {
    const { username, setUsername, usernameIsValid } = useValidateUsername('');
    const { code, setCode, codeIsValid } = useValidateVerificationCode('');
    const [error, setError] = React.useState('');

    const isValid = !usernameIsValid || username.length === 0 || !codeIsValid || code.length === 0;

    const navigate = useNavigate();

    const authContext = React.useContext(AuthContext);

    const onSendClick = async () => {
        try {
            await authContext.verifyCode(username, code);
            navigate('/signin');
        } catch (err) {
            setError('Invalid Code');
        }
    };

    const onResendCodeClick = async () => {
        navigate('/resendCode');
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Paper className="w-8/12 p-20 m-10">
                <Box m={2}>
                    <Typography variant="h3">Verify Code</Typography>
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
                {/* Password */}
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Code'}
                        invalidLabel={'Invalid Code'}
                        isValid={codeIsValid}
                        setProp={setCode}
                    />
                </Box>


                {/* Buttons */}
                <Box className="flex justify-start items-center" mt={2}>
                    <Box m={1}>
                        <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button disabled={isValid} color="primary" variant="contained" onClick={onSendClick}>
                            Submit
                        </Button>
                    </Box>
                    <Box onClick={onResendCodeClick} mt={2}>
                        <Button color="secondary" variant="contained" onClick={onResendCodeClick}>
                            Resend Code
                        </Button>
                        <Box mt={2}>
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
};

export default Verify;
