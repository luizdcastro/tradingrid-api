const Bot = require('../models/botModel')
const catchAsync = require('../utils/catchAsync')

exports.createBot = catchAsync(async (req, res, next) => {

    const { user, name, settings, open_logic, close_logic } = req.body

    const bot = await Bot.create({
        user: user,
        name: name,
        active: true,
        settings: settings,
        open_logic: open_logic,
        close_logic: close_logic,
        createdAt: new Date().toISOString()
    });

    res.status(201).json({
        status: 'success',
        data: bot
    });
})

exports.getBot = catchAsync(async (req, res, next) => {
    const bot = await Bot.findById(req.params.id)
        .populate('orders')
    res.status(200).json({
        status: 'success',
        data: bot
    })
})


exports.deleteBot = catchAsync(async (req, res, next) => {

    await Bot.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
    })
})

exports.updateBot = catchAsync(async (req, res, next) => {

    console.log(req.body)

    await Bot.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        status: 'success',
    })
})

