import React from "react";
import BookMark from "./bookmark";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UserTable = (props) => {
    const { filteredUsers, OnDeleteUser, OnBookMark, OnSort, selectedSort } = props;

    const columns = {
        name: { path: "name", name: "Имя", link: "user", paramLink: "_id" },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities} />) },
        professions: { name: "Профессия", path: "profession.name" },
        completedMeetings: { name: "Встретился, раз", path: "completedMeetings" },
        rate: { name: "Оценка", path: "rate" },
        bookmark: {
            name: "Избранное", path: "bookmark", component: (user) => (<BookMark status={user.bookmark} onClick={() => OnBookMark(user._id)} />)
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => OnDeleteUser(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table OnSort={OnSort} selectedSort={selectedSort} columns={columns} data={filteredUsers} >
            <TableHeader {...{ OnSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: filteredUsers }} />
        </Table>
    );
};

UserTable.propTypes = {
    filteredUsers: PropTypes.array.isRequired,
    OnDeleteUser: PropTypes.func.isRequired,
    OnBookMark: PropTypes.func.isRequired,
    OnSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
