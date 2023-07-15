import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import UserPages from "./components/page/UserPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <ProtectedRoute path="/user/:id/edit" component={UserPages.UserEditPage} />
                    <ProtectedRoute path="/user/:id" component={UserPages.UserPage} />
                    <ProtectedRoute path="/users" exact component={Users} />
                    <Route path="/logout" component={LogOut} />
                </Switch>
                <ToastContainer />
            </AppLoader>
        </>
    );
}

export default App;
