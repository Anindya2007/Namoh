import {Request,Response,NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verify_login= async (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY){
        return res.status(500).json({message:"Secret key not found"});
    };
    const token=req.cookies?.token;
    
    if (!token){
        return res.status(401).json({message:"User is not authenticated!!"});
    };
    
    const verifiedUser= verify(token,JWT_SECRET_KEY);
    
    if (!verifiedUser || typeof verifiedUser === 'string' || typeof verifiedUser.id !== "number"){
        return res.status(401).json({message:"User is not authenticated!!"})
    };

    req.auth={
        id:verifiedUser.id,
    };
    next();
}