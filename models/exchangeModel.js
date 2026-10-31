const mongoose = require('mongoose')

const exchangeSchema = new mongoose.Schema(
    {
        exchange: {
            type: String,
            required: true
        },       
        api_key: {
            type: String,
            required: true
        },
        secret_key: {
            type: String,
            required: true
        },
        user: {
            type: String,
            ref: 'users',
            required: true
        },
        // Encrypted credentials can't be searched or shown: the hash finds a key already connected, and the hint is
        // what the app displays (its first characters).
        api_key_hash: {
            type: String,
            index: true
        },
        api_key_hint: {
            type: String
        },
    },
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id
                delete ret._id
                // Never send credentials back: the app only shows the start of the API key.
                if (ret.api_key_hint) ret.api_key = ret.api_key_hint
                delete ret.api_key_hint
                delete ret.api_key_hash
                delete ret.secret_key
            }
        },
        toObject: { virtuals: true },
        versionKey: false
    }
)

module.exports = mongoose.model('exchanges', exchangeSchema)