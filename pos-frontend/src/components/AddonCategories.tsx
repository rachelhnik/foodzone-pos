import { Box, TextField, Checkbox, Button, Chip, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AddonCategory } from "../typings/Types";
import { config } from "../config/Config";
import { AppContext } from "../contexts/AppContext";

export default function AddonCategories() {
    const [addonCategory, setAddonCategory] = useState<AddonCategory | null>(
        null
    );
    const accessToken = localStorage.getItem("accessToken");

    const { fetchData, addonCategories } = useContext(AppContext);

    const updateAddonCategory = async () => {
        if (!addonCategory?.name) return;

        const response = await fetch(`${config.apiBaseUrl}/addon-categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(addonCategory),
        });
        fetchData();
    };

    const deleteAddonCategory = async (addonCategoryId: number | undefined) => {
        if (!addonCategoryId) return;
        const response = await fetch(
            `${config.apiBaseUrl}/addon-categories/${addonCategoryId}`,
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
                    Create a new add on Category
                </h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                        setAddonCategory({
                            name: e.target.value,
                            isRequired: addonCategory?.isRequired
                                ? addonCategory.isRequired
                                : false,
                        });
                    }}
                />

                <Box sx={{ display: "flex", mb: 2 }}>
                    <Checkbox
                        disableRipple
                        color="success"
                        onChange={() => {
                            setAddonCategory({
                                name: addonCategory?.name
                                    ? addonCategory?.name
                                    : "",
                                isRequired: !addonCategory?.isRequired,
                            });
                        }}
                    />
                    <p>is required</p>
                </Box>
                <Button variant="contained" onClick={updateAddonCategory}>
                    Create
                </Button>
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ mt: 2, width: 200 }}
                >
                    {addonCategories.map((item) => (
                        <Chip
                            key={item.id}
                            label={item.name}
                            variant="outlined"
                            onDelete={() => {
                                deleteAddonCategory(item.id);
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        </Layout>
    );
}
