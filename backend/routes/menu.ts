//import Router from "express-promise-router";

import { pool } from "../db/db";
import express, { Request, Response, Router } from "express";
export const menuRoute = express.Router();

menuRoute.post("/", async (req: Request, res: Response) => {
    const { menus, locationId } = req.body;
    const { name, price } = menus;
    const text = "INSERT into menus (name,price) values($1,$2) RETURNING * ";
    const text2 =
        "INSERT into location_menus (menu_id,location_id) values($1,$2) RETURNING *";
    const menuResult = (await pool.query(text, [name, price])).rows;
    const menuId = menuResult[0].id;
    const locationMenuresult = (await pool.query(text2, [menuId, locationId]))
        .rows;
    res.status(200).send({
        menuResult,
        locationMenuresult,
    });
});

menuRoute.put("/:menuId", async (req: Request, res: Response) => {
    const { name, price } = req.body;
    const { menuId } = req.params;

    const text =
        "UPDATE menus SET name=$1, price=$2  WHERE id =($3) RETURNING *";
    const values = [name, price, menuId];
    const { rows } = await pool.query(text, values);
    res.send(rows);
});

menuRoute.delete("/:menuId", async (req: Request, res: Response) => {
    const { menuId } = req.params;

    if (menuId === undefined) return;
    const text = "delete from menus where id = ($1) RETURNING *";
    const newMenus = await pool.query(text, [menuId]);
    res.send({
        menus: newMenus.rows,
    });
});
