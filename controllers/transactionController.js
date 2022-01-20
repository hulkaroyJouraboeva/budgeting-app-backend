const express = require("express");
const transactionsArray = require('../models/transactions.js');
const transactionsApp = express.Router();

transactionsApp.get('/', (_, response) => {
    transactionsArray
    ? response.json(transactionsArray)
    : response.status(404).json({ error: "cant access the data for some reason" });
});

transactionsApp.get('/:index', (request, response) => {
    const { index } = request.params;
    transactionsArray[index] 
    ? response.json(transactionsArray[index])
    : response.status(404).json({ error: `data at index: ${index} not found` });
});

transactionsApp.post('/', (request, response) => {
    transactionsArray.push(request.body);
    response.status(201).json(transactionsArray);
});

transactionsApp.put('/:index', (request, response) => {
    const { index } = request.params;

    if (transactionsArray[index]) {
        transactionsArray[index] = request.body;
        response.status(200).json(transactionsArray);
    } else {
        response.status(404).json({ 
            error: `Data at index: ${index} not found`, 
            listOfValidTransactions: transactionsArray});
    }
});

transactionsApp.delete('/:index', (request, response) => {
    // [deletedData] is destructured element of what splice returns (having *1 deleted* piece of that element)
    const { index } = request.params;
    if (transactionsArray[index]) {
        const [deletedData] = transactionsArray.splice(index, 1);
        response.status(200).json({ 
            yourDeletedData: deletedData,
            risidualData: transactionsArray
        });
    } else {
        response.status(404).json({ 
            error: `Could not delete, data at index: ${index} not found`, 
            listOfValidTransactions: transactionsArray});
    };
});

module.exports = transactionsApp;