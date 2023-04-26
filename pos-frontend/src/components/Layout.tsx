import React from "react";
import Routes from "./Routes";
import AppProvider, { AppContextType } from "../contexts/AppContext";
import NavBar from "./Navbar";
import { useParams } from "react-router-dom";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

export default function Layout(props: Props) {
    const { locationId } = useParams();
    return (
        <div>
            <NavBar />

            <main>{props.children}</main>
        </div>
    );
}
