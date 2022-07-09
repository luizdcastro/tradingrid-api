const mongoose = require('mongoose')
const Order = require('../models/orderModel')

const botSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        user: {
            type: String,
            ref: 'users',
            required: true
        },
        active: {
            type: Boolean
        },
        completed: {
            type: Boolean,
        },
        growth: {
            type: Number,
            default: 0
        },
        profit: {
            type: Number,
            default: 0
        },
        settings: {
            type: Object,
        },
        open_logic: {
            type: Array
        },
        close_logic: {
            type: Array
        },
        events: {
            type: Array,
        },
        createdAt: {
            type: Date,
        }
    },
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        },
        toObject: { virtuals: true },
        versionKey: false
    }
)

botSchema.virtual('orders', {
    ref: 'orders',
    foreignField: 'bot',
    localField: '_id'
})

module.exports = mongoose.model('bots', botSchema)