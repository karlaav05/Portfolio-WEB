const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'secret.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('Secret Message:', data);
});
