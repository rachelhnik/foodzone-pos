import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import TapasIcon from "@mui/icons-material/Tapas";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const drawerList = [
    {
        id: 1,
        icon: <LocalMallIcon />,
        label: "Orders",
        link: "/orders",
    },
    {
        id: 2,
        icon: <RestaurantMenuIcon />,
        label: "Menu",
        link: "/menus",
    },
    {
        id: 3,
        icon: <CategoryIcon />,
        label: "Menu Category",
        link: "/menu-categories",
    },
    {
        id: 4,
        icon: <TapasIcon />,
        label: "Add on",
        link: "/addons",
    },
    {
        id: 5,
        icon: <ClassIcon />,
        label: "Add on Category",
        link: "/addon-categories",
    },

    {
        id: 6,
        icon: <SettingsIcon />,
        label: "Settings",
        link: "/settings",
    },
];
interface Props {
    title?: string;
}
export default function NavBar({ title }: Props) {
    const [state, setState] = React.useState({ open: false });

    const { branches } = useContext(AppContext);
    const selectedLocationId = localStorage.getItem("selectedLocation");
    const accessToken = localStorage.getItem("accessToken");
    const selectedBranch = branches.find(
        (branch) => String(branch.id) === selectedLocationId
    );

    const handleToggle = () => {
        setState({ open: !state.open });
    };

    const drawerContent = () => {
        return (
            <>
                <List sx={{ width: 250, mt: 2 }}>
                    {drawerList.slice(0, 5).map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            style={{
                                textDecoration: "none",
                                color: "transparent",
                            }}
                        >
                            <ListItem
                                disablePadding
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "50px",
                                        boxShadow: "0 0 11px #dee2e6",
                                    },
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "#f8f9fa",
                                            borderRadius: "50px",
                                            boxShadow: "0 0 11px #f8f9fa",
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "#0077B6" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        sx={{ color: "black" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {drawerList.slice(-1).map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            style={{ textDecoration: "none", color: "#313131" }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "#0077B6" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        sx={{ color: "black" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </>
        );
    };
    const pageTitle = drawerList.find(
        (item) => item.link === window.location.pathname
    )?.label;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "#0077B6" }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                setState({ open: true });
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {selectedBranch ? selectedBranch.address : ""}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {pageTitle}
                        </Typography>
                    </Box>
                    <Box>
                        <Link to={accessToken ? "/logout" : "/login"}>
                            <Button color="inherit" sx={{ color: "white" }}>
                                {accessToken ? "Logout" : "Login"}
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                open={state.open}
                onClose={handleToggle}
                PaperProps={{
                    elevation: 8,
                    sx: {
                        width: 240,

                        color: "black",
                    },
                }}
            >
                {drawerContent()}
            </Drawer>
        </Box>
    );
}
