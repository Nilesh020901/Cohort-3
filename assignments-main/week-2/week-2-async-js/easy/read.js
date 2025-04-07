const fs = require('fs');

fs.readFile('a.txt', 'utf-8', (err, data) => {
    if(err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File Contents:\n", data);
});

function expensiveOperation() {
    console.log("Starting expensive operation...");
    let sum = 0;
    for(let i=0; i<1e8; i++) {
        sum += i;
    }
    console.log("Expensive operation completed. Sum:", sum);
}

function expensiveOperation2() {
    console.log("Starting expensive operation...");
    let sum = 0;
    for(let i=0; i<1e8; i++) {
        sum += i;
    }
    console.log("Expensive operation completed. Sum:", sum);
}

function expensiveOperation3() {
    console.log("Starting expensive operation...");
    let sum = 0;
    for(let i=0; i<1e8; i++) {
        sum += i;
    }
    console.log("Expensive operation completed. Sum:", sum);
}

function expensiveOperation4() {
    console.log("Starting expensive operation...");
    let sum = 0;
    for(let i=0; i<1e8; i++) {
        sum += i;
    }
    console.log("Expensive operation completed. Sum:", sum);
}

function expensiveOperation5() {
    console.log("Starting expensive operation...");
    let sum = 0;
    for(let i=0; i<1e8; i++) {
        sum += i;
    }
    console.log("Expensive operation completed. Sum:", sum);
}

function expensiveOperation6() {
    console.log("Starting expensive operation...");
    let sum = 0;
    for(let i=0; i<1e8; i++) {
        sum += i;
    }
    console.log("Expensive operation completed. Sum:", sum);
}

expensiveOperation();
expensiveOperation2();
expensiveOperation3();
expensiveOperation4();
expensiveOperation5();
expensiveOperation6();