import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    // console.log(typeof items, items, selectedItem, typeof selectedItem);
    // if (typeof items === "object") {
    //     Object.keys(items).forEach(item => {
    //         console.log(item);
    //     });
    // }
    return (<ul className="list-group">
        {Object.keys(items).map(item =>
            <li
                key={items[item][valueProperty]}
                className={"list-group-item" + (items[item][valueProperty] === ((selectedItem) ? selectedItem[valueProperty] : selectedItem) ? " active" : "")}
                onClick={() => onItemSelect(items[item])}
                role="button"
            >
                {items[item][contentProperty]}
            </li>
        )}
    </ul>);
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
