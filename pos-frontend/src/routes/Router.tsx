import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";

import Menus from "../components/Menus";

import Settings from "../components/Settings";
import MenuCategories from "../components/MenuCategories";

import AddonCategories from "../components/AddonCategories";
import Addons from "../components/Addons";
import MenuDetail from "../components/MenuDetail";

import Login from "../components/Login";
import Register from "../components/Register";

import PrivateRoute from "./PrivateRoute";
import Logout from "../components/Logout";
import Orders from "../components/Orders";
import CreateMenu from "../components/CreateMenu";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" Component={App} />
                    <Route path="/orders" Component={Orders} />
                    <Route path="/menus" Component={Menus} />
                    <Route path="/menus/create" Component={CreateMenu} />
                    <Route path="/menus/:menuId" Component={MenuDetail} />
                    <Route path="/menu-categories" Component={MenuCategories} />
                    <Route path="/addons" Component={Addons} />

                    <Route
                        path="/addon-categories"
                        Component={AddonCategories}
                    />
                </Route>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/logout" Component={Logout} />
                <Route path="/settings" Component={Settings} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
