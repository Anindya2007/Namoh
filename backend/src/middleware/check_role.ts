import {Request,Response,NextFunction} from 'express';
import {UserRole} from "../../generated/prisma/enums";

export default function checkRole (req:Request , res:Response , next:NextFunction){
    const role=req.auth?.role;

    if (role===UserRole.ADMIN){
        next();
    }
    else{
        return res.status(403).json({
            message:"You are not authorized to perform this action"
        });
    }
}