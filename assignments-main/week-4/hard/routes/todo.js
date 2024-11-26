const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();
let todos = []; // Temporary in-memory storage
let idCounter = 1; // Simple counter for unique IDs

// todo Routes
router.post('/', (req, res) => {
    // Implement todo creation logic
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({error: "Task text is required"});
    }

    const newTodo = { id: idCounter++, text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

router.put('/', adminMiddleware, (req, res) => {
    // Implement update todo  logic
    const { id } = req.params;
    const { text, completed } = req.body;

    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (text !== undefined) {
        todo.text = text;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

router.delete('/', adminMiddleware, (req, res) => {
    // Implement delete todo logic
    todos = [];
    res.json({ message: "All todos deleted" });
});

router.delete('/:id', adminMiddleware, (req, res) => {
    // Implement delete todo by id logic
    const { id } = req.params;
    const todoIndex = todos.findIndex((t)=>t.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).json({error: "Todo not found"});
    }

    const deleteTodo = todos.splice(todoIndex, 1)[0];
    res.json(deleteTodo);
});


router.get('/', adminMiddleware, (req, res) => {
    // Implement fetching all todo logic
    res.json(todos);
});

router.get('/:id', adminMiddleware, (req, res) => {
    // Implement fetching todo by id logic
    const { id } = req.params;
    const todo = todos.find((t)=>t.id === parseInt(id));

    if(!todo) {
        res.json({error: "Todo not found"});
    }

    res.json(todo);
});

module.exports = router;