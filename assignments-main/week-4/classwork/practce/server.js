const express = require("express");

function calculateSum(n) {
    let sum = 0;
    for(let i = 0; i < n;i++) {
        sum += i;
    }
    return sum;
}

const app = express();

app.get("/sum/:num", (req, res) => {
    const num = req.params.num;
    const sum = calculateSum(num);
    res.send(`The sum of numbers from 0 to ${num} is ${sum}`);
})

app.listen(3000);