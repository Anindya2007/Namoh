import {prisma} from '../db';
import {genSalt,hash,compare} from 'bcrypt';
import {sign} from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

//=================================== USER REGISTRATION =================================
export const createUser= async (
    name:string,
    email:string,
    password:string
)=>{
try{

    const user= await prisma.user.findUnique({
        where:{
            email:email
        }
    });
    if (user){
        throw new Error('User already esists!!') ;
    };

    const salt= await genSalt(10);
    const password_encrypt= await hash(password,salt);
    
    const create=await prisma.user.create({
        data:{
            name:name,
            email:email,
            passwordHash:password_encrypt
        }
    });

    if (!create){
        return null
    }

    return create;
}
catch (err:unknown){
    throw err;
}
};


//=================================== USER LOGIN =================================
export const loginUser_service= async (
    email:string,
    password:string
)=>{
    //Findging the user details from the databse

    const findUser= await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if (!findUser){ // If user is not found
        throw new Error('No User exists with this credentials!!')
    };

    const verify=await compare(password,findUser.passwordHash); // comparing password

    if (!verify){
        throw new Error("Wrong login credentials!!")
    };

    const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY; //Finding the JWT_SECRET from the environment variables

    if(!JWT_SECRET_KEY){
        throw new Error("login key not found");
    }

    const token= sign({id:findUser.id},JWT_SECRET_KEY,{expiresIn:"1d"}); //Creating token for further authentication
    const {passwordHash,...user}=findUser;
    return {token:token,data:user};

}