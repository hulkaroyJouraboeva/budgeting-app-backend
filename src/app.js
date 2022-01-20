const express = require('express');
const cors = require('cors');
const transactionController = require('../controllers/transactionController.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, response) => {
    response.send('Welcome to your Budgeting App!');
})

app.use('/transactions', transactionController);

app.get('*', (_, response) => {
    response
        .status(404)
        .json({ error: "Page not found" });
})

module.exports = app;