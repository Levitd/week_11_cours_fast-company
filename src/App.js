import React, { useEffect } from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import UserPages from "./components/page/UserPage";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <>
            <AuthProvider>
                <NavBar />
                <UserProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <ProtectedRoute path="/user/:id/edit" component={UserPages.UserEditPage} />
                        <ProtectedRoute path="/user/:id" component={UserPages.UserPage} />
                        <ProtectedRoute path="/users" exact component={Users} />
                        <Route path="/logout" component={LogOut} />
                    </Switch>
                </UserProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
