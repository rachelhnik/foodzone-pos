import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Routes = () => {
    const list = [
        { nameList: "Home", link: "/" },
        { nameList: "Menus", link: "/menus" },
        { nameList: "Menu Category", link: "/menu-categories" },
        { nameList: "Add on", link: "/addon" },
        { nameList: "Add on Category", link: "/addon-categories" },
    ];
    return (
        <List sx={{ width: 250, mt: 2 }}>
            {list.map((text, index) => (
                <Link
                    to={text.link}
                    style={{ textDecoration: "none", color: "transparent" }}
                >
                    <ListItem
                        key={text.nameList}
                        disablePadding
                        sx={{
                            "&:hover": {
                                backgroundColor: "#FAFBFD",
                            },
                        }}
                    >
                        <ListItemButton
                            sx={{
                                "&:hover": { backgroundColor: "transparent" },
                            }}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary={text.nameList}
                                sx={{ color: "brown" }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
    );
};
export default Routes;

{
    /* <Link to="/">Home</Link>
            <Link to="/menus">Menus</Link>
            <Link to="/menu-categories">Menu Category</Link>
            <Link to="/addon">Add on</Link>
            <Link to="/addon-categories">Add on Categories</Link> */
}
