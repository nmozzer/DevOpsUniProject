import React from 'react';
import * as cognito from './cognito';

export enum AuthState {
    Loading,
    SignedIn,
    SignedOut,
}

interface AuthSession {
    username?: string;
    email?: string;
    sub?: string;
    accessToken?: string;
    refreshToken?: string;
}
export interface AuthInfo {
    sessionInfo?: AuthSession;
    attrInfo?: any;
    authState: AuthState;
    signIn?: any;
    signUpWithEmail?: any;
    signOut?: any;
    verifyCode?: any;
    getSession?: any;
    sendCode?: any;
    forgotPassword?: any;
    changePassword?: any;
    getAttributes?: any;
    setAttribute?: any;
}

interface AuthProps {
    children?: React.ReactNode;
}

const startState: AuthInfo = {
    sessionInfo: {},
    authState: AuthState.Loading,
};

export const AuthContext = React.createContext(startState);

export const UserIsSignedIn = ({ children }: AuthProps) => {
    const { authState }: AuthInfo = React.useContext(AuthContext);

    return <React.Fragment>{authState === AuthState.SignedIn ? children : null}</React.Fragment>;
};

export const UserIsSignedOut = ({ children }: AuthProps) => {
    const { authState }: AuthInfo = React.useContext(AuthContext);

    return <React.Fragment>{authState === AuthState.SignedOut ? children : null}</React.Fragment>;
};

const AuthProvider = ({ children }: AuthProps) => {
    const [authState, setAuthState] = React.useState(AuthState.Loading);
    const [sessionInfo, setSessionInfo] = React.useState({});
    const [attrInfo, setAttrInfo] = React.useState([]);

    React.useEffect(() => {
        const getSessionInfo = async () => {
            try {
                const session: any = await getSession();
                setSessionInfo({
                    accessToken: session.accessToken.jwtToken,
                    refreshToken: session.refreshToken.token,
                    idToken: session.idToken.jwtToken,
                });
                window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`);
                window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`);
                window.localStorage.setItem('idToken', `${session.idToken.jwtToken}`);

                const attr: any = await getAttributes();
                setAttrInfo(attr);
                setAuthState(AuthState.SignedIn);
            } catch (error) {
                setAuthState(AuthState.SignedOut);
            }
        };
        getSessionInfo();
    }, [setAuthState, authState]);

    if (authState === AuthState.Loading) {
        return null;
    }

    const signIn = async (username: string, password: string) => {
        try {
            await cognito.signIn(username, password);
            setAuthState(AuthState.SignedIn);
        } catch (error) {
            setAuthState(AuthState.SignedOut);
            throw error;
        }
    };

    const signUpWithEmail = async (username: string, email: string, password: string) => {
        try {
            await cognito.signUpWithEmail({ username, email, password });
        } catch (error) {
            throw error;
        }
    };

    const signOut = () => {
        cognito.signOut();
        setAuthState(AuthState.SignedOut);
    };

    const verifyCode = async (username: string, code: string) => {
        try {
            await cognito.verifyVerificationCode(username, code);
        } catch (error) {
            throw error;
        }
    };

    const getSession = async () => {
        try {
            const session = await cognito.getSession();
            return session;
        } catch (error) {
            throw error;
        }
    };

    const getAttributes = async () => {
        try {
            const attr = await cognito.getAttributes();
            return attr;
        } catch (error) {
            throw error;
        }
    };

    const setAttribute = async (attr: any) => {
        try {
            const res = await cognito.setAttribute(attr);
            return res;
        } catch (error) {
            throw error;
        }
    };

    const sendCode = async (username: string) => {
        try {
            await cognito.sendCode(username);
        } catch (error) {
            throw error;
        }
    };

    const forgotPassword = async (username: string, code: string, password: string) => {
        try {
            await cognito.forgotPassword(username, code, password);
        } catch (error) {
            throw error;
        }
    };

    const changePassword = async (oldPassword: string, newPassword: string, passwordChallenge?: boolean) => {
        try {
            await cognito.changePassword(oldPassword, newPassword, passwordChallenge);
        } catch (error) {
            throw error;
        }
    };

    const state: AuthInfo = {
        authState,
        sessionInfo,
        attrInfo,
        signUpWithEmail,
        signIn,
        signOut,
        verifyCode,
        getSession,
        sendCode,
        forgotPassword,
        changePassword,
        getAttributes,
        setAttribute,
    };

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
