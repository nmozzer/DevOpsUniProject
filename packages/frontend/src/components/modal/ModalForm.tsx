import { Paper, Box, Typography, Button, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall, FFIdea } from '../../api/client';
import IdeaFormComponent from '../form/IdeaFormComponent';
import {
    useValidateName,
    useValidateSystem,
    useValidateBeans,
    useValidateCreator,
    Difficulty,
    useValidateDifficulty,
    useValidateAssigned,
} from '../form/ideaValidationHooks';
import { AddOrUpdate, ModalType } from './AddOrUpdateModal';

const ModalForm = (modalType: ModalType) => {
    const { name, setName, nameIsValid } = useValidateName('');
    const { system, setSystem, systemIsValid } = useValidateSystem('');
    const { beans, setBeans, beansIsValid } = useValidateBeans(2);
    const { difficulty, setDifficulty } = useValidateDifficulty('Easy');
    const { creator, setCreator, creatorIsValid } = useValidateCreator('');
    const { assigned, setAssigned } = useValidateAssigned(false);

    const [error, setError] = React.useState('');

    const isValid =
        !nameIsValid ||
        name.length === 0 ||
        !systemIsValid ||
        system.length === 0 ||
        !beansIsValid ||
        beans >= 2 ||
        !creatorIsValid ||
        creator.length === 0;

    const navigate = useNavigate();

    const addOrUpdateClick = async () => {
        const ffIdea: FFIdea = {
            name,
            system,
            creator,
            beans,
            difficulty,
            assigned,
        };
        try {
            modalType.type === AddOrUpdate.ADD
                ? await apiCall('/addIdea', ffIdea)
                : await apiCall('/updateIdea', ffIdea);
        } catch (err: any) {
            alert(err.message);
            setError(err.message);
        }
    };

    const AddOrUpdateButton = (type: ModalType) => {
        return type.type === AddOrUpdate.ADD ? (
            <Button onClick={addOrUpdateClick}>Add Idea</Button>
        ) : (
            <Button onClick={addOrUpdateClick}>Update Idea</Button>
        );
    };

    const AddOrUpdateFormTitle = (type: ModalType) => {
        return type.type === AddOrUpdate.ADD ? (
            <Typography variant="h4">Add Idea</Typography>
        ) : (
            <Typography variant="h4">Update Idea</Typography>
        );
    };

    return (
        <div className="flex justify-center items-center h-11/12 flex-col">
            <Paper className="w-full p-10">
                <Box m={2}>
                    <AddOrUpdateFormTitle {...modalType} />
                </Box>
                {/* Name */}
                <Box className="w-11/12" m={1}>
                    <IdeaFormComponent
                        validLabel={'Funky Friday Idea Name'}
                        invalidLabel={'Invalid Idea Name'}
                        isValid={nameIsValid}
                        setProp={setName}
                    />
                </Box>
                {/* System */}
                <Box className="w-11/12" m={1}>
                    <IdeaFormComponent
                        validLabel={'System Idea Is For'}
                        invalidLabel={'Invalid System'}
                        isValid={systemIsValid}
                        setProp={setSystem}
                    />
                </Box>
                {/* Beans */}
                <Box className="w-11/12" m={1}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label={isValid ? 'Beans' : 'Invalid Beans'}
                        error={!isValid}
                        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setBeans(Number(evt.target.value));
                        }}
                    />
                </Box>
                {/* Difficulty */}
                <Box className="w-11/12" m={1}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={difficulty}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDifficulty(event.target.value as Difficulty);
                        }}
                    >
                        <div className="flex">
                            <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="Difficult" control={<Radio />} label="Difficult" />
                        </div>
                    </RadioGroup>
                </Box>
                <Box className="w-11/12" m={1}>
                    <IdeaFormComponent
                        validLabel={'Creator of Idea'}
                        invalidLabel={'Invalid Creator'}
                        isValid={creatorIsValid}
                        setProp={setCreator}
                    />
                </Box>
                {/* Assigned */}
                <Box className="w-11/12" m={1}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={assigned}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAssigned(event.target.value as {} as boolean);
                        }}
                    >
                        <div className="flex">
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </div>
                    </RadioGroup>
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
                            <AddOrUpdateButton {...modalType} />
                        </Box>
                    </Box>
                </div>
            </Paper>
        </div>
    );
};

export default ModalForm;