import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../../src/services/user.service";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import httpService from "../services/http.service";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    async function signUp({ email, password, ...rest }) {
        const url = `accounts:signUp`;

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completeMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким email уже зарегистрирован" };
                    throw errorObject;
                }
            }
        }
    };
    async function signIn({ email, password, ...rest }) {
        const url = `accounts:signInWithPassword`;

        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Пользователь с таким email не найден" };
                    throw errorObject;
                } else if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Пароль введен не правильно" };
                    throw errorObject;
                } else { // if (message === "TOO_MANY_ATTEMPTS_TRY_LATER")
                    throw new Error("Слишком много попыток входа, попробуйте позже...");
                }
            }
        }
    };
    async function apdateUser(updateData) {
        const url = "user/";
        try {
            const { data } = await httpService.put(url + updateData._id, updateData);
            setUser(data.content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    };

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut, apdateUser }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
