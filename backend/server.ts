import express, { Request, Response } from "express";
import cors from "cors";
import { menuRoute } from "./src/routes/menuRoute";
import { menuCategoryRoute } from "./src/routes/menuCategoryRoute";
import { addonCategoryRoute } from "./src/routes/addonCategoryRoute";
import { addonRoute } from "./src/routes/addonRoute";
const app: express.Application = express();
const port: number = 5000;
import { authRoute } from "./src/routes/authRoute";

import { appRoute } from "./src/routes/appRoute";
import { settingsRoute } from "./src/routes/SettingsRoute";
import { branchesRoute } from "./src/routes/BranchesRoute";

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/menus", menuRoute);
app.use("/menu-categories", menuCategoryRoute);
app.use("/addon-categories", addonCategoryRoute);
app.use("/addons", addonRoute);
app.use("/auth", authRoute);
app.use("/", appRoute);
app.use("/settings", settingsRoute);
app.use("/branches", branchesRoute);
app.listen(port, () => {
    console.log("server is listening at ", port);
});
