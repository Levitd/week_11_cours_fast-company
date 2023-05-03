import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const togleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    {formType === "register"
                        ? <>
                            <h3 className="mb-4">Регистрация</h3>

                            <RegisterForm />
                            <p className="mt-2">Уже зарегистрированы? <button type="button" className="btn btn-link" onClick={togleFormType}>Войдите</button></p>
                        </>
                        : <>
                            <h3 className="mb-4">Вход</h3>
                            <LoginForm />
                            <p className="mt-2">Не зарегистрированы?<button type="button" className="btn btn-link" onClick={togleFormType}>Регистрация</button></p>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Login;
