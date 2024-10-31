const fs = require('fs');
const path = require('path');

const file1Path = path.join(__dirname, 'file1.txt');
const file2Path = path.join(__dirname, 'file2.txt');

try {
    fs.copyFileSync(file1Path, file2Path);
    console.log('File copied successfully from file1.txt to file2.txt');
} catch (err) {
    console.error('Error copying file:', err);
}
