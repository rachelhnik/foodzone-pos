import { pool } from "../../db/db";
import express, { Request, Response, Router } from "express";
import { checkAuth } from "../auth/auth";
export const settingsRoute = express.Router();

settingsRoute.put(
    "/companies/:companyId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { name } = req.body;
        const companyId = req.params.companyId;
        const text = "UPDATE companies SET name=$1  WHERE id =($2) RETURNING *";
        const updatedCompany = await pool.query(text, [name, companyId]);
        res.send(updatedCompany.rows[0]);
    }
);

settingsRoute.put(
    "/users/:userId",
    checkAuth,
    async (req: Request, res: Response) => {
        const { email } = req.body;
        const { userId } = req.params;
        const text = "UPDATE users SET email=$1  WHERE id =($2) RETURNING *";
        const updatedUserEmail = await pool.query(text, [email, userId]);
        res.send(updatedUserEmail.rows[0]);
    }
);
