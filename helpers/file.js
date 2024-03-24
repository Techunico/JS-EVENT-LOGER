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
        const targetDirectory = await checkAndReturnPath()
        const logPath = path.join(targetDirectory, `${dateString}_event_log.txt`)
        const formattedData = `${currentDate.toISOString()}:- ${eventData}\n`;

        const fileExists = await existsAsync(logPath);

        if (fileExists) {
            await appendFileAsync(logPath, formattedData);
            return { success: true, message: 'Content appended to the file successfully!' };
        } else {
            await writeFileAsync(logPath, formattedData);
            return { success: true, message: 'File created and content written successfully!' };
        }
    } catch (err) {
        console.error('Error writing file:', err);
        return { success: false, error: err.message }
    }
};

export const readEventLogs = async (startDate, endDate) => {
    try {
        const files = await fs.promises.readdir(eventLogsDirectory);
        const logs = {};

        for (const file of files) {
            const filePath = path.join(eventLogsDirectory, file);
            const stat = await fs.promises.stat(filePath);

            if (stat.isFile()) {
                const datePart = file.split('_')[0];
                const fileDate = new Date(datePart);

                // Check if the file date falls within the specified range
                if (fileDate >= startDate && fileDate <= endDate) {
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
        }

        return { success: true, logs: logs };
    } catch (err) {
        console.error('Error reading event logs:', err);
        return { success: false, error: err.message };
    }
};

const checkAndReturnPath = async () => {
    const filePath = path.join(process.cwd(), 'event_logger_config.json');

    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const eventLoggerConfig = JSON.parse(data);
        const targetPath = eventLoggerConfig.filePath || path.join(process.cwd(), 'event_logs');

        try {
            const exists = await fs.promises.access(targetPath, fs.constants.F_OK);
            if (!exists) {
                await fs.promises.mkdir(targetPath, { recursive: true });
                console.log('Directory created successfully!');
            } else {
                console.log('Directory already exists.');
            }
            return targetPath;
        } catch (err) {
            console.error('Error creating or accessing directory:', err);
            throw err;
        }
    } catch (error) {
        console.error('Error loading JSON file:', error);
        throw error;
    }
};
