const fs = require('fs');

function cleanFile(filePath) {
  //read
  fs.readFile(filePath, 'utf-8', (err, data)=>{
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    //remove the spaces
    const cleanData = data.replace(/\s+/g, ' ').trim();

    //write
    fs.writeFile(filePath, cleanData, 'utf-8', (err, data)=>{
      if(err) {
        console.error('Error writing the file:', err);
        return
      }
      else {
        console.log('File cleaned successfully!');
      }
    });
  });
 }

 const filePath = '../easy/a.txt';
 cleanFile(filePath);