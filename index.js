require('dotenv').config()
require('./mongo')

const cors = require('cors')
const express = require('express')
const app = express()
const User = require('./models/User')
const Entry = require('./models/Entry')

app.use(express.json())
app.use(cors())

app.get('/api/users', (request, response) => {
    User.find({}).populate('entries').then(users => {
        response.json(users)
    })
})

app.get('/api/users/:id', (request, response) => {
    const { id } = request.params

    User.findById(id).then(user => {
        if (user) {
            response.json(user)
        }
        else {
            response.status(404).end()
        }
    })
})

app.post('/api/users', (request, response) => {
    const user = request.body

    const newUser = new User({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        photo: user.photo || ""
    })

    newUser.save().then(savedUser => {
        response.json(savedUser)
    })

})

app.post('/api/entry', (request, response, next) => {
    const entry = request.body

    if (entry.user_id) {
        User.findById(entry.user_id).populate('entries').then(user => {
            console.log(user)
            const newEntry = new Entry({
                user_id: user.id,
                start_date: new Date().toISOString()
            })

            newEntry.save().then(savedEntry => {

                user.entries = user.entries.concat(savedEntry)
                user.save()

                response.json(user)
            })
        })
        .catch(err => next(err))
    }
    else {
        response.status(400).end()
    }
})

app.use((error, request, response, next) => {
    console.log(error.name)
    response.status(400).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})