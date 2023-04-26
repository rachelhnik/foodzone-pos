import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout";
import Routes from "./components/Routes";
import NavBar from "./components/Navbar";
import AppProvider from "./contexts/AppContext";
import Location from "./components/Location";
import Login from "./components/Login";

function App() {
    return (
        <div className="App">
            <Login />
        </div>
    );
}

export default App;
