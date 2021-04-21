const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: 'users',
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    links: {
        type: Object,
        required: true,
    },
    nodes: {
        type: Object,
        required: true,
    }
})

module.exports = model('Chart', schema)
