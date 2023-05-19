import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
import { fileUpload } from "../utils/fileUpload";
export const appRoute = express.Router();

appRoute.get("/data", checkAuth, async (req: Request, res: Response) => {
    const userResult = await pool.query(
        `select id,email,company_id from users where email = $1`,

        [
            // @ts-ignore
            req.email,
        ]
    );

    const userRows = userResult.rows;

    if (!userRows.length) return res.sendStatus(401);
    const user = userResult.rows[0];

    const companyId = user.company_id;
    const companyResult = await pool.query(
        "select * from companies where id = $1",
        [companyId]
    );
    const company = companyResult.rows[0];
    const townshipResults = await pool.query("select * from townships");
    const townships = townshipResults.rows;

    const branches = await pool.query(
        "select * from branches where company_id = $1",
        [companyId]
    );

    const branchesIds = branches.rows.map((row) => row.id);
    const branchesMenus = await pool.query(
        "select * from branches_menus where branch_id = ANY($1::int[])",
        [branchesIds]
    );

    const menuIds = branchesMenus.rows.map((row) => row.menu_id);

    const menus = await pool.query(
        `select * from menus where id = ANY($1::int[])`,
        [menuIds]
    );

    const menuCategories = await pool.query("select * from menu_categories");
    const addons = await pool.query("select * from addons");
    const addonCategories = await pool.query("select * from addon_categories");

    res.send({
        user: user,
        menus: menus.rows,
        menuCategories: menuCategories.rows,
        addons: addons.rows,
        addonCategories: addonCategories.rows,
        company: company,
        townships: townships,
        branches: branches.rows,
        branchesMenus: branchesMenus.rows,
    });
});

appRoute.post("/assets", async (req: Request, res: Response) => {
    try {
        fileUpload(req, res, async (error: any) => {
            if (error) return res.send(error);
            const files = req.files as Express.MulterS3.File[];
            const file = files[0];
            const assetUrl = file.location;
            res.send({ assetUrl });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
});
