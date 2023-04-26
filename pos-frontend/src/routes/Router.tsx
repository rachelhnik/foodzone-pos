import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Menu } from "@mui/material";
import Menus from "../components/Menus";
import MenuCategory from "../components/MenuCategories";
import Addon from "../components/Addons";
import AddonCategory from "../components/AddonCategories";
import AddMenu from "../components/AddMenu";
import AppProvider from "../contexts/AppContext";
import Settings from "../components/Settings";
import MenuCategories from "../components/MenuCategories";
import SingleMenu from "../components/MenuDetail";
import AddonCategories from "../components/AddonCategories";
import Addons from "../components/Addons";
import MenuDetail from "../components/MenuDetail";
import Location from "../components/Location";
import SingleLocation from "../components/SingleLocation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/location",
        element: <Location />,
    },
    {
        path: "location/:locationId",
        children: [
            {
                index: true,
                element: <SingleLocation />,
            },
            {
                path: "menus",

                children: [
                    {
                        index: true,
                        element: <Menus />,
                    },
                    {
                        path: ":menuId",
                        element: <MenuDetail />,
                    },
                ],
            },
            {
                path: "menu-categories",
                element: <MenuCategories />,
            },
            { path: "addons", element: <Addons /> },
            {
                path: "addon-categories",
                element: <AddonCategories />,
            },
        ],
    },

    {
        path: "/settings",
        element: <Settings />,
    },
]);
// children: [
//     {
//         path: "/location",
//         element: <Location />,
//     },
//     {
//         path: "location/:locationId",
//         element: <SingleLocation />,
//     },
//     {
//         path: "/menus/:menuId",
//         element: <MenuDetail />,
//     },
//     {
//         path: "/menus/addnewmenu",
//         element: <AddMenu />,
//     },
//     {
//         path: "/menu-categories",
//         element: <MenuCategories />,
//     },
//     { path: "/addon", element: <Addons /> },
//     {
//         path: "/addon-categories",
//         element: <AddonCategories />,
//     },
// ],
// },
