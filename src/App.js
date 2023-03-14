import React, { useState } from "react";
import Users from "./components/user";
import { SearchStatus } from "./components/searchStatus";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleBookMarkUser = (idUser) => {
        const findIdx = users.findIndex((el) => el._id === idUser);
        const bookMark = users[findIdx]['bookmark'];
        users[findIdx]['bookmark'] = (bookMark === true) ? false : true;
        const newUsers = users.concat(); //по прежнему не понимаю, как обновить, не создавая новый массив :(
        setUsers(newUsers);
    }
    const handleDeleteUser = (idUser) => {
        setUsers((prevState) => prevState.filter((el) => el._id !== idUser));
    }


    const renderUsers = <Users
        usersArray={users}
        setFunction={setUsers}
        OnBookMark={handleBookMarkUser}
        OnDeleteUser={handleDeleteUser}
    />;
    const renderPhrase = <SearchStatus
        number={users.length} />;

    return <>{renderPhrase} {renderUsers}</>;

}

export default App;