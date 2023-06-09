//import Router from "express-promise-router";

import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
import { menuQueries } from "../queries/menuQueries";
import { pool } from "../../db/db";

export const menuRoute = express.Router();

menuRoute.post("/", checkAuth, async (req: Request, res: Response) => {
    try {
        const { name, price, description, branchIds, asset_url } = req.body;

        const menu = await menuQueries.createMenu({
            name,
            price,
            description,
            branchIds,
            asset_url,
        });

        res.send(menu);
    } catch (error) {
        return res.sendStatus(500);
    }
});
menuRoute.delete("/:menuId", checkAuth, async (req: Request, res: Response) => {
    const { menuId } = req.params;
    const menus = await menuQueries.deleteMenu(menuId);
    res.send(menus);
});

menuRoute.put("/:menuId", checkAuth, async (req: Request, res: Response) => {
    const { name, price } = req.body;
    const { menuId } = req.params;
    const menus = await menuQueries.updateMenu(menuId, { name, price });
    res.send(menus);
});

menuRoute.put(
    "/sale/:menuId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { menuId } = req.params;
        const { isAvailable, branchId } = req.body;
        const text =
            "UPDATE branches_menus SET is_available=$1  WHERE menu_id =($2) AND branch_id=($3) RETURNING *";
        const result = await pool.query(text, [isAvailable, menuId, branchId]);

        res.send(result.rows);
    }
);
