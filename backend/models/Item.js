const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiry_date: { type: Date, required: false },
    threshold_limit: { type: Number, required: false }
});

module.exports = mongoose.model("Item", ItemSchema);