import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
export const menuCategoryRoute = express.Router();

menuCategoryRoute.post("/", checkAuth, async (req: Request, res: Response) => {
    const { name } = req.body;
    console.log(req.body);
    const text = "INSERT into menu_categories (name) values($1) RETURNING *";
    const { rows } = await pool.query(text, [name]);

    res.send(rows);
});
menuCategoryRoute.delete(
    "/:menuCategoryId",
    checkAuth,
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
