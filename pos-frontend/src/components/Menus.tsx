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
import MenusData, { branchesMenus } from "../typings/Types";
import { AppContext, AppContextType } from "../contexts/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { config } from "../config/Config";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red } from "@mui/material/colors";

const Menus = () => {
    const navigate = useNavigate();
    const branchId = localStorage.getItem("selectedLocation");
    const accessToken = localStorage.getItem("accessToken");

    const { fetchData, menus, branches, branchesMenus } =
        useContext(AppContext);
    const branchIds = branches.map((branch) => branch.id);

    const [branchMenus, setBranchMenus] =
        useState<branchesMenus[]>(branchesMenus);

    const validBranchesMenus = branchesMenus
        .filter((branchMenu) => String(branchMenu.branch_id) === branchId)
        .map((branchMenu) => branchMenu.menu_id);

    const filteredMenus = menus.filter((menu) =>
        validBranchesMenus.includes(menu.id as number)
    );

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

    const handleSoldOut = async (menuId: number | undefined) => {
        const currentBranchesData = branchMenus.map((updateBranchMenu) => {
            if (
                updateBranchMenu.menu_id === menuId &&
                String(updateBranchMenu.branch_id) === branchId
            ) {
                return { ...updateBranchMenu, is_available: false };
            }
            return updateBranchMenu;
        });

        const response = await fetch(
            `${config.apiBaseUrl}/menus/sale/${menuId}`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    currentBranchesData,
                    branchId: branchId,
                    branchIds: branchIds,
                }),
            }
        );
        const updatedData = await response.json();
        fetchData();
        setBranchMenus(updatedData);
    };
    const handleInstock = async (menuId: number | undefined) => {
        const currentBranchesData = branchMenus.map((updateBranchMenu) => {
            if (
                updateBranchMenu.menu_id === menuId &&
                String(updateBranchMenu.branch_id) === branchId
            ) {
                return { ...updateBranchMenu, is_available: true };
            }
            return updateBranchMenu;
        });

        const response = await fetch(
            `${config.apiBaseUrl}/menus/sale/${menuId}`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    currentBranchesData,
                    branchId: branchId,
                    branchIds: branchIds,
                }),
            }
        );
        const updatedData = await response.json();
        fetchData();
        setBranchMenus(updatedData);
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
                                position: "relative",
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
                                <Card sx={{ width: 200, height: 280 }}>
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
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            {menu.description}
                                        </Typography>

                                        {branchMenus.find(
                                            (branchMenu) =>
                                                String(branchMenu.branch_id) ===
                                                    branchId &&
                                                branchMenu.menu_id === menu.id
                                        )?.is_available === false ? (
                                            <Typography
                                                variant="h5"
                                                sx={{ color: "red", mt: 2 }}
                                            >
                                                SOLD OUT
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="h5"
                                                sx={{ color: "green", mt: 2 }}
                                            >
                                                INSTOCK
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                            <DeleteForeverIcon
                                sx={{
                                    color: "red",
                                    position: "absolute",
                                    right: 0,
                                    bottom: 50,
                                }}
                                onClick={(evt) => handleDelete(menu.id)}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <Button
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleSoldOut(menu.id)}
                                >
                                    Sold out
                                </Button>
                                <Button
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleInstock(menu.id)}
                                >
                                    Instock
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Layout>
    );
};

export default Menus;
