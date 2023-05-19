import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
export const addonCategoryRoute = express.Router();

addonCategoryRoute.post("/", checkAuth, async (req: Request, res: Response) => {
    const { name, isRequired } = req.body;
    const text =
        "INSERT into addon_categories (name,is_required) values($1,$2) RETURNING *";
    const values = [name, isRequired];
    const rows = await pool.query(text, values);
    res.send(rows);
});
addonCategoryRoute.delete(
    "/:addonCategoryId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { addonCategoryId } = req.params;
        if (!addonCategoryId) return;
        const text = "DELETE from addon_categories where id= $1 RETURNING *";
        const id = addonCategoryId;
        const { rows } = await pool.query(text, [id]);
        res.send(rows);
    }
);
