import { UserIsSignedIn, UserIsSignedOut } from '../cognito/context';
import IdeaTable from './IdeaTable';

export const MainPage = () => {
    return (
        <>
            <UserIsSignedIn>
                <div className="p-5">
                    <IdeaTable />
                </div>
            </UserIsSignedIn>
            <UserIsSignedOut>
                <div className="flex justify-top items-center h-screen flex-col p-10">
                    You Must Be Signed In To View FF Ideas
                </div>
            </UserIsSignedOut>
        </>
    );
};

export default MainPage;
