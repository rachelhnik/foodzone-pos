import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useState } from "react";
import MenusData from "../typings/Types";
import { config } from "../config/Config";
import FileDropZone from "./FileDropZone";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreateMenu = () => {
    const [menuImage, setMenuImage] = useState<File>();
    const [locationNames, setLocationName] = useState<string[] | string>([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const { fetchData } = useContext(AppContext);

    const [menu, setMenu] = useState<MenusData>({
        name: "",
        price: 0,
        isAvailable: true,
        description: "",
        branchIds: [],
        asset_url: "",
    });

    const isDisabled = !menu.name || !menu.price || !menu.description;

    const { branches, townships } = useContext(AppContext);

    const onFileSelected = (files: File[]) => {
        setMenuImage(files[0]);
    };

    const createMenu = async () => {
        if (!menu.name) return console.log("Please enter menu name");
        try {
            if (menuImage) {
                const formData = new FormData();

                formData.append("files", menuImage as Blob);
                const response = await fetch(`${config.apiBaseUrl}/assets`, {
                    method: "POST",

                    body: formData,
                });
                const responseJSON = await response.json();
                const assetUrl = responseJSON.assetUrl;
                menu.asset_url = assetUrl;
                const menuResponse = await fetch(`${config.apiBaseUrl}/menus`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(menu),
                });
                fetchData();
                if (menuResponse.ok) navigate("/menus");
            }
        } catch (error) {
            return null;
        }
    };

    const deleteMenu = async (menuId?: number) => {
        if (!menuId) return;
        const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
            method: "DELETE",
        });
    };

    return (
        <Layout>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 350,
                        margin: "0 auto",
                    }}
                >
                    <h1 style={{ textAlign: "center" }}>Create a new menu</h1>
                    <TextField
                        label="Name"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onChange={(evt) =>
                            setMenu({ ...menu, name: evt.target.value })
                        }
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        type="number"
                        sx={{ mb: 2 }}
                        onChange={(evt) =>
                            setMenu({
                                ...menu,
                                price: parseInt(evt.target.value, 10),
                            })
                        }
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onChange={(evt) =>
                            setMenu({ ...menu, description: evt.target.value })
                        }
                    />
                    <Select
                        multiple
                        value={locationNames}
                        onChange={(evt) => {
                            setLocationName(evt.target.value),
                                setMenu({
                                    ...menu,
                                    branchIds:
                                        typeof evt.target.value === "string"
                                            ? evt.target.value.split(",")
                                            : evt.target.value,
                                });
                        }}
                    >
                        {branches.map((branch) => (
                            <MenuItem key={branch.id} value={branch.id}>
                                {townships.map((township) =>
                                    township.id === branch.township_id
                                        ? township.name
                                        : ""
                                )}{" "}
                                /{branch.address}
                            </MenuItem>
                        ))}
                    </Select>
                    <FileDropZone onFileSelected={onFileSelected} />

                    <Button
                        variant="contained"
                        onClick={createMenu}
                        sx={{ mt: 2 }}
                        disabled={isDisabled}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Layout>
    );
};

export default CreateMenu;
