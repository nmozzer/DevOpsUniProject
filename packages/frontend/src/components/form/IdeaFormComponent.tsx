import React from 'react';

import TextField from '@mui/material/TextField';

interface IdeaFormProps {
    validLabel: string;
    invalidLabel: string;
    isValid: boolean;
    setProp: (_: string) => void;
}

export const IdeaFormComponent = ({ validLabel, invalidLabel, isValid, setProp }: IdeaFormProps) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            label={isValid ? validLabel : invalidLabel}
            error={!isValid}
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setProp(evt.target.value);
            }}
        />
    );
};

export default IdeaFormComponent;
