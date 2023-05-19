import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useEffect, useState } from "react";
import MenusData from "../typings/Types";
import { AppContext, AppContextType } from "../contexts/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { config } from "../config/Config";

const Menus = () => {
    const [clickText, setClickText] = useState({
        text: "SOLD OUT",
    });
    const [active, setActive] = useState(false);

    const navigate = useNavigate();
    const branchId = localStorage.getItem("selectedLocation");
    const accessToken = localStorage.getItem("accessToken");

    const { fetchData, menus, branches, branchesMenus } =
        useContext(AppContext);

    const validBranchesMenus = branchesMenus
        .filter((branchMenu) => String(branchMenu.branch_id) === branchId)
        .map((branchMenu) => branchMenu.menu_id);
    console.log(validBranchesMenus);

    const filteredMenus = menus.filter((menu) =>
        validBranchesMenus.includes(menu.id as number)
    );
    console.log(filteredMenus);
    let text: any;

    const handleSale = async (evt: any, menuId: number | undefined) => {
        let isAvailable;

        evt.target.innerText === "SOLD OUT"
            ? (text = "INSTOCK")
            : (text = "SOLD OUT");

        evt.target.innerText === "SOLD OUT"
            ? (isAvailable = false)
            : (isAvailable = true);

        const response = await fetch(
            `${config.apiBaseUrl}/menus/sale/${menuId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    isAvailable: isAvailable,
                    branchId: branchId,
                }),
            }
        );
    };

    const handleDelete = async (menuId: number | undefined) => {
        const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.ok) fetchData();
    };

    return (
        <Layout title="Menus">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: "0 auto",
                    px: 4,
                }}
            >
                <Box sx={{ display: "flex", mt: 5 }}>
                    <Link
                        to={"/menus/create"}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <Box
                            sx={{
                                width: "200px",
                                height: "280px",
                                border: "2px dotted lightgray",
                                borderRadius: 2,
                                mr: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            <AddIcon fontSize="large" />
                            <Typography>Add new menu</Typography>
                        </Box>
                    </Link>
                    {filteredMenus.map((menu) => (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                mr: 2,
                            }}
                            key={menu.id}
                        >
                            <Link
                                to={`/menus/${menu.id}`}
                                style={{
                                    textDecoration: "none",
                                    marginBottom: "1rem",
                                }}
                            >
                                <Card sx={{ width: 200, height: 300 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={menu && menu.asset_url}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {menu.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {menu.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={(evt) => handleDelete(menu.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Layout>
    );
};

export default Menus;
