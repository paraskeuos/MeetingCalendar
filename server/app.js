const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PATCH, DELETE'
        );

        return res.status(200).json();
    }

    next();
});

app.use((req, res, next) => {
    const error = new Error('Zahtev nije podrzan od strane servera');
    error.status = 405;

    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        error: {
            message: error.message,
            status: statusCode,
            stack: error.stack
        }
    });
});

module.exports = app;
