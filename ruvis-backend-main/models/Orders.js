const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    serveId: { type: mongoose.Schema.Types.ObjectId, ref: "Serve" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    additives: { type: Array },
    instructions: {type: String, default: ''},
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    orderTotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    deliveryAddress: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Address", 
        required: true 
    },
    shopAddress: {type: String, required: true},
    paymentMethod: { type: String },
    paymentStatus: { type: String, default: "Pending", enum: ["Pending", "Completed", "Failed"] },
    orderStatus: { type: String, default: "Placed", enum: ["Placed", "Preparing", "Out for Delivery", "Delivered"] },
    orderDate: { type: Date, default: Date.now },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop"},
    shopCoords: [Number],
    recipientCoords: [Number],
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    rating: { type: Number, min: 1, max: 5 },
    feedback: String,
    promoCode: String,
    discountAmount: Number,
    notes: String
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);