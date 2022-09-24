import React from 'react';

import TextField from '@mui/material/TextField';

interface IdeaFormProps {
    validLabel: string;
    invalidLabel: string;
    isValid: boolean;
    setProp: (_: string) => void;
    defaultValue?: string;
}

export const IdeaFormComponent = ({ validLabel, invalidLabel, isValid, setProp, defaultValue }: IdeaFormProps) => {
    return (
        <TextField
            key={'input form'}
            fullWidth
            variant="outlined"
            label={isValid ? validLabel : invalidLabel}
            error={!isValid}
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                setProp(evt.target.value);
            }}
            defaultValue={defaultValue}
        />
    );
};

export default IdeaFormComponent;
