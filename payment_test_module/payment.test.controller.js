// payment_test_module/payment.test.controller.js
const Transaction = require('./payment.test.model');

exports.checkout = async (req, res) => {
  try {
    const { amount, userId, simulateResult } = req.body;
    if (!amount) return res.status(400).json({ ok: false, message: 'مبلغ الزامی است.' });

    const transaction = new Transaction({
      amount,
      userId: userId || null,
      status: 'processing'
    });
    await transaction.save();

    // شبیه‌سازی نتیجه
    let status = 'OK';
    if (simulateResult === 'fail') status = 'FAILED';
    else if (simulateResult === 'random') status = Math.random() > 0.5 ? 'OK' : 'FAILED';

    res.json({
      ok: true,
      status: transaction.status,
      transactionId: transaction._id,
      redirectUrl: `/verify.html?status=${status}&tid=${transaction._id}`
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'خطا در ایجاد تراکنش تستی' });
  }
};

exports.verify = async (req, res) => {
  try {
    const { tid, status } = req.query;
    if (!tid) return res.status(400).json({ ok: false, message: 'شناسه تراکنش الزامی است.' });

    const transaction = await Transaction.findById(tid);
    if (!transaction) return res.status(404).json({ ok: false, message: 'تراکنش یافت نشد.' });

    if (status === 'OK') {
      transaction.status = 'paid';
      await transaction.save();
      return res.json({ ok: true, message: 'پرداخت موفق بود.', transaction });
    } else {
      transaction.status = 'failed';
      await transaction.save();
      return res.json({ ok: false, message: 'پرداخت ناموفق بود.', transaction });
    }
  } catch (err) {
    res.status(500).json({ ok: false, message: 'خطا در تایید تراکنش تستی' });
  }
};
