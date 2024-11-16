let counter = 0

function incrementCounter() {
    console.log(counter);
    counter++;

    setTimeout(incrementCounter, 1000);
}