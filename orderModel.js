const mongoose = require("mongoose");

const productInOrderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: false }
}, { _id: false });

const shippingInfoSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String },
    notes: { type: String }
}, { _id: false });

const discountAppliedSchema = new mongoose.Schema({
    code: { type: String, required: true },
    amount: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderId: { 
        type: String, 
        required: true, 
        unique: true,
        default: () => `HP-${Date.now()}`
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    shippingInfo: { type: shippingInfoSchema, required: true },
    products: [productInOrderSchema],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    discount: { type: discountAppliedSchema },
    amount: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ["در انتظار پرداخت", "پرداخت شده", "ناموفق", "لغو شده"],
        default: "در انتظار پرداخت"
    },
    status: {
        type: String,
        enum: ["در حال پردازش", "ارسال شده", "تحویل داده شده", "لغو شده"],
        default: "در حال پردازش"
    },
    paymentAuthority: { type: String },
    paymentRefId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);