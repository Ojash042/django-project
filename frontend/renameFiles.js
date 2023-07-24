const fs = require('fs');
const path = require('path');

const buildFolder = path.join(__dirname, 'build', 'static', 'js');
const filePrefix = 'main'; // Adjust the filename prefix as needed

fs.readdirSync(buildFolder)
    .filter((file) => file.startsWith(filePrefix))
    .forEach((file) => {
        const originalPath = path.join(buildFolder, file);
        const newPath = path.join(buildFolder, `${filePrefix}.js`);
        fs.renameSync(originalPath, newPath);
    });
