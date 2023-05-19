import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout";

import NavBar from "./components/Navbar";
import AppProvider from "./contexts/AppContext";

import Orders from "./components/Orders";

function App() {
    return (
        <div className="App">
            <Layout children={""} />
        </div>
    );
}

export default App;
