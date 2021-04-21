const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.use(express.json({ extended: true }))

app.use('/auth', require('./routes/auth.routes'))
app.use('/schema', require('./routes/schema.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        app.listen(PORT, () => console.log(`app has been started on port ${PORT}`))
    } catch (error) {
        console.log('Server error ', error.message)
        process.exit(1)
    }
}

start()
