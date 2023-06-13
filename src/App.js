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
import AuthProvider from "./hooks/useAuth";

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <UserProvider>
                    <ProfessionProvider>
                        <QualitiesProvider>
                            <Switch>
                                <Route path="/" exact component={Main} />
                                <Route path="/login/:type?" component={Login} />
                                <Route path="/users" exact component={Users} />
                                <Route path="/user/:id/edit" component={UserPages.UserEditPage} />
                                <Route path="/user/:id" component={UserPages.UserPage} />
                            </Switch>
                        </QualitiesProvider>
                    </ProfessionProvider>
                </UserProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
