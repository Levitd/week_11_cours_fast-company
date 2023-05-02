import React from "react";
import TextField from "./textField";
import PropTypes from "prop-types";

const SearchUser = ({ dataSearch, handleChangeSearch }) => {
    return (<div className="md-3">
        <form>
            <TextField
                label="searchUser"
                name="searchUser"
                value={dataSearch.searchUser}
                onChange={handleChangeSearch}
                error=""
                noLable={true}
                noValid={true}
                placeholder="Поиск"
            />
        </form>
    </div>);
};

SearchUser.propTypes = {
    dataSearch: PropTypes.object,
    handleChangeSearch: PropTypes.func
};
export default SearchUser;
