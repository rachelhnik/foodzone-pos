import { Box, Typography } from "@mui/material";
import Layout from "./Layout";
import { AppContext, defaultContext } from "../contexts/AppContext";
import { useContext, useEffect } from "react";

const Logout = () => {
    const { setPosData } = useContext(AppContext);

    useEffect(() => {
        setPosData(defaultContext);
        localStorage.removeItem("accessToken");
    }, []);

    return (
        <Layout>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <Typography variant="h3">You are logged out.</Typography>
            </Box>
        </Layout>
    );
};
export default Logout;
