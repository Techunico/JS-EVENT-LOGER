import { compareNestedStructures } from './functions/compare.js'
import path from 'path';
import fs from 'fs'
import { writeEventToFile, readEventLogs } from './helpers/file.js'

export const recordEvent = async () => {
    // let oldData = data.oldData
    // let newData = data.newData
    // let action = data.action
    // let performedBy = data.performedBy
    // let module = data.module

    // const diffrence = compareNestedStructures(oldData, newData)
    // Call the function to load the configuration
    const eventLoggerConfig = await loadEventLoggerConfig();

    switch (eventLoggerConfig.target) {
        case 'file':
            writeEventToFile('this is test data 1')
            const data = await readEventLogs()
            console.log(data)
            break
        default:
            break
    }


}



const loadEventLoggerConfig = async () => {
    const filePath = path.join(process.cwd(), 'event_logger_config.json');
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const eventLoggerConfig = JSON.parse(data);
        return eventLoggerConfig
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

recordEvent()