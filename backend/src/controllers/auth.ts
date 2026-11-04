import { Request, Response } from 'express';
import { register_validator, login_validator } from '../validators/auth_validator.js';
import { createUser, loginUser_service } from '../service/auth.js';

//=================================== USER REGISTRATION =================================
export const registerUser = async (req: Request, res: Response) => {
    try {
        const user_data = register_validator.safeParse(req.body);

        if (!user_data.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!!",
                errors: user_data.error.format()
            });
        }

        const { name, email, password } = user_data.data;
        const create = await createUser(name, email, password);

        if (!create) {
            return res.status(400).json({
                success: false,
                message: "User can't be created"
            });
        }

        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });

    } catch (err) {
        if (err instanceof Error) {
            const isDuplicate = err.message.toLowerCase().includes('already');
            return res.status(isDuplicate ? 409 : 400).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
};

//=================================== USER LOGIN =================================
export const loginUser = async (req: Request, res: Response) => {
    try {
        const check = login_validator.safeParse(req.body);

        if (!check.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!!",
                errors: check.error.format()
            });
        }

        const { email, password } = check.data;

        const login_user = await loginUser_service(email, password);

        if (!login_user) {
            throw new Error("User can't be logged in try again!!");
        }

        const isProduction = process.env.NODE_ENV === "production";

        // Setting the HTTP-only cookie for 1 day (86,400,000 ms)
        res.cookie("token", login_user.token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user_data: login_user.data
        });

    } catch (err) {
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
};

//=================================== USER LOGOUT =================================
export const logoutUser = async (req: Request, res: Response) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";

        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong during logout"
        });
    }
};
