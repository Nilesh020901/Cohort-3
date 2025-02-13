const express = require ("express");
const app = express();
app.use(express.json());

app.post("/user/sigup", async (req, res) => {
    
})

app.post("/user/signin", async (req, res) => {
    
})

app.get("user/purchase", async (req, res) => {

})

app.post("/course/purchase", async (req, res) => {
    
})

app.get("/courses", async (req, res) => {
    
})

app.listen(3000)