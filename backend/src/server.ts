import express, { Request, Response } from "express";
import cors from "cors";
import { menuRoute } from "../routes/menu";
import { menuCategoryRoute } from "../routes/menuCategory";
import { addonCategoryRoute } from "../routes/addonCategory";
import { addonRoute } from "../routes/addon";
const app: express.Application = express();
const port: number = 5000;
import { pool } from "../db/db";

app.use(cors());
app.use(express.json());

app.get("/data", async (req: Request, res: Response) => {
    const menus = await pool.query("select * from menus");
    const menuCategories = await pool.query("select * from menu_categories");
    const addons = await pool.query("select * from add_ons");
    const addonCategories = await pool.query("select * from addon_categories");
    const locations = await pool.query("select * from locations");
    const locationMenus = await pool.query("select * from location_menus");
    res.send({
        menus: menus.rows,
        menuCategories: menuCategories.rows,
        addons: addons.rows,
        addonCategories: addonCategories.rows,

        locations: locations.rows,
        locationMenus: locationMenus.rows,
    });
});

app.use("/menus", menuRoute);
app.use("/menu-categories", menuCategoryRoute);
app.use("/addon-categories", addonCategoryRoute);
app.use("/addons", addonRoute);

app.listen(port, () => {
    console.log("server is listening at ", port);
});
