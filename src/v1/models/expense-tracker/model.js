const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categories_model = new Schema({
   type: { type: String, default: 'Investment' },
   color: { type: String, default: '#fcbe44' },
});

const transaction_model = new Schema({
   type: { type: String, default: 'Investment' },
   name: { type: String, default: 'Anonymous' },
   amount: { type: Number, default: 0 },
   date: { type: Date, default: Date.now },
});

const Categories = mongoose.model('categories', categories_model);
const Transaction = mongoose.model('transactions', transaction_model);

exports.default = Transaction
module.exports = {
   Categories,
   Transaction
}