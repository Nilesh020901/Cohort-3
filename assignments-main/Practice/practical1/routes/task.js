const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/task');
const router = express.Router();

//create

router.post("/task", auth, async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title, user: req.user._id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
});

router.get("/task", auth, async (req, res) => {
    try {
        const tasks = await task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
});

router.get("/task/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
});

router.put("/task/:id", auth, async (req, res) => {
    try {
        const task = await task.findOne({ _id: req.params.id, user: req.user._id });
        if(!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = req.body.title;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
});

router.delete("/task/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.remove();
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
});

module.exports = router;