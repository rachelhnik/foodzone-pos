import { pool } from "../db/db";
import express, { Request, Response, Router } from "express";
export const menuCategoryRoute = express.Router();

menuCategoryRoute.post("/", async (req: Request, res: Response) => {
    const { name } = req.body;
    const text = "INSERT into menu_categories (name) values($1) RETURNING *";
    const { rows } = await pool.query(text, [name]);

    res.send(rows);
});
menuCategoryRoute.delete(
    "/:menuCategoryId",
    async (req: Request, res: Response) => {
        const { menuCategoryId } = req.params;

        if (menuCategoryId === undefined) return;
        const text = "delete from menu_categories where id = ($1) RETURNING *";
        const newMenus = await pool.query(text, [menuCategoryId]);
        res.send({
            menus: newMenus.rows,
        });
    }
);
