import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../cognito/context';
import { useValidateUsername } from '../../../cognito/validationHooks';
import AuthComponent from '../AuthComponent';

const Resend = () => {
    const { username, setUsername, usernameIsValid } = useValidateUsername('');
    const [error, setError] = React.useState('');
    const [resetSent, setResetSent] = React.useState(false);

    const isValid = !usernameIsValid || username.length === 0;

    const navigate = useNavigate();

    const authContext = React.useContext(AuthContext);

    const onSendCodeClick = async () => {
        try {
            await authContext.sendCode(username);
        } catch (error) {
            setError('Unknown user');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <Paper className="w-8/12 p-20 m-10">
                <Box m={2}>
                    <Typography variant="h3">Resend Code</Typography>
                </Box>
                <Box className="w-11/12" m={1}>
                    <AuthComponent
                        validLabel={'Username'}
                        invalidLabel={'Invalid Username'}
                        isValid={usernameIsValid}
                        setProp={setUsername}
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
                            <Button disabled={isValid} color="primary" variant="contained" onClick={onSendCodeClick}>
                                Send
                            </Button>
                        </Box>
                    </Box>
                    <Box mt={2}>
                        <Box onClick={() => navigate('/resetPassword')}>
                            <Button disabled={resetSent} color="primary" variant="contained">
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Paper>
        </div>
    );
};

export default Resend;
