import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import generateTokenSetCookie from "../utils/generateToken.js";

const signupUser = async (req, res) => {
    console.log(req.body);

    try {
        const { name, email, password, confirmPassword, accountType, places, specialty, price, phone, document } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (accountType === 'tourist') {
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: "All fields are required" });
            }
        } else if (accountType === 'guide') {
            if (!name || !email || !password || !confirmPassword || !places || !specialty || !price || !phone || !document) {
                return res.status(400).json({ message: "All fields are required" });
            }
        } else {
            return res.status(400).json({ message: "Invalid account type" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            accountType,
            places: accountType === 'guide' ? places : [],
            specialty: accountType === 'guide' ? specialty : '',
            price: accountType === 'guide' ? price : 0,
            phone: accountType === 'guide' ? phone : null,
            document: accountType === 'guide' ? document : ''
        });

        generateTokenSetCookie(newUser._id, res);
        await newUser.save();

        res.status(200).json({
            message: "User created successfully",
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            accountType: newUser.accountType,
            places: newUser.places,
            specialty: newUser.specialty,
            price: newUser.price,
            phone: newUser.phone,
            document: newUser.document
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
            name: user.name,
            email: user.email,
            accountType: user.accountType,
            places: user.places,
            specialty: user.specialty,
            price: user.price,
            phone: user.phone,
            document: user.document,
            token: user.token
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
