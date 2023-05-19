import React from "react";

import AppProvider, { AppContextType } from "../contexts/AppContext";
import NavBar from "./Navbar";
import { useParams } from "react-router-dom";

interface Props {
    title?: string;
    children: string | JSX.Element | JSX.Element[];
}

export default function Layout(props: Props) {
    const { locationId } = useParams();
    return (
        <div>
            <NavBar title={props.title} />

            <main>{props.children}</main>
        </div>
    );
}
