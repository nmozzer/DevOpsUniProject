import React from 'react';

const DIFFICULTIES = ['Hard', 'Medium', 'Easy'] as const;
export type Difficulty = typeof DIFFICULTIES[number];

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

export const useValidateBeans = (initialValue: number) => {
    const [beans, setBeans] = React.useState<number>(initialValue);
    const [beansIsValid, setBeansIsValid] = React.useState(true);

    React.useEffect(() => {
        const isValid = beans < 0 ? true : false;

        setBeansIsValid(isValid);
    }, [beans]);

    return { beans, setBeans, beansIsValid };
};

export const useValidateDifficulty = (initialValue: Difficulty) => {
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
    const [creator, setCreator] = React.useState(initialValue);
    const [creatorIsValid, setCreatorIsValid] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (creator.length === 0) {
            setCreatorIsValid(true);
            return;
        }

        const isValid = creator.length >= 4 ? true : false;

        setCreatorIsValid(isValid);
    }, [creator]);

    return { creator, setCreator, creatorIsValid };
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
