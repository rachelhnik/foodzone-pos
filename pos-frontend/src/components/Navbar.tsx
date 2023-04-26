import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
import Routes from "./Routes";

import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TapasIcon from "@mui/icons-material/Tapas";
import { Link, useHref, useNavigate, useParams } from "react-router-dom";

const drawerList = [
    {
        id: 1,
        icon: <RestaurantMenuIcon />,
        label: "/",
        link: "menus",
    },
    {
        id: 2,
        icon: <CategoryIcon />,
        label: "Menu Category",
        link: "menu-categories",
    },
    {
        id: 3,
        icon: <TapasIcon />,
        label: "Add on",
        link: "addons",
    },
    {
        id: 4,
        icon: <ClassIcon />,
        label: "Add on Category",
        link: "addon-categories",
    },
    {
        id: 5,
        icon: <SettingsIcon />,
        label: "Settings",
        link: "/settings",
    },
];
export default function NavBar() {
    const [state, setState] = React.useState({ open: false });
    const navigate = useNavigate();
    const { locationId } = useParams();
    const pageLocation = window.location.href.split("/").pop();
    console.log(pageLocation === locationId);

    const handleToggle = () => {
        setState({ open: !state.open });
    };
    const render = (item: any) => {
        if (pageLocation === locationId) {
            console.log(pageLocation, item.label);
            return (
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
                                backgroundColor: "#FAFBFD",
                            },
                        }}
                    >
                        <ListItemButton
                            sx={{
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "#B8621B" }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                sx={{ color: "#B8621B" }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            );
        }
    };
    const drawerContent = () => {
        return (
            <>
                <List sx={{ width: 250, mt: 2 }}>
                    {drawerList.slice(0, 4).map((item) => render(item))}
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
                                    <ListItemIcon sx={{ color: "#B8621B" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        sx={{ color: "#B8621B" }}
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
            <AppBar position="static" sx={{ bgcolor: "#DFA67B" }}>
                <Toolbar>
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
                        {pageTitle}
                    </Typography>
                    <Button color="inherit">Login</Button>
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
