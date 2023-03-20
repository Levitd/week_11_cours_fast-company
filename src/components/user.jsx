import React, { useState } from "react";
import { headColum as headColumArray } from "../api/columsTable";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import Pagination from "./pagination";
import { paginate } from "../api/utils/paginate";
import PropTypes from "prop-types";

const Users = (props) => {
    const headTable = () =>
        headColumArray.map((el, idx) => (
            <th scope="col" key={idx}>
                {el}
            </th>
        ));

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
    const count = props.usersArray.length;
    const users = props.usersArray;

    const pageSize = 4;
    const [curentPage, setCurentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurentPage(pageIndex);
    };

    const userGroup = paginate(users, curentPage, pageSize);
    return (
        <>
            {count > 0 && (
                <>
                    <table className="table">
                        <thead>
                            <tr>{headTable()}</tr>
                        </thead>
                        <tbody>{rowsTable(userGroup)}</tbody>
                    </table>
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        curentPage={curentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </>
    );
};
Users.propTypes = {
    OnBookMark: PropTypes.func.isRequired,
    OnDeleteUser: PropTypes.func.isRequired,
    usersArray: PropTypes.array.isRequired
};

export default Users;
