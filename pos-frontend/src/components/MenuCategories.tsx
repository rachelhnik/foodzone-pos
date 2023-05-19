import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { Box, TextField, Button, Chip, Stack } from "@mui/material";
import { MenuCategory } from "../typings/Types";
import { config } from "../config/Config";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function MenuCategories() {
    const [menuCategory, setMenuCategory] = useState<MenuCategory | null>({
        name: "",
    });
    console.log(menuCategory);
    const { fetchData, menuCategories } = useContext(AppContext);
    const accessToken = localStorage.getItem("accessToken");

    const navigate = useNavigate();
    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken]);

    const handleMenuCategoryUpdate = async () => {
        if (menuCategory?.name.length === 0) return;

        const response = await fetch(`${config.apiBaseUrl}/menu-categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(menuCategory),
        });

        fetchData();
        setMenuCategory({ name: "" });
    };

    const deleteCategory = async (menuCategoryId: number | undefined) => {
        if (!menuCategoryId) return;
        const response = await fetch(
            `${config.apiBaseUrl}/menu-categories/${menuCategoryId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
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
                <h1 style={{ textAlign: "center" }}>
                    Create a new menu category
                </h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) => setMenuCategory({ name: e.target.value })}
                />
                <Button variant="contained" onClick={handleMenuCategoryUpdate}>
                    Create
                </Button>
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ mt: 2, width: 200 }}
                >
                    {menuCategories.map((item) => (
                        <Chip
                            key={item.id}
                            label={item.name}
                            variant="outlined"
                            onDelete={() => {
                                deleteCategory(item.id);
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        </Layout>
    );
}
