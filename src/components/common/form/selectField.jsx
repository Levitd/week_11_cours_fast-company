import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name, noValidDefaul }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : (noValidDefaul ? "" : " is-valid"));
    };

    // const optionsArray = !Array.isArray(options) && typeof options === "object"
    //     ? Object.keys(options).map(optionName => (
    //         { name: options[optionName].name, value: options[optionName]._id }
    //     ))
    //     : options.map(optionName => (
    //         { name: optionName.name, value: optionName._id }
    //     ));
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    // console.log(optionsArray, typeof options, !Array.isArray(options));
    return (
        <div className="mb-4 ">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                value={value}
                name={name}
                onChange={handleChange}
            >
                <option disabled value="">{defaultOption}</option>
                {optionsArray && optionsArray.map((option) =>
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.label}
                    </option>)}
            </select>
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    noValidDefaul: PropTypes.bool
};

export default SelectField;
