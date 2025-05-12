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

teamRouter.post("/join/:teamId", authMiddleware, async (req, res) => {
    try {
        const { teamId } = req.params;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        if (team.members.includes(req.user.userId)) {
            return res.status(400).json({ message: "Already a member" });
        }

        team.members.push(req.user.userId);
        await team.save();
        res.status(201).json({ message: "Joined the team", team });
    } catch (error) {
        res.status(500).json({ error: 'Failed to join team' });
    }
});

teamRouter.get("/my-teams", authMiddleware, async (req, res) => {
    try {
        const teams = await Team.find({ members: req.user.userId }).populate("members", "username email");
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get teams' });
    }
});

teamRouter.put("/update/:teamId", authMiddleware, async (req, res) => {
    try {
        const { teamId } = req.params;
        const { name, description } = req.body;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        if (team.owner.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Only the owner can update the team' });
        }

        team.name = name || team.name;
        team.description = description || team.description;
        await team.save();
        res.status(201).json({ message: "Team updated", team });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get teams' });
    }
});

module.exports = teamRouter;