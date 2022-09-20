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

export const PASSWORD_CHALLENGE = 'PASSWORD_CHALLENGE';

const userPool: CognitoUserPool = new CognitoUserPool(COGNITO_CONFIG);
const currentUser: CognitoUser | null = userPool.getCurrentUser();

export const getCurrentUser = (): CognitoUser | null => {
    return currentUser;
};

export const getUserByUsername = (username: string): CognitoUser => {
    return new CognitoUser({
        Username: username,
        Pool: userPool,
    });
};

export const getSession = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const user = getCurrentUser();

        user?.getSession((error: any, session: CognitoUserSession) => {
            if (error) {
                reject(error);
            }
            resolve(session);
        });
    }).catch((error) => {
        throw error;
    });
};

export const signUpWithEmail = async ({ username, password, email }: SignUpProps): Promise<any> => {
    return new Promise((resolve, reject) => {
        const attributes = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            }),
        ];

        userPool.signUp(username, password, attributes, [], (error: any, result?: ISignUpResult) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    }).catch((error) => {
        throw error;
    });
};

export const signIn = async (username: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });

        const user = getUserByUsername(username);

        user.authenticateUser(authDetails, {
            onSuccess: (result: any) => {
                resolve(result);
            },
            onFailure: (error: Error) => {
                reject(error);
            },
            newPasswordRequired: (result: any) => {
                resolve(result);
            },
        });
    }).catch((error) => {
        throw error;
    });
};

export const signOut = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const user = getCurrentUser();

        if (user) {
            user.signOut();
        }
    }).catch((error) => {
        throw error;
    });
};

export const verifyVerificationCode = async (username: string, code: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const user = getUserByUsername(username);

        user.confirmRegistration(code, true, (error: Error, result: any) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    }).catch((error) => {
        throw error;
    });
};

export const getAttributes = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const user = getCurrentUser();

        user?.getUserAttributes((error?: Error, attributes?: CognitoUserAttribute[]) => {
            if (error) {
                reject(error);
            }

            resolve(attributes);
        });
    }).catch((error) => {
        throw error;
    });
};

export const setAttribute = async (attribute: CognitoUserAttribute): Promise<any> => {
    return new Promise((resolve, reject) => {
        const newAttribute = [new CognitoUserAttribute(attribute)];
        const user = getCurrentUser();

        user?.updateAttributes(newAttribute, (error?: Error, result?: string) => {
            if (error) {
                reject(error);
            }

            resolve(result);
        });
    }).catch((error) => {
        throw error;
    });
};

export const sendCode = async (username: string) => {
    return new Promise((resolve, reject) => {
        const user = getUserByUsername(username);

        if (!user) {
            throw new Error('No user found');
        }

        user.forgotPassword({
            onSuccess: (data: any) => {
                resolve(data);
            },
            onFailure: (error: Error) => {
                reject(error);
            },
        });
    }).catch((error) => {
        throw error;
    });
};

export const forgotPassword = async (username: string, code: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const user = getUserByUsername(username);

        if (!user) {
            throw new Error('No user found');
        }

        user.confirmPassword(code, password, {
            onSuccess: (data: any) => {
                console.log('Password updated successfully');
                resolve(data);
            },
            onFailure: (error: Error) => {
                reject(error);
            },
        });
    }).catch((error) => {
        throw error;
    });
};

export const changePassword = async (newPassword: string, oldPassword: string, passwordChallenge?: boolean) => {
    return new Promise((resolve, reject) => {
        const user = getCurrentUser();
        const attrs = getAttributes();

        if (!user) {
            reject('No Current User');
            return;
        }

        if (passwordChallenge) {
            user.completeNewPasswordChallenge(newPassword, attrs, {
                onSuccess: (data: any) => {
                    console.log('Password updated successfully');
                    resolve(data);
                },
                onFailure: (error: Error) => {
                    reject(error);
                },
            });
            return;
        }

        user.changePassword(oldPassword, newPassword, (error?: Error, result?: 'SUCCESS') => {
            if (error) {
                reject(error);
            }

            resolve(result);
        });
    }).catch((error) => {
        throw error;
    });
};
