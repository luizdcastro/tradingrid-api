const User = require('../models/userModel')
const catchAsync = require('./../utils/catchAsync')

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)
        .populate('exchanges', '-secret_key')
        .populate('bots')
        .populate('orders')

    res.status(200).json({
        status: 'success',
        data: user
    })
}) 