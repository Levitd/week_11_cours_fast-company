import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
// import api from "../../../api";
import GroupList from "../../common/groupList";
import { SearchStatus } from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";
import SearchUser from "../../searchUser";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";

const UsersListPage = () => {
    const { users } = useUser();
    const { professions } = useProfessions();

    const handleBookMarkUser = (idUser) => {
        const newUsers = users.map((user) => {
            if (user._id === idUser) {
                return { ...user, bookmark: !user.bookmark };
            } else {
                return user;
            }
        });
        // setUsers(newUsers);
        console.log(newUsers);
    };
    const handleDeleteUser = (idUser) => {
        // setUsers((prevState) => prevState.filter((el) => el._id !== idUser));
        console.log(idUser);
    };

    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [dataSearch, setDataSerch] = useState({ searchUser: "" });

    const handleProfessionSelect = item => {
        setSelectedProf(item);
        if (dataSearch.searchUser.length > 0) {
            setDataSerch({ searchUser: "" });
        }
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
        setCurentPage(1);
    }, [selectedProf]);

    const handleChangeSearch = (target) => {
        setDataSerch((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const findUser = () => {
        if (dataSearch.searchUser.length > 0 && selectedProf) {
            clearFilter();
        }
    };
    useEffect(() => { findUser(); }, [dataSearch]);

    const clearFilter = () => {
        setSelectedProf();
    };

    if (professions.length > 0) {
        let filteredUsers;
        if (selectedProf) {
            filteredUsers = users.filter((user) => user.profession._id === selectedProf._id);
        } else if (dataSearch.searchUser.length > 0) {
            filteredUsers = users.filter((user) => user.name.toLowerCase().indexOf(dataSearch.searchUser.toLowerCase()) > -1);
        } else {
            filteredUsers = users;
        };
        const count = filteredUsers?.length ?? 0;

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

        if (curentPage > Math.ceil(filteredUsers.length / pageSize)) {
            handlePageChange(Math.ceil(filteredUsers.length / pageSize));
        }

        const userGroup = paginate(sortedUsers, curentPage, pageSize);

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
                    <SearchUser dataSearch={dataSearch} handleChangeSearch={handleChangeSearch} />
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
UsersListPage.propTypes = {
    OnBookMark: PropTypes.func,
    OnDeleteUser: PropTypes.func,
    usersArray: PropTypes.array
};

export default UsersListPage;
