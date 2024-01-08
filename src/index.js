const express = require('express');
const expressApp = require('./express-app.js');
const SERVER_PORT = process.env.SERVER_PORT

const { databaseConnection } = require('./database');

const StartServer = async () => {

    const app = express();
    
    await databaseConnection();

    await expressApp(app);

    app.get('/test', async (req, res) => {
        res.json({ status: true, message: "Our Backoffice app works" })
    });

    app.listen(SERVER_PORT, () => {
        console.log(`Backoffice microservice listening to port ${SERVER_PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();
