import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPages from "./components/page/UserPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/user/:id/edit" component={UserPages.UserEditPage} />
                <Route path="/user/:id" component={UserPages.UserPage} />
            </Switch>
        </>
    );
}

export default App;
