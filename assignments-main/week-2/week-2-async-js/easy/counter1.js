let counter = 0;

function incrementCounter() {
    console.log(counter);
    counter++;
}

setInterval(incrementCounter, 1000);