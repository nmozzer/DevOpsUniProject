import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthState } from '../cognito/context';
import IdeaTable from './IdeaTable';

export const MainPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(authContext);

    console.log(authContext.authState);

    const signedIn = authContext.authState === AuthState.SignedIn ? true : false;
    useEffect(() => {
        if (!signedIn) {
            console.log(authContext.authState);
            navigate('/signIn');
        }
    });

    if (signedIn) {
        return (
            <div className="p-5">
                <IdeaTable />
            </div>
        );
    }

    return <></>;
};

export default MainPage;
