import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPages from "./components/page/UserPage";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQuality";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/login/:type?" component={Login} />
                        <UserProvider>
                            <Route path="/users" exact component={Users} />
                            <Route path="/user/:id/edit" component={UserPages.UserEditPage} />
                            <Route path="/user/:id" component={UserPages.UserPage} />
                        </UserProvider>
                    </QualitiesProvider>
                </ProfessionProvider>
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
