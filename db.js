// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product_transactions', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
    productId: String,
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    category: String,
    sold: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };
