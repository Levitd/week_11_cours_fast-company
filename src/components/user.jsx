import React, { useState, useEffect } from "react";
import { headColum as headColumArray } from "../api/columsTable";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import Pagination from "./pagination";
import { paginate } from "../api/utils/paginate";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import { SearchStatus } from "./searchStatus";

const Users = (props) => {
    const headTable = () =>
        headColumArray.map((el, idx) => (
            <th scope="col" key={idx}>
                {el}
            </th>
        ));
    const [professions, setProfession] = useState(); // api.professions.fetchAll()
    const [selectedProf, setSelectedProf] = useState();

    const qualities = (qlt) => qlt.map((elq) => Qualitie(elq));

    const rowTable = (elRow) => {
        return (
            <>
                <td key={"name_" + elRow._id}>{elRow.name}</td>
                <td key={"qualities_" + elRow._id}>
                    {qualities(elRow.qualities)}
                </td>
                <td key={"profession_" + elRow._id}>{elRow.profession.name}</td>
                <td key={"completedMeetings_" + elRow._id}>
                    {elRow.completedMeetings}
                </td>
                <td key={"rate_" + elRow._id}>{elRow.rate}</td>
                <td key={"bookmark_" + elRow._id}>
                    <button
                        className="btn btn-sm"
                        onClick={(e) => props.OnBookMark(elRow._id)}
                    >
                        {BookMark(elRow.bookmark)}
                    </button>
                </td>
                <td key={"button_" + elRow._id}>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => props.OnDeleteUser(elRow._id)}
                    >
                        delete
                    </button>
                </td>
            </>
        );
    };

    const rowsTable = (usersGroup) => {
        return (
            <>
                {usersGroup.map((el, idx) => {
                    return <tr key={idx}>{rowTable(el)}</tr>;
                })}
            </>
        );
    };
    const users = props.usersArray;

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const pageSize = 2;
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

    const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
    const count = filteredUsers?.length ?? 0;

    const userGroup = paginate(filteredUsers, curentPage, pageSize);

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
            {count > 0 && (
                <>

                    <div className="d-flex flex-column">
                        <SearchStatus number={count} />
                        <table className="table">
                            <thead>
                                <tr>{headTable()}</tr>
                            </thead>
                            <tbody>{rowsTable(userGroup)}</tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                curentPage={curentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
Users.propTypes = {
    OnBookMark: PropTypes.func.isRequired,
    OnDeleteUser: PropTypes.func.isRequired,
    usersArray: PropTypes.array
};

export default Users;
