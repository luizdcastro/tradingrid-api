const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const cluster = require('cluster')
const os = require('os')

//Middleware
const numCpu = os.cpus().length
app.use(express.json())
app.use(helmet())
app.use(cors())

//Import Routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const exchangeRoutes = require('./routes/exchangeRoutes')
const botRoutes = require('./routes/botRoutes')

//Connect to DB
dotenv.config({ path: './config.env' })

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.log(err.message))

//Route Middlewares
app.use('/v1/auth', authRoutes)
app.use('/v1/user', userRoutes)
app.use('/v1/exchange', exchangeRoutes)
app.use('/v1/bot', botRoutes)

if (cluster.isMaster) {
    for (let i = 0; i < numCpu; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    const port = 8000
    app.listen(process.env.PORT || port, () =>
        console.log(`Running ${process.pid} on port ${port}`)
    )
}