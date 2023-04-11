import React, { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "../components/groupList";
import { SearchStatus } from "../components/searchStatus";
import UserTable from "../components/usersTable";
import { paginate } from "../api/utils/paginate";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]); // api.users.fetchAll()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleBookMarkUser = (idUser) => {
        const newUsers = users.map((user) => {
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

    const [professions, setProfession] = useState([]); // api.professions.fetchAll()
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const pageSize = 8;
    const [curentPage, setCurentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurentPage(pageIndex);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurentPage(1);
    }, [selectedProf]);

    if (professions.length > 0) {
        const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
        const count = filteredUsers?.length ?? 0;

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

        if (curentPage > Math.ceil(filteredUsers.length / pageSize)) {
            handlePageChange(Math.ceil(filteredUsers.length / pageSize));
        }

        const userGroup = paginate(sortedUsers, curentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">

                <div className="div d-flex flex-column flex-shrink-0 p-3">

                    {professions && (
                        <>
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column">
                    <SearchStatus number={count} />
                    {count > 0 && (
                        <>
                            <UserTable filteredUsers={userGroup}
                                OnDeleteUser={handleDeleteUser}
                                OnBookMark={handleBookMarkUser}
                                OnSort={handleSort}
                                selectedSort={sortBy} />

                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    curentPage={curentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}

                </div>
            </div>
        );
    };
    return <div className="badge bg-info">Загрузка....</div>;
};
Users.propTypes = {
    OnBookMark: PropTypes.func,
    OnDeleteUser: PropTypes.func,
    usersArray: PropTypes.array
};

export default Users;
