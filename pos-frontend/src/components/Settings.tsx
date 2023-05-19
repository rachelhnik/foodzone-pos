import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    InputLabel,
    MenuItem,
    Radio,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AppContext } from "../contexts/AppContext";
import { BranchesData, Company, User } from "../typings/Types";

import { config } from "../config/Config";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Settings() {
    const { company, branches, user, townships, fetchData } =
        useContext(AppContext);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const currentBranchId = localStorage.getItem("selectedLocation");
    const [companyName, setCompanyName] = useState<Company>({
        name: company?.name || "",
    });
    const [newEmail, setNewEmail] = useState<User>({
        email: user?.email || "",
    });

    const [branchesData, setBranchesData] = useState<BranchesData[]>(branches);

    const [selectedTownshipId, setSelectdTownshipId] = useState("");

    const [newAddress, setNewAddress] = useState("");

    const [selectedBranch, setSelectedBranch] = useState<
        BranchesData | undefined
    >();

    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }
        if (branches.length) {
            const selectedBranchId = localStorage.getItem("selectedLocation");

            if (!selectedBranchId) {
                localStorage.setItem(
                    "selectedLocation",
                    String(selectedBranch?.id)
                );
                const currentBranch = branches.find(
                    (branch) => String(branch.id) === selectedBranchId
                );
            } else {
                const currentBranch = branches.find(
                    (branch) => String(branch.id) === selectedBranchId
                );

                setSelectedBranch(currentBranch);
            }
        }
        setBranchesData(branches);
    }, [branches]);

    const handleOnchange = (evt: SelectChangeEvent<number>) => {
        localStorage.setItem("selectedLocation", String(evt.target.value));
        const currentBranch = branches.find(
            (branch) => String(branch.id) === evt.target.value
        );

        setSelectedBranch(currentBranch);
    };

    const updateCompany = async () => {
        if (companyName.name === company?.name) alert("please update new name");
        const response = await fetch(
            `${config.apiBaseUrl}/settings/companies/${company?.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(companyName),
            }
        );
        const newCompany = await response.json();
        console.log(newCompany);
        fetchData();
        setCompanyName(newCompany.name);
    };

    const updateEmail = async () => {
        if (newEmail.email === user?.email)
            alert("please enter different email");
        const response = await fetch(
            `${config.apiBaseUrl}/settings/users/${user?.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newEmail),
            }
        );
        const newEmailResult = await response.json();

        fetchData();
        setNewEmail(newEmailResult);
    };

    const createNewBranch = async () => {
        if (!selectedTownshipId || !newAddress) return;
        const response = await fetch(
            `${config.apiBaseUrl}/branches/create/${company?.id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    townshipId: selectedTownshipId,
                    address: newAddress,
                }),
            }
        );
        fetchData();
        setSelectdTownshipId("");
        setNewAddress("");
    };

    const updateLocation = async (branch: BranchesData) => {
        const branchId = branch.id;
        const oldBranch = branches.find((branch) => branch.id === branchId);
        const newBranch = branchesData.find(
            (updateBranch) => updateBranch.id === branchId
        );
        if (oldBranch?.address !== newBranch?.address) {
            await fetch(`${config.apiBaseUrl}/branches/${branchId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newBranch),
            });
            fetchData();
        }
    };

    const deleteLocation = async (branch: BranchesData) => {
        const response = await fetch(
            `${config.apiBaseUrl}/branches/${branch.id}`,
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
            "Cannot delete this branch. Please delete relations associated with it first."
        );
    };

    return (
        <Layout>
            <Box
                component="form"
                sx={{
                    maxWidth: 350,
                    margin: "auto",
                    mt: 4,
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>name</label>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <TextField
                            id="outlined-size-small"
                            value={companyName.name}
                            size="small"
                            onChange={(evt) =>
                                setCompanyName({ name: evt.target.value })
                            }
                        />
                        <Button
                            variant="outlined"
                            sx={{ width: 100 }}
                            size="small"
                            onClick={updateCompany}
                        >
                            update
                        </Button>
                    </div>
                    <label>email </label>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <TextField
                            id="outlined-size-small"
                            value={newEmail.email}
                            size="small"
                            onChange={(evt) =>
                                setNewEmail({ email: evt.target.value })
                            }
                        />
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ width: 100 }}
                            onClick={updateEmail}
                        >
                            update
                        </Button>
                    </div>
                </div>
                <Typography>Select current location</Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                    >
                        {branchesData.map((branch, index) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                key={branch.id}
                            >
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",
                                    }}
                                >
                                    <FormControlLabel
                                        value={branch.id}
                                        control={
                                            <Radio
                                                onChange={handleOnchange}
                                                checked={
                                                    currentBranchId ===
                                                    String(branch.id)
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label=""
                                    />
                                    <TextField
                                        id="outlined-select-currency"
                                        defaultValue={
                                            townships.find((data) => {
                                                if (
                                                    data.id ===
                                                    branch.township_id
                                                )
                                                    return data;
                                            })?.name
                                        }
                                        size="small"
                                        sx={{ mt: 1, width: 100 }}
                                    />

                                    <TextField
                                        label="address"
                                        id="outlined-size-small"
                                        value={branch.address}
                                        size="small"
                                        sx={{ mt: 1, ml: 1 }}
                                        onChange={(evt) => {
                                            const newAddress = branchesData.map(
                                                (branchData) => {
                                                    if (
                                                        branchData.id ===
                                                        branch.id
                                                    ) {
                                                        return {
                                                            ...branchData,
                                                            address:
                                                                evt.target
                                                                    .value,
                                                        };
                                                    }
                                                    return branchData;
                                                }
                                            );
                                            setBranchesData(newAddress);
                                        }}
                                    />
                                </Box>
                                <div
                                    style={{
                                        marginTop: "0.5rem",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        sx={{ mr: 2 }}
                                        onClick={() => updateLocation(branch)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteLocation(branch)}
                                    >
                                        delete
                                    </Button>
                                </div>
                            </Box>
                        ))}
                    </RadioGroup>
                </FormControl>
                <Typography>Add new location</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={
                                    selectedTownshipId ? selectedTownshipId : ""
                                }
                                label="township"
                                sx={{ width: 100 }}
                                size="small"
                                onChange={(evt) =>
                                    setSelectdTownshipId(
                                        String(evt.target.value)
                                    )
                                }
                            >
                                {townships.map((township) => (
                                    <MenuItem
                                        key={township.id}
                                        value={township.id}
                                    >
                                        {township.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <TextField
                                id="outlined-size-small"
                                value={newAddress}
                                placeholder="enter address"
                                size="small"
                                onChange={(evt) =>
                                    setNewAddress(evt.target.value)
                                }
                            />
                        </Box>
                    </FormControl>

                    <Button
                        variant="outlined"
                        color="success"
                        onClick={createNewBranch}
                    >
                        create
                    </Button>
                </Box>
            </Box>
        </Layout>
    );
}
