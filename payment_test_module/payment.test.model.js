// payment_test_module/payment.test.model.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  userId: { type: String },
  status: { type: String, enum: ['processing', 'paid', 'failed'], default: 'processing' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
