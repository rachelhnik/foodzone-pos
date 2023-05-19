import * as dotenv from "dotenv";
dotenv.config();
import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
export const authRoute = express.Router();
import bcrypt, { compare, hash } from "bcrypt";
import { error } from "console";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

authRoute.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const isValid =
        name &&
        name.length > 0 &&
        email &&
        email.length > 0 &&
        password &&
        password.length > 0;

    if (!isValid) res.status(400).send("Request is invalid !");

    const result = await pool.query("select * from users where email=$1 ", [
        email,
    ]);

    if (result.rows.length)
        return res.send({ message: "User already exists." });

    const companiesResult = await pool.query(
        "insert into companies(name) values($1) RETURNING *",
        ["default companies"]
    );
    const companyId = companiesResult.rows[0].id;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
        "insert into users (name, email, password, company_id) values($1, $2, $3, $4) RETURNING *",
        [name, email, encryptedPassword, companyId]
    );
    const branchesResult = await pool.query(
        "insert into branches (address,township_id, company_id) values($1, $2 ,$3) returning *",
        ["Default address", 1, companyId]
    );
    const branchId = branchesResult.rows[0].id;

    const menusResult = await pool.query(
        "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
        [
            ["mote-hinn-kharr", "shan-khout-swell"],
            [500, 1000],
        ]
    );
    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    await pool.query(
        "insert into branches_menus (menu_id, branch_id) select * from unnest ($1::int[], $2::int[])",
        [
            [defaultMenuId1, defaultMenuId2],
            [branchId, branchId],
        ]
    );
    const menuCategoriesResult = await pool.query(
        "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;
    await pool.query(
        `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
    );
    const defaultAddonCategoriesResult = await pool.query(
        "insert into addon_categories (name) values ('Drinks'), ('Sizes') returning *"
    );
    const defaultAddonCategoryId1 = defaultAddonCategoriesResult.rows[0].id;
    const defaultAddonCategoryId2 = defaultAddonCategoriesResult.rows[1].id;
    await pool.query(
        `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );
    await pool.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}),
      ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);
    res.send(newUser.rows);
});

authRoute.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);
    const isValid =
        email && email.length > 0 && password && password.length > 0;
    if (!isValid) return res.status(400).send("Request is invalid");

    const text = "select * from users where email=$1 ";
    const { rows } = await pool.query(text, [email]);

    if (!rows.length)
        return res.status(404).send("Please fill the correct data");
    const isValidPassword = await bcrypt.compare(password, rows[0].password);
    if (!isValidPassword) return res.status(401).send("Invalid credentails.");
    const userInfo = rows[0];
    const user = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
    };
    const accessToken = jwt.sign(user, config.jwtSecret);
    res.send({ accessToken });
});

authRoute.post("/test", async (req: Request, res: Response) => {
    const { name } = req.body;
    const textLocation = "select * from locations";
    const locations = (await pool.query(textLocation)).rows;
    const text = "insert into companies(name) values($1)";
    const { rows } = await pool.query(text, [name]);

    res.status(200).send(locations);
});
