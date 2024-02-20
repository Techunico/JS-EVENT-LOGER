export const config = {
    file: {
        target: "file",
        filePath: "",
        fileNamePrefix: "" //By Default we will take Date as Prefix. Ex: 20240119eventlog.txt
    },
    firebase: {
        target: "firebase",
        config: {
            apiKey: "AIzaSyCeUmPFqWNLcz41EDFzJZZAt_wxTtLPJfo",
            authDomain: "js-tute.firebaseapp.com",
            projectId: "js-tute",
            storageBucket: "js-tute.appspot.com",
            messagingSenderId: "557969571152",
            appId: "1:557969571152:web:0af17b1e4d53856fbe4055",
            measurementId: "G-TDT5QG9TM8"
        }
    },
    mongodb: {
        target: "mongodb",
        connectionString: ""
    }
}