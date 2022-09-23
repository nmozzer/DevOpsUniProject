import { UserIsSignedIn, UserIsSignedOut } from '../cognito/context';
import IdeaTable from './IdeaTable';
import AddOrUpdateModal, { AddOrUpdate } from './modal/AddOrUpdateModal';

export const MainPage = () => {
    return (
        <>
            <UserIsSignedIn>
                <div className="p-5">
                    <div className="flex justify-center mb-4 items-center flex-col">
                        <AddOrUpdateModal {...{ type: AddOrUpdate.ADD }} />
                    </div>
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
