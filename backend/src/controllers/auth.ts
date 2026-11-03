import {Request,Response} from 'express';
import { register_validator,login_validator } from '../validators/auth_validator';
import {createUser,loginUser_service} from '../service/auth';

//=================================== USER REGISTRATION =================================
export const registerUser = async (req:Request,res:Response)=>{
    try{
        const user_data=await register_validator.safeParse(req.body);

        if (!user_data.success){
            return res.status(400).json({message:"Invalid data provided!!"});
        };
        
        const {name,email,password}= user_data.data;
        const create= await createUser(name,email,password);

        if (!create){
            return res.status(400).json({message:"User can't be created"});
        }
        
        return res.status(200).json({message:'USer created successfully'});

    }
    catch (err) {
    if (err instanceof Error) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
}
}


//=================================== USER LOGIN =================================
export const loginUser = async(req:Request,res:Response)=>{
    try{
        const check = login_validator.safeParse(req.body);
        
        if (!check.success){
            return res.status(400).json({message:"Invalid data provided!!"})
        }

        const{email,password}=check.data;

        const login_user= await loginUser_service(email,password);

        if (!login_user){
            throw new Error("User can't be logged in try again!!")
        };
        //Setting the cookie with the user data.
        res.cookie("token",login_user.token,{httpOnly:true,secure:true,sameSite:"none",maxAge:86400});

        return res.status(200).json({message:'User logged in successfully',user_data:login_user.data});

    }
    catch (err) {
    if (err instanceof Error) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: "Something went wrong!"
    });
};  
};