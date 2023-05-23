import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom";
import UserCard from "../../userCard";
import QualitiesCard from "../../qualitiesCard";
import MeetingsCard from "../../meetingsCard";
import Comments from "../../comments";

const UserPage = () => {
    const params = useParams();
    const { id } = params;

    const [user, setUser] = useState(0);
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    if (typeof user !== "number" && user !== undefined) {
        return (<>
            <div className="conteiner ms-5">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        </>);
    } else {
        return <div className="badge bg-info">Загрузка....</div>;
    }
};

export default UserPage;
