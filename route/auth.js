import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.KEY;
const router = express.Router();

const users = [
    { name: "Mohamed", password: "abdul@123" },
    { name: "vinith", password: "123" },
    { name: "tamil", password: "1234" },
    { name: "tiles", password: "12345" },
];


router.post("/login", (req, res) => {
    const { name, password } = req.body;
    const user = users.find(u => u.name === name && u.password === password);

    if (user) {
        const token = jwt.sign({ name }, key, { expiresIn: "1h" });
        return res.json({ message: "Successfully logged in", token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

router.get("/profile", (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token, key, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid or expired token" });
        res.json({ message: "Welcome to your profile", user: decoded });
    });
});

router.put("/update", (req, res) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ message: "Token required" });
    }

    jwt.verify(authHeader, key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.json({
            message: "Profile updated successfully",
            user: decoded,
        });
    });
});


router.delete("/delete", (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token, key, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid or expired token" });
        res.json({ message: "Profile deleted successfully", user: decoded });
    });
});

export default router;
