import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ISignUpResult,
} from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from './cognitoConfig';

export interface SignUpProps {
    username: string;
    email: string;
    password: string;
}

const userPool: CognitoUserPool = new CognitoUserPool(COGNITO_CONFIG);

export const getCurrentUser = (): CognitoUser | null => {
    return userPool.getCurrentUser();
};

export const getUserByUsername = (username: string): CognitoUser => {
    return new CognitoUser({
        Username: username,
        Pool: userPool,
    });
};

export const getSession = async (): Promise<void> => {
    const user = getCurrentUser();

    return await user?.getSession((error: any, session: CognitoUserSession) => {
        if (error) {
            throw new Error(error.message);
        }
        return session;
    });
};

export const signUpWithEmail = async ({ username, password, email }: SignUpProps): Promise<void> => {
    const attributes = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        }),
    ];

    await userPool.signUp(username, password, attributes, [], (error: any, result?: ISignUpResult) => {
        if (error) {
            throw new Error(error.message);
        }
        return result;
    });
};

export const signIn = async (username: string, password: string): Promise<void> => {
    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    const user = await getUserByUsername(username);

    await user.authenticateUser(authDetails, {
        onSuccess: (result: any) => {
            return result;
        },
        onFailure: (error: Error) => {
            throw new Error(error.message);
        },
    });
};

export const signOut = async (): Promise<void> => {
    const user = await getCurrentUser();

    if (user) {
        user.signOut();
    }
};;

export const verifyVerificationCode = async (username: string, code: string): Promise<void> => {
    const user = await getUserByUsername(username);

    await user.confirmRegistration(code, true, (error: Error, result: any) => {
        if (error) {
            throw new Error(error.message);
        }
        return result;
    });
};

export const getAttributes = async (): Promise<void> => {
    const user = await getCurrentUser();

    return await user?.getUserAttributes((error?: Error, attributes?: CognitoUserAttribute[]) => {
        if (error) {
            throw new Error(error.message);
        }

        return attributes;
    });
};

export const setAttribute = async (attribute: CognitoUserAttribute): Promise<void> => {
    const newAttribute = [new CognitoUserAttribute(attribute)];
    const user = await getCurrentUser();

    return await user?.updateAttributes(newAttribute, (error?: Error, result?: string) => {
        if (error) {
            throw new Error(error.message);
        }

        return result!;
    });
};

export const sendCode = async (username: string) => {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error('No user found');
    }

    await user.forgotPassword({
        onSuccess: (data: any) => {
            return data;
        },
        onFailure: (error: Error) => {
            throw new Error('Failed to call API forgotPassword');
        },
    });
};

export const forgotPassword = async (username: string, code: string, password: string): Promise<void> => {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error('No user found');
    }

    await user.confirmPassword(code, password, {
        onSuccess: (data: any) => {
            console.log('Password updated successfully');
            return data;
        },
        onFailure: (error: Error) => {
            throw new Error('Failed to confirm lost password');
        },
    });
};

export const changePassword = async (newPassword: string, oldPassword: string) => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('No current user');
    }

    await user.changePassword(oldPassword, newPassword, (error?: Error, result?: 'SUCCESS') => {
        if (error) {
            throw new Error(error.message);
        }

        return result;
    });
};
