import { config } from './config.js'
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'

const args = process.argv.slice(2);
let configs = config
const rootDirectory = process.cwd();


const filePath = `${rootDirectory}/event_logger_config.json`;
const fileContent = JSON.stringify(configs, null, 2);

// Write content to file
fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File created and content written successfully!');
    }
});

