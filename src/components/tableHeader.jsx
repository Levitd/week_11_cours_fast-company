import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ OnSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            OnSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            OnSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th scope="col" key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name} <i className={(columns[column].path === selectedSort.path) ? ((selectedSort.order === "asc") ? "bi bi-sort-down-alt" : "bi bi-sort-down") : ""}></i>
                    </th>
                ))}
            </tr>
        </thead >
    );
};
TableHeader.propTypes = {
    OnSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
