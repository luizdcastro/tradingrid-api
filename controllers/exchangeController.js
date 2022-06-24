const Exchange = require('../models/exchangeModel');
const catchAsync = require('./../utils/catchAsync');
const ccxt = require('ccxt')

exports.createExchange = catchAsync(async (req, res, next) => {

    const { exchange, api_key, secret_key, user } = req.body
    const exchange_converted = exchange.toString().toLowerCase()

    let connected

    const userApikey = await Exchange.findOne({ api_key })

    if (userApikey || userApikey?.exchange === exchange_converted) {
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
        api_key: api_key,
        secret_key: secret_key,
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

