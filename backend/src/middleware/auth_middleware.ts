import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRole } from '../../generated/prisma/enums.js';
import dotenv from 'dotenv';
dotenv.config();

export const verify_login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

        if (!JWT_SECRET_KEY) {
            return res.status(500).json({ message: "Secret key not found" });
        }

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "User is not authenticated!!" });
        }

        let verifiedUser: any;

        try {
            verifiedUser = verify(token, JWT_SECRET_KEY);
            
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token!!" });
        }

        if (!verifiedUser || typeof verifiedUser === 'string' || typeof verifiedUser.id !== "number") {
            return res.status(401).json({ message: "User is not authenticated!!" });
        }

        const role = verifiedUser.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.USER;

        req.auth = {
            id: verifiedUser.id,
            role: role
        };

        next();
    } catch (err) {
        return res.status(500).json({ message: "Internal authentication error" });
    }
};
