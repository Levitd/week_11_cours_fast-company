import React from "react";
import UsersListPage from "../components/page/UsersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    return (
        <UsersLoader>
            <UsersListPage />
        </UsersLoader>
    );
};

export default Users;
