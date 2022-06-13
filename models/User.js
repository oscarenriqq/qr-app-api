const { model, Schema } = require('mongoose')
const Entry = require('./Entry')

const userSchema = new Schema({
    "name": String,
    "email": String,
    "phone": String,
    "gender": String,
    "photo": String,
    "entries": [{
        type: Schema.Types.ObjectId,
        ref: Entry
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model('User', userSchema)

// const userSchema = new Schema({
//     "name": String,
//     "email": String,
//     "phone": String,
//     "gender": String
// })

// const User = model('User', userSchema)

// User.find({})
//     .then(result => {
//         console.log(result)
//     })

// const user = new User({
//     "name": "Cristiano Ronaldo",
//     "email": "thebest@cr7.com",
//     "phone": "1234567890",
//     "gender": "M"
// })

// user.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.log(err)
//     })


module.exports = User