import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { config } from "../config/Config";
import { AppContext } from "../contexts/AppContext";

export default function Login() {
    const { setPosData, ...posData } = React.useContext(AppContext);

    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const locationId = localStorage.getItem("selectedLocation");
    const handleLogin = async () => {
        const isValid = user.email.length > 0 && user.password.length > 0;
        if (!isValid) return alert("Please fill both forms");
        try {
            const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const accessToken = await response.json();

                setPosData({
                    ...posData,
                    accessToken: accessToken.accessToken,
                });
                localStorage.setItem("accessToken", accessToken.accessToken);

                return navigate(`/orders`);
            }
        } catch (err) {
            console.log("Error here: ", err);
        }
    };
    return (
        <Layout>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    mt: 4,
                    maxWidth: 300,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    placeholder="Email"
                    type="email"
                    color="primary"
                    focused
                    sx={{ mb: 2 }}
                    onKeyDown={(evt) => {
                        if (evt.key === "Enter") {
                            handleLogin();
                        }
                    }}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                    }}
                />
                <TextField
                    placeholder="Password"
                    type="password"
                    color="primary"
                    focused
                    sx={{ mb: 2 }}
                    onKeyDown={(evt) => {
                        if (evt.key === "Enter") {
                            handleLogin();
                        }
                    }}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ mb: 1 }}
                    onClick={handleLogin}
                >
                    Sign in
                </Button>
                <Typography>
                    Don't have an account ?{" "}
                    <Link to={"/register"}>Sign up</Link>
                </Typography>
            </Box>
        </Layout>
    );
}
