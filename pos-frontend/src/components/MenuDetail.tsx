import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";

import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import MenusData from "../typings/Types";

import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/Config";

export default function MenuDetail() {
    const { menus, branchesMenus, menuCategories } = useContext(AppContext);

    const { menuId } = useParams();
    const navigate = useNavigate();

    let menu: MenusData | undefined;
    if (menuId) {
        menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
        if (menu) {
            const menuLocation = branchesMenus.find(
                (item) => item.menu_id === menu?.id
            );
            if (menuLocation) {
                menu.isAvailable = menuLocation.isAvailable;
            }
        }
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

    const categories = menuCategories.map((menucat) => ({
        title: menucat.name,
    }));

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
                        <Stack sx={{ width: 200, mb: 2 }}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={categories}
                                getOptionLabel={(option) => option.title}
                                defaultValue={[categories[0]]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Multiple values"
                                        placeholder=""
                                    />
                                )}
                            />
                        </Stack>
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
