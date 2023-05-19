import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
export const branchesRoute = express.Router();

branchesRoute.post(
    "/create/:companyId",
    checkAuth,
    async (req: Request, res: Response) => {
        const companyId = req.params.companyId;
        const { townshipId, address } = req.body;
        const text =
            "insert into branches(address,township_id,company_id) values($1,$2,$3) RETURNING *";
        const newBranchData = await pool.query(text, [
            address,
            townshipId,
            companyId,
        ]);
        res.send(newBranchData.rows);
    }
);

branchesRoute.put(
    "/:branchId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { branchId } = req.params;
        const { address } = req.body;
        const text =
            "UPDATE branches SET address=$1  WHERE id =($2) RETURNING *";
        const newBranchData = await pool.query(text, [address, branchId]);
        console.log(newBranchData.rows[0]);
        res.send(newBranchData.rows[0]);
    }
);

branchesRoute.delete(
    "/:branchId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { branchId } = req.params;
        const menuText = "DELETE from branches_menus where branch_id = ($1) ";
        const addonText = "DELETE from branches_addons where branch_id = ($1) ";
        const branchText = "DELETE from branches where id = ($1) ";
        await pool.query(menuText, [branchId]);
        await pool.query(addonText, [branchId]);
        const branchesResult = await pool.query(branchText, [branchId]);

        res.sendStatus(200);
    }
);
