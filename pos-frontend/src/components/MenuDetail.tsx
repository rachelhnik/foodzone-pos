import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import Chip from "@mui/material/Chip";
import { Box, Button, TextField } from "@mui/material";
import MenusData, { MenuCategory } from "../typings/Types";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { config } from "../config/Config";

export default function MenuDetail() {
    const { menus, fetchData, menuCategories, menuMenuCategories } =
        useContext(AppContext);

    const { menuId } = useParams();

    let menu: MenusData | undefined;
    if (menuId) {
        menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
    }
    const [newMenu, setMenu] = useState({ name: "", price: 0 });

    useEffect(() => {
        if (menu) {
            setMenu({ name: menu.name, price: menu.price });
        }
    }, [menu]);

    const updateMenu = async () => {
        const response = await fetch(`${config.apiBaseUrl}/menus/${menu?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMenu),
        });
        console.log(await response.json());
    };

    return (
        <Layout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 200,
                    margin: "0 auto",
                    mt: 5,
                }}
            >
                {menu ? (
                    <Box>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            defaultValue={menu.name}
                            sx={{ mb: 2 }}
                            onChange={(evt) =>
                                setMenu({ ...newMenu, name: evt.target.value })
                            }
                        />
                        <TextField
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            type="number"
                            defaultValue={menu.price}
                            sx={{ mb: 2 }}
                            onChange={(evt) =>
                                setMenu({
                                    ...newMenu,
                                    price: parseInt(evt.target.value, 10),
                                })
                            }
                        />
                        <Button variant="contained" onClick={updateMenu}>
                            Update
                        </Button>
                    </Box>
                ) : (
                    <h1>Menu not found</h1>
                )}
            </Box>
        </Layout>
    );
}
