import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box, Chip } from "@mui/material";
import { Link } from "react-router-dom";

export default function Location() {
    const { locations } = useContext(AppContext);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                mt: 2,
                maxWidth: 200,
            }}
        >
            <h3 style={{ margin: "0 auto", marginBottom: "2rem" }}>
                Choose location
            </h3>
            {locations.map((data) => (
                <Link to={`/location/${data.id}`} key={data.id}>
                    <Chip label={data.name} variant="outlined" sx={{ mb: 2 }} />
                </Link>
            ))}
        </Box>
    );
}
