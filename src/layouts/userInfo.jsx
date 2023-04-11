import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams, useHistory } from "react-router-dom";
import QualitiesList from "../components/qualitiesList";

const UserInfo = () => {
    const params = useParams();
    const { id } = params;

    const history = useHistory();

    const [user, setUser] = useState(0);
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleAllUsers = () => {
        history.push("/users");
    };

    if (typeof user !== "number" && user !== undefined) {
        return (<>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <h4><QualitiesList qualities={user.qualities} /></h4>
            <h4>Встретился, раз: {user.completedMeetings}</h4>
            <h3>Оценка: {user.rate}</h3>
            <button onClick={() => { handleAllUsers(); }} className="btn btn-secondary mt-2">Все пользователи</button>
        </>);
    } else {
        return <div className="badge bg-info">Загрузка....</div>;
    }
};

export default UserInfo;
