import React from "react";
import PropTypes from "prop-types";

//             name: name,

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({
            name,
            value: !value
        });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : " is-valid");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            ></input>
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {
                error && <div className="invalid-feedback">
                    {error}
                </div>
            }
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};

export default CheckBoxField;
