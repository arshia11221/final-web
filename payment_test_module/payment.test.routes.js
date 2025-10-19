// payment_test_module/payment.test.routes.js
const express = require('express');
const router = express.Router();
const { checkout, verify } = require('./payment.test.controller');

// ساخت تراکنش تستی
router.post('/checkout', checkout);

// تایید تراکنش تستی
router.get('/verify', verify);

module.exports = router;
