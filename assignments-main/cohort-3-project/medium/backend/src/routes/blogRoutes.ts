import express from"express";

const router = express.Router();

router.post("/", (req, res) => {
    res.send("create a blog route")
});

router.put("/", (req, res) => {
    res.send("update the blog route")
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send("get blog by id")
});

router.get("/bulk", (req, res) => {
    res.send("get all blogs route")
});

export default router;

