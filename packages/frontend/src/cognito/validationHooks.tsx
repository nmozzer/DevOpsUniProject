import { useState, useEffect } from 'react';

export const useValidateEmail = (initialValue: string) => {
    const [email, setEmail] = useState(initialValue);
    const [emailIsValid, setEmailIsValid] = useState(true);

    useEffect(() => {
        if (email.length === 0) {
            setEmailIsValid(true);
            return;
        }

        const isValid = email ? true : false;

        setEmailIsValid(isValid);
    }, [email]);

    return { email, setEmail, emailIsValid };
};

export const useValidatePassword = (initialValue: string) => {
    const [password, setPassword] = useState(initialValue);
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    useEffect(() => {
        if (password.length === 0) {
            setPasswordIsValid(true);
            return;
        }

        const isValid = password.length >= 8 ? true : false;

        setPasswordIsValid(isValid);
    }, [password]);

    return { password, setPassword, passwordIsValid };
};

export const useValidateUsername = (initialValue: string) => {
    const [username, setUsername] = useState(initialValue);
    const [usernameIsValid, setUsernameIsValid] = useState(true);

    useEffect(() => {
        if (username.length === 0) {
            setUsernameIsValid(true);
            return;
        }

        const isValid = username.length >= 8 ? true : false;

        setUsernameIsValid(isValid);
    }, [username]);

    return { username, setUsername, usernameIsValid };
};

export const useValidateVerificationCode = (initialValue: string) => {
    const [code, setCode] = useState(initialValue);
    const [codeIsValid, setCodeIsValid] = useState(true);

    useEffect(() => {
        if (code.length === 0) {
            setCodeIsValid(true);
            return;
        }

        const isValid = code.length >= 6 ? true : false;

        setCodeIsValid(isValid);
    }, [code]);

    return { code, setCode, codeIsValid };
};
