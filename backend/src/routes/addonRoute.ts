import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
export const addonRoute = express.Router();

addonRoute.post("/", checkAuth, async (req: Request, res: Response) => {
    const { name, price, isAvailable, addonCategoriesId } = req.body;
    const text =
        "INSERT into add_ons(name,price,addon_categories_id,is_available) values($1,$2,$3,$4) RETURNING * ";
    const values = [name, price, addonCategoriesId, isAvailable];
    const { rows } = await pool.query(text, values);
    res.send(rows);
});

addonRoute.delete(
    "/:addonId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { addonId } = req.params;
        const text = "DELETE from add_ons where id = $1 RETURNING * ";
        const value = [addonId];
        const { rows } = await pool.query(text, value);
        res.send(rows);
    }
);
