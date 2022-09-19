import React from 'react';

import TextField from '@mui/material/TextField';

interface AuthComponentProps {
    validLabel: string;
    invalidLabel: string;
    isValid: boolean;
    setProp: (_: string) => void;
    passwordType?: string;
}

export const AuthComponent = ({ validLabel, invalidLabel, isValid, setProp, passwordType }: AuthComponentProps) => {
    return (
        <TextField
            fullWidth
            type={passwordType}
            variant="outlined"
            label={isValid ? validLabel : invalidLabel}
            error={!isValid}
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setProp(evt.target.value);
            }}
        />
    );
};

export default AuthComponent;