import { useState, useContext } from "react";
import Layout from "./Layout";
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Chip,
    Stack,
} from "@mui/material";
import { Addon } from "../typings/Types";
import { AppContext } from "../contexts/AppContext";
import MenuCategories from "./MenuCategories";
import { config } from "../config/Config";

export default function Addons() {
    const [addon, setAddon] = useState<Addon | null>(null);
    const { fetchData, addons, addonCategories } = useContext(AppContext);

    const updateAddon = async () => {
        if (addon?.name.length === 0 || addon?.addonCategoriesId === null)
            return;
        const response = await fetch(`${config.apiBaseUrl}/addons`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addon),
        });

        fetchData();
    };

    const deleteAddon = async (addonId: number | undefined) => {
        if (addonId === undefined) return;
        const response = await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
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
                <h1 style={{ textAlign: "center" }}>Create a new add on</h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                        setAddon({
                            name: e.target.value,
                            price: addon?.price ? addon.price : 0,
                            addonCategoriesId: addon?.addonCategoriesId
                                ? addon.addonCategoriesId
                                : null,
                            isAvailable: addon?.isAvailable
                                ? addon.isAvailable
                                : false,
                        });
                    }}
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                        setAddon({
                            name: addon?.name ? addon.name : "",
                            price: parseInt(e.target.value),
                            addonCategoriesId: addon?.addonCategoriesId
                                ? addon.addonCategoriesId
                                : null,
                            isAvailable: addon?.isAvailable
                                ? addon.isAvailable
                                : false,
                        });
                    }}
                />
                <Box sx={{ display: "flex", mb: 2 }}>
                    <Checkbox
                        disableRipple
                        color="success"
                        onChange={() => {
                            setAddon({
                                name: addon?.name ? addon.name : "",
                                price: addon?.price ? addon?.price : 0,
                                addonCategoriesId: addon?.addonCategoriesId
                                    ? addon.addonCategoriesId
                                    : null,
                                isAvailable: !addon?.isAvailable,
                            });
                        }}
                    />
                    <p>is avalilable</p>
                </Box>

                <div style={{ marginBottom: "2rem" }}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        helperText="Please select category"
                        sx={{ width: 300 }}
                    >
                        {addonCategories.map((cat) => (
                            <MenuItem
                                key={cat.id}
                                value={cat.id}
                                onClick={() => {
                                    setAddon({
                                        name: addon?.name ? addon.name : "",
                                        price: addon?.price ? addon?.price : 0,
                                        addonCategoriesId: cat.id,
                                        isAvailable: !addon?.isAvailable,
                                    });
                                }}
                            >
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button variant="contained" onClick={updateAddon}>
                    Create
                </Button>
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ mt: 2, width: 200 }}
                >
                    {addons.map((item) => (
                        <Chip
                            key={item.id}
                            label={item.name}
                            variant="outlined"
                            onDelete={() => deleteAddon(item.id)}
                        />
                    ))}
                </Stack>
            </Box>
        </Layout>
    );
}
