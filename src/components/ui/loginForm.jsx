import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
// import * as yup from "yup";

const LoginForm = () => {
    // console.log(process.env);
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    // const [enrerError, setEnterError] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const loginError = useSelector(getAuthErrors());

    // Оставил как пример использования yup
    // const validateScheme = yup.object().shape({
    //     password: yup.string().required("Пароль обязателен для заполнения").matches(/^(?=.*[A-Z])/, "Пароль должен содержать хотя бы 1 заглавную букву")
    //         .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы 1 цифру")
    //         .matches(/(?=.*[!@#$%^&*])/, "Пароль должен содержать один спец символов: !@#$%^&* ")
    //         .matches(/(?=.{8,})/, "Пароль должен быть не менее 8 символов"),
    //     email: yup.string().required("Электронная почта обязательна для заполнения").email("Email введен некорректно")
    // });

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        // setEnterError(null);
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: { message: "Пароль должен содержать хотя бы 1 заглавную букву" },
            isContainDogit: { message: "Пароль должен содержать хотя бы 1 цифру" },
            min: { message: "Пароль должен быть не менее 8 символов", value: 8 }
        }
    };

    useEffect(() => { validate(); }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateScheme.validate(data).then(() => setErrors({})).catch((err) => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state ? history.location.state.from.pathname : "/";

        dispatch(login({ payload: data, redirect }));
        // signIn(data);
        // history.push(history.location.state ? history.location.state.from.pathname : "/");
    };
    return (<>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Войти</button>
        </form>
    </>
    );
};

export default LoginForm;
