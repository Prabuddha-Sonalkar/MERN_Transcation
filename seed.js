// seed.js
const axios = require('axios');
const { Transaction } = require('./db');

const seedDatabase = async () => {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.insertMany(transactions);
    console.log('Database seeded!');
};

seedDatabase();
