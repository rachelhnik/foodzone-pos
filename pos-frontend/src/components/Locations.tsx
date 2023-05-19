import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LocationsData } from "../typings/Types";
import { config } from "../config/Config";

const Locations = () => {
    const { locations, fetchData, company } = useContext(AppContext);
    const accessToken = localStorage.getItem("accessToken");
    const [newLocation, setNewLocation] = useState<LocationsData>({
        name: "",
        address: "",
    });
    const [updatedLocations, setUpdateLocations] =
        useState<LocationsData[]>(locations);

    useEffect(() => {
        setUpdateLocations(locations);
    }, [locations]);
    const updateLocation = async (location: LocationsData) => {
        const locationId = location.id;
        const oldLocation = locations.find((loc) => loc.id === locationId);
        const newLocation = updatedLocations.find(
            (updateLocation) => updateLocation.id === locationId
        );
        if (
            oldLocation?.name !== newLocation?.name ||
            oldLocation?.address !== newLocation?.address
        ) {
            await fetch(`${config.apiBaseUrl}/locations/${location.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(location),
            });
            fetchData();
        }
    };
    const deleteLocation = async (location: LocationsData) => {
        const response = await fetch(
            `${config.apiBaseUrl}/locations/${location.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.ok) {
            return fetchData();
        }
        alert(
            "Cannot delete this location. Please delete menus associated with it first."
        );
    };
    const createLocation = async () => {
        const isValid = newLocation.name && newLocation.address;
        if (!isValid) return alert("Name and address are required.");
        newLocation.companyId = company?.id;
        const response = await fetch(`${config.apiBaseUrl}/locations `, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newLocation),
        });
        if (response.ok) {
            fetchData();
        }
        setNewLocation({ name: "", address: "" });
    };

    return (
        <Layout title="Locations">
            <Box sx={{ px: 2, mt: 5 }}>
                {updatedLocations.map((location, index) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 3,
                            }}
                            key={location.id}
                        >
                            <Typography variant="h5" sx={{ mr: 1 }}>
                                {index + 1}.
                            </Typography>
                            <TextField
                                value={location.name}
                                sx={{ mr: 3 }}
                                onChange={(evt) => {
                                    const newLocations = updatedLocations.map(
                                        (updateLocation) => {
                                            if (
                                                updateLocation.id ===
                                                location.id
                                            ) {
                                                return {
                                                    ...updateLocation,
                                                    name: evt.target.value,
                                                };
                                            }
                                            return updateLocation;
                                        }
                                    );
                                    setUpdateLocations(newLocations);
                                }}
                            />
                            <TextField
                                value={location.address}
                                sx={{ mr: 3, minWidth: 300 }}
                                onChange={(evt) => {
                                    const newLocations = updatedLocations.map(
                                        (updateLocation) => {
                                            if (
                                                updateLocation.id ===
                                                location.id
                                            ) {
                                                return {
                                                    ...updateLocation,
                                                    address: evt.target.value,
                                                };
                                            }
                                            return updateLocation;
                                        }
                                    );
                                    setUpdateLocations(newLocations);
                                }}
                            />

                            <Button
                                variant="outlined"
                                sx={{ mr: 2 }}
                                onClick={() => updateLocation(location)}
                            >
                                Update
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleteLocation(location)}
                            >
                                Delete
                            </Button>
                        </Box>
                    );
                })}
            </Box>
            <Box sx={{ px: 5.5, display: "flex", alignItems: "center", mb: 3 }}>
                <TextField
                    placeholder="Name"
                    value={newLocation.name}
                    onChange={(evt) =>
                        setNewLocation({
                            ...newLocation,
                            name: evt.target.value,
                        })
                    }
                    sx={{ mr: 3 }}
                />
                <TextField
                    placeholder="Address"
                    value={newLocation.address}
                    onChange={(evt) =>
                        setNewLocation({
                            ...newLocation,
                            address: evt.target.value,
                        })
                    }
                    sx={{ mr: 3, minWidth: 300 }}
                />
                <Button
                    variant="outlined"
                    color="success"
                    onClick={createLocation}
                >
                    Create
                </Button>
            </Box>
        </Layout>
    );
};

export default Locations;
