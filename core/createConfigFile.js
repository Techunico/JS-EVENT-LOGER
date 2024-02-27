import { config } from './config.js'
import { fileURLToPath } from 'url';
import path from 'path';
import fs, { mkdir } from 'fs'

const rootDirectory = process.cwd()
const eventLogsDirectory = path.join(rootDirectory, 'app', 'event_logs');
const args = process.argv.slice(2)
let configs = ''
args.map(arg => {
    switch (arg) {
        case 'file':
            configs = config.file
            fs.mkdir(eventLogsDirectory, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating directory:', err);
                } else {
                    console.log('Event logs directory created successfully!');
                }
            });
            break
        case 'firebase':
            configs = config.firebase
            break
        case 'mongodb':
            configs = config.mongodb
            break
        default:
            configs = config.file
            break
    }
})


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

