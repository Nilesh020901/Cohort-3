const express = require("express");
const teamRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Team = require("../models/Team");
const User = require("../models/User");

teamRouter.post("/create", authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingTeam = await Team.findOne({ name });

        if (existingTeam) {
            return res.status(400).json({ message: 'Team already exists' });
        }

        const team = new Team({
            name,
            description,
            owner: req.user.userId,
            members: [req.user.userId]
        });
        await team.save();

        res.status(201).json({ message: "Team created successfully", team });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});

teamRouter.post()