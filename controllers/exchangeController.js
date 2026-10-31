const Exchange = require('../models/exchangeModel');
const catchAsync = require('./../utils/catchAsync');
const ccxt = require('ccxt')
const { encrypt, fingerprint } = require('../utils/secrets')

exports.createExchange = catchAsync(async (req, res, next) => {

    const { exchange, api_key, secret_key, user } = req.body
    const exchange_converted = exchange.toString().toLowerCase()

    let connected

    // Keys saved before encryption are still matched by their plain value.
    const userApikey = await Exchange.findOne({ $or: [{ api_key_hash: fingerprint(api_key) }, { api_key }] })

    if (userApikey) {
        return res.status(400).send({ error: `The exchange is already connected` })
    }

    if (exchange_converted === 'binance') {
        connected = new ccxt.binance({ "apiKey": api_key, "secret": secret_key })
    } else if (exchange_converted === 'ftx') {
        connected = new ccxt.ftx({ "apiKey": api_key, "secret": secret_key })
    } else {
        return res.status(400).send({ error: `The exchange ${exchange} is not supported.` });
    }

    let isConnected = false
    await connected.fetchBalance().then(() => isConnected = true).catch((err) => { isConnected = false; console.log(err) })

    if (!isConnected) {
        return res.status(400).send({ "error": "The api_key or secret_key you entered did not match with the exchange records." });
    }

    await Exchange.create({
        exchange: exchange,
        user: user,
        api_key: encrypt(api_key),
        api_key_hash: fingerprint(api_key),
        api_key_hint: api_key.slice(0, 9),
        secret_key: encrypt(secret_key),
    })

    res.status(200).json({
        status: 'success',
    })
})

exports.deleteExchange = catchAsync(async (req, res, next) => {

    await Exchange.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
    })
})

