import express from 'express';

const router = express.Router();

//create a blog
router.post("/", (req, res) => {
    res.send("Blog created");
});

//update a blog
router.put("/", (req, res) => {
    res.send("Blog updated");
});

//get a single blog
router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send("Blog fetched");
});

//get all blogs
router.get("/bulk", (req, res) => {
    res.send("All blogs fetched");
});

export default router;

