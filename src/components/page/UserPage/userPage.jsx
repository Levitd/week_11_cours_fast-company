import React from "react";
// import { useParams } from "react-router-dom";
import UserCard from "../../userCard";
import QualitiesCard from "../../qualitiesCard";
import MeetingsCard from "../../meetingsCard";
import Comments from "../../comments";
import ProfessionCard from "../../professionCard";
import { useSelector } from "react-redux";
// import { getCurrentUserData } from "../../../store/users";
import UsersLoader from "../../ui/hoc/usersLoader";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../store/users";

const UserPage = () => {
    const params = useParams();
    const { id } = params;

    const user = useSelector(getUserById(id));
    // const user = useSelector(getCurrentUserData());

    if (typeof user !== "number" && user !== undefined) {
        return (<>
            <UsersLoader>
                <div className="conteiner ms-5">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingsCard value={user.completeMeetings} />
                            <ProfessionCard value={user.profession} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            </UsersLoader>
        </>);
    } else {
        return <div className="badge bg-info">Загрузка....</div>;
    }
};

export default UserPage;
