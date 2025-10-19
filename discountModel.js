const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true, // کدها به حروف بزرگ تبدیل می‌شوند
  },
  discountType: {
    type: String,
    required: true,
    enum: ['percent', 'fixed'], // نوع تخفیf: درصدی یا مبلغ ثابت
  },
  value: {
    type: Number,
    required: true, // مقدار تخفیf (مثلا 20 برای درصد یا 50000 برای مبلغ ثابت)
  },
  isActive: {
    type: Boolean,
    default: true, // آیا این کد فعال است؟
  },
  expiresAt: {
    type: Date,
    required: false, // تاریخ انقضا (اختیاری)
  },
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);
