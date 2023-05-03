import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import QualitiesList from "../../ui/qualities/qualitiesList";

const UserPage = () => {
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

    const handleEditUser = () => {
        history.push(`/user/${id}/edit`);
    };

    if (typeof user !== "number" && user !== undefined) {
        return (<>
            <div className="conteiner ms-5">
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h4><QualitiesList qualities={user.qualities} /></h4>
                <h4>Встретился, раз: {user.completedMeetings}</h4>
                <h3>Оценка: {user.rate}</h3>
                <button onClick={() => { handleAllUsers(); }} className="btn btn-secondary mt-2 me-2">Все пользователи</button>
                <button onClick={() => { handleEditUser(); }} className="btn btn-primary mt-2">Изменить</button>
            </div>
        </>);
    } else {
        return <div className="badge bg-info">Загрузка....</div>;
    }
};

export default UserPage;
