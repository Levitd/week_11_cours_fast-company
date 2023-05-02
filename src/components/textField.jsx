import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error, noValid, noLable, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    const getInputClasses = () => {
        return "form-control" + ((noValid) ? "" : (error) ? " is-invalid" : " is-valid");
    };
    const togleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (<div className="mb-4  ">
        {!noLable ? <label htmlFor={name}>{label}</label> : ""}

        <div className="input-group has-validation">
            <input
                type={showPassword ? "text" : type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={getInputClasses()}
            />
            {type === "password" &&
                (<button className="btn btn-outline-secondary" type="button" onClick={togleShowPassword}>
                    <i className={"bi bi-eye" + (showPassword ? "-slash" : "")} ></i>
                </button>)}
            {!noValid && error && <div className="invalid-feedback">{error}</div>}
        </div>
    </div >);
};

TextField.defaultProps = {
    type: "text",
    noLable: false,
    noValid: false,
    placeholder: ""
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    noLable: PropTypes.bool,
    noValid: PropTypes.bool,
    placeholder: PropTypes.string
};

export default TextField;
