import React, { useState, useEffect } from "react";
import Users from "./components/user";
import api from "./api";

function App() {
    const [usersAll, setUsers] = useState(); // api.users.fetchAll()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleBookMarkUser = (idUser) => {
        const newUsers = usersAll.map((user) => {
            if (user._id === idUser) {
                return { ...user, bookmark: !user.bookmark };
            } else {
                return user;
            }
        });
        setUsers(newUsers);
    };
    const handleDeleteUser = (idUser) => {
        setUsers((prevState) => prevState.filter((el) => el._id !== idUser));
    };

    const renderUsers = (
        <Users
            usersArray={usersAll}
            setFunction={setUsers}
            OnBookMark={handleBookMarkUser}
            OnDeleteUser={handleDeleteUser}
        />
    );

    return (
        <>
            {renderUsers}
        </>
    );
}

export default App;
