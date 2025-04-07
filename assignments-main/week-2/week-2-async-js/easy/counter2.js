let counter = 0;

function updateCounter() {
    counter++;
    console.log(counter);
}

setTimeout(updateCounter, 1000); // This will only run once after 1 second
setTimeout(updateCounter, 2000); // This will only run once after 2 seconds