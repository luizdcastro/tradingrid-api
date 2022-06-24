
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.auth = catchAsync(async (req, res, next) => {
    const wallet = req.params.wallet

    let user = await User.findById(wallet)

    if (user == null) {
        user = await User.create({ _id: wallet })
    }

    res.status(200).json({
        status: 'success',
        id: user._id
    })
})