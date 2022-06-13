const { model, Schema } = require('mongoose')

const entrySchema = new Schema({
    "user_id": String,
    "start_date": String,
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Entry = model('Entry', entrySchema)

module.exports = Entry