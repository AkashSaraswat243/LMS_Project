import User from "../models/users.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

//Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to register"
        });
    }
}

//Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        generateToken(res, user, `welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to login"
        });
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }.json({
            success: true,
            message: "Logged out successfully."
        }))
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to login"
        });
    }
}

export const getUserProfile = async(req, res) => {
    try {
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "failed to load user"
        });
}