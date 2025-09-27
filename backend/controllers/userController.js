
import userModel from "../models/userModel.js";  // Fixed import name

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET); // Removed trailing comma and expiresIn
};

// Login User - Fixed all references from UserModel to userModel
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide both email and password" 
            });
        }

        const user = await userModel.findOne({ email });  // Fixed model reference

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist"
            });


            
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(user._id);
        return res.status(200).json({
            success: true,
            token,
            user: {  // Added user data in response
                id: user._id,
                name: user.name,
                email: user.email
            },
            message: "Login successful"
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"  // More detailed error
        });
    }
}

// Register User - Fixed all references from unserModel to userModel
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    
    try {
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const exists = await userModel.findOne({email});
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        
        return res.status(201).json({
            success: true,
            token,
            user: {  // Added user data in response
                id: user._id,
                name: user.name,
                email: user.email
            },
            message: "Registration successful"
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Registration failed"
        });
    }
}

export { loginUser, registerUser };