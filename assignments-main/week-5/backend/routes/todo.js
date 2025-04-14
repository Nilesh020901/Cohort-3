//  start writing your code from here
const express = require("express");
const router = express.Router();
const { Todo } = require("../db/index");
const { authenticateJwt } = require("../middleware/user");

router.use(authenticateJwt);


router.post("/", async (req, res) => {
    const createPayload = req.body;
    console.log(req.userId);

    if (!createPayload.title) {
        return res.status(400).json({ message: "You sent the wrong inputs" });
    }

    try {
        const newTodo = await Todo.create({
            title: createPayload.title,
            completed: false,
            userId: req.userId, // Use the authenticated user's ID
        })
        res.status(200).json({ message: "Todo created", todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error: error.message });

    }
})

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.status(200).json({ todos: todos });

    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error: error.message });
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatePayload = req.body;
    // Basic input check
    if (typeof updatePayload.completed === "undefined") {
        return res.status(400).json({ message: "You must provide a completed status." });
    }
    try {
        const result = await Todo.updateOne(
            { _id: id, userId: req.userId }, // Ensure the user is authorized to update this todo
            { completed: updatePayload.completed },
        );
        if (result.nModified === 0) {
            return res.status(404).json({ message: "Todo not found or already updated" });
        }
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ 
            msg: "Error updating todo.",
            error: error.message, 
        });
    }
});

module.exports = router;