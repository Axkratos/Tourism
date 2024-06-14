import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import generateTokenSetCookie from "../utils/generateToken.js";

const signupUser = async (req, res) => {
    console.log(req.body);

    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        generateTokenSetCookie(newUser._id, res);
        await newUser.save();

        res.status(200).json({
            message: "User created successfully",
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateTokenSetCookie(user._id, res);
        res.status(200).json({
            message: "Login successful",
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "User logout successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { signupUser, loginUser, logoutUser };
