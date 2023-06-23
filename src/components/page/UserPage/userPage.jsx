import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../../userCard";
import QualitiesCard from "../../qualitiesCard";
import MeetingsCard from "../../meetingsCard";
import Comments from "../../comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";
import ProfessionCard from "../../professionCard";

const UserPage = () => {
    const params = useParams();
    const { id } = params;

    const { getUserById } = useUser();
    const user = getUserById(id);
    if (typeof user !== "number" && user !== undefined) {
        return (<>
            <div className="conteiner ms-5">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completeMeetings} />
                        <ProfessionCard value={user.profession} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        </>);
    } else {
        return <div className="badge bg-info">Загрузка....</div>;
    }
};

export default UserPage;
