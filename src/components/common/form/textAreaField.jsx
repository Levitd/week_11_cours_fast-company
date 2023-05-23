import React from "react";
import PropTypes from "prop-types";

const TextAreaField = (
    { label, name, value, onChange, error, noLable }
) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (<div className="mb-4 ">
        {!noLable ? <label htmlFor={name}>{label}</label> : ""}

        <div className="input-group has-validation">
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={getInputClasses()}
                rows="3"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    </div >);
};

TextAreaField.defaultProps = {
    noLable: false,
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    noLable: PropTypes.bool
};

export default TextAreaField;
