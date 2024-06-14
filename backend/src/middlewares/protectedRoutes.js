const protectedRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(404).json({ message: "Token not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("this is the decoded",decoded)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { protectedRoutes };
