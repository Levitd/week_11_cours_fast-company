import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserInfo from "./layouts/userInfo";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/user/:id?" component={UserInfo} />
            </Switch>
            {/* <Users /> */}
        </>
    );
}

export default App;
