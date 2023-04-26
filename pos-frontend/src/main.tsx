import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import AppProvider from "./contexts/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>
);
