import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { config } from "../config/Config";
import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export default function Register() {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [open, setOpen] = React.useState(false);

    const validateEmail = (email1: string) => {
        return String(email1)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleRegister = async () => {
        const isValid =
            user.name.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0;
        if (!isValid) return alert("please fill all form");
        const validEmail = validateEmail(user.email);
        if (!validEmail) return alert("please use a valid email");
        const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        console.log(response);
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

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
                    placeholder="Name"
                    type="text"
                    color="primary"
                    focused
                    sx={{ mb: 2 }}
                    onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                    }}
                />
                <TextField
                    placeholder="Email"
                    type="email"
                    color="primary"
                    focused
                    sx={{ mb: 2 }}
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
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ mb: 1 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
                <Typography>
                    Already have an account ? <Link to={"/login"}>Log in</Link>
                </Typography>
            </Box>
        </Layout>
    );
}
