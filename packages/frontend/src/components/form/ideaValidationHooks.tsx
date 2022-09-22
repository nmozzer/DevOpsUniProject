import React from 'react';

const DIFFICULTIES = ['Hard', 'Medium', 'Easy'] as const;
type Difficulty = typeof DIFFICULTIES[number];

export interface FFIdea {
    PK: string;
    system: string;
    beans: number;
    difficulty: Difficulty;
    creator: string;
    assigned: boolean;
}

export const useValidateName = (initialValue: string) => {
    const [name, setName] = React.useState(initialValue);
    const [nameIsValid, setNameIsValid] = React.useState(true);

    React.useEffect(() => {
        if (name.length === 0) {
            setNameIsValid(true);
            return;
        }

        const isValid = name.length >= 4 ? true : false;

        setNameIsValid(isValid);
    }, [name]);

    return { name, setName, nameIsValid };
};

export const useValidateSystem = (initialValue: string) => {
    const [system, setSystem] = React.useState(initialValue);
    const [systemIsValid, setSystemIsValid] = React.useState(true);

    React.useEffect(() => {
        if (system.length === 0) {
            setSystemIsValid(true);
            return;
        }

        const isValid = system.length >= 4 ? true : false;

        setSystemIsValid(isValid);
    }, [system]);

    return { system, setSystem, systemIsValid };
};

export const useValidateBeans = (initialValue: string) => {
    const [beans, setBeans] = React.useState<number>(Number(initialValue));
    const [beansIsValid, setBeansIsValid] = React.useState(true);

    React.useEffect(() => {
        const isValid = beans < 0 ? true : false;

        setBeansIsValid(isValid);
    }, [beans]);

    return { beans, setBeans, beansIsValid };
};

export const useValidateDifficulty = (initialValue: string) => {
    const [difficulty, setDifficulty] = React.useState(initialValue);
    const [difficultyIsValid, setDifficultyIsValid] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (DIFFICULTIES.find((validDifficulty) => validDifficulty === initialValue)) {
            setDifficultyIsValid(true);
            return;
        }

        setDifficultyIsValid(false);
    }, [difficulty]);

    return { difficulty, setDifficulty, difficultyIsValid };
};

export const useValidateCreator = (initialValue: string) => {
    const [difficulty, setCreator] = React.useState(initialValue);
    const [difficultyIsValid, setCreatorIsValid] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (difficulty.length === 0) {
            setCreatorIsValid(true);
            return;
        }

        const isValid = difficulty.length >= 4 ? true : false;

        setCreatorIsValid(isValid);
    }, [difficulty]);

    return { difficulty, setCreator, difficultyIsValid };
};

export const useValidateAssigned = (initialValue: boolean) => {
    const [assigned, setAssigned] = React.useState(initialValue);
    const [assignedIsValid, setAssignedIsValid] = React.useState<boolean>(true);

    React.useEffect(() => {
        const isValid = typeof assigned === 'boolean' ? true : false;

        setAssignedIsValid(isValid);
    }, [assigned]);

    return { assigned, setAssigned, assignedIsValid };
};
