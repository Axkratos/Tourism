import Tourist from "../models/touristModel.js"; // Importing the Tourist model
import bcrypt from "bcrypt";
import generateTokenSetCookie from "../utils/generateToken.js";

const signupTourist = async (req, res) => {
  console.log(req.body);

  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingTourist = await Tourist.findOne({ email });

    if (existingTourist) {
      return res.status(400).json({ message: "Tourist already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newTourist = new Tourist({
      fullName,
      email,
      password: hashedPassword,
    });

    await newTourist.save();

    generateTokenSetCookie(newTourist._id, res);

    res.status(200).json({
      message: "Tourist created successfully",
      _id: newTourist._id,
      fullName: newTourist.fullName,
      email: newTourist.email,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginTourist = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tourist = await Tourist.findOne({ email });
    if (!tourist) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, tourist.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateTokenSetCookie(tourist._id, res);
    res.status(200).json({
      message: "Login successful",
      _id: tourist._id,
      fullName: tourist.fullName,
      email: tourist.email,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const logoutTourist = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Tourist logout successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { signupTourist, loginTourist, logoutTourist };
