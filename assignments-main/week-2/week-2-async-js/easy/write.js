const fs = require('fs');
const content = "Hello, this is a sample text written to the file!";

fs.writeFile('a.txt', content, 'utf-8', (err)=>{
    if(err) {
        console.error("Error writing to file:", err);
        return;
    }
    console.log("File has been written successfully!");
});
