import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) res.status(401).send("invalid request");
    if (accessToken) {
        try {
            const user = jwt.verify(accessToken, config.jwtSecret);
            // @ts-ignore
            req["email"] = user.email;

            next();
        } catch (error) {
            res.sendStatus(401);
        }
    }
};
