const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            ref: 'users',
        },
        bot: {
            type: mongoose.Schema.ObjectId,
        },
        active: {
            type: Boolean
        },
        side: {
            type: String
        },
        quantity: {
            type: Number
        },
        buy_price: {
            type: Number
        },
        sell_price: {
            type: Number
        },
        open_time: {
            type: Date,
        },
        close_time: {
            type: Date
        },
        profit: {
            type: Number
        },
        percent: {
            type: Number
        }
    } 
);

module.exports = mongoose.model('orders', orderSchema)