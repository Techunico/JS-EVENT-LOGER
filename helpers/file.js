import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);
const existsAsync = promisify(fs.exists);
const eventLogsDirectory = path.join(process.cwd(), 'app', 'event_logs');

export const writeEventToFile = async (eventData) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        const logPath = path.join(process.cwd(), `app/event_logs/${dateString}_event_log.txt`);
        const formattedData = `${currentDate.toISOString()}:- ${eventData}\n`;

        const fileExists = await existsAsync(logPath);

        if (fileExists) {
            await appendFileAsync(logPath, formattedData);
            console.log('Content appended to the file successfully!');
        } else {
            await writeFileAsync(logPath, formattedData);
            console.log('File created and content written successfully!');
        }
    } catch (err) {
        console.error('Error writing file:', err);
    }
};


export const readEventLogs = async () => {
    try {
        const files = await fs.promises.readdir(eventLogsDirectory);
        const logs = {};

        for (const file of files) {
            const filePath = path.join(eventLogsDirectory, file);
            const stat = await fs.promises.stat(filePath);
            if (stat.isFile()) {
                const datePart = file.split('_')[0]; // Extract date from file name
                const fileContent = await fs.promises.readFile(filePath, 'utf-8');
                const lines = fileContent.split('\n').filter(line => line.trim() !== '');
                const logObject = {};

                lines.forEach(line => {
                    const [date, content] = line.split(':-').map(item => item.trim());
                    logObject[date] = content;
                });

                logs[datePart] = logObject;
            }
        }

        return logs;
    } catch (err) {
        console.error('Error reading event logs:', err);
        return {};
    }
};

