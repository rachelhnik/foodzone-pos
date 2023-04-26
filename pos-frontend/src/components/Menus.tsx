import { Box, Button, Checkbox, TextField } from "@mui/material";
import Layout from "./Layout";
import { useContext, useState } from "react";
import MenusData, { LocationMenu } from "../typings/Types";
import { AppContext, AppContextType } from "../contexts/AppContext";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { config } from "../config/Config";
import { Link, useParams } from "react-router-dom";
import SingleMenu from "./MenuDetail";

const Menus = () => {
    const [menu, setMenu] = useState<MenusData>({ name: "", price: 0 });
    const [avalilable, setAvailable] = useState(false);
    const { fetchData, menus, locations, locationMenus } =
        useContext(AppContext);
    const { locationId } = useParams();
    let locationMenusList: any = [];
    if (locationId) {
        locationMenus
            .filter((data) => data.location_id === parseInt(locationId, 10))
            .filter((item) => {
                menus.filter((menu) => {
                    if (menu.id === item.menu_id) locationMenusList.push(menu);
                });
            });
    }

    const handlePostMenu = async () => {
        if (menu.name.length === 0 || !menu.price) return;

        const response = await fetch(`${config.apiBaseUrl}/menus`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menus: menu, locationId: locationId }),
        });

        console.log("hello");
        fetchData();
    };

    const deleteMenu = async (menuId: number | undefined) => {
        const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
            method: "DELETE",
        });
        fetchData();
    };

    return (
        <Layout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 300,
                    m: "0 auto",
                }}
            >
                <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) =>
                        setMenu({
                            name: e.target.value,
                            price: menu.price ? menu.price : 0,
                        })
                    }
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) =>
                        setMenu({
                            price: parseInt(e.target.value),
                            name: menu.name ? menu.name : "",
                        })
                    }
                />

                <Button variant="contained" onClick={handlePostMenu}>
                    Create
                </Button>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2, display: "flex", flexDirection: "column" }}
                >
                    {locationMenusList.map((item: any) => (
                        <Link key={item.id} to={`${item.id}`}>
                            <Chip
                                label={item.name}
                                variant="outlined"
                                onDelete={() => {
                                    deleteMenu(item?.id);
                                }}
                            />
                        </Link>
                    ))}
                </Stack>
            </Box>
        </Layout>
    );
};

export default Menus;
