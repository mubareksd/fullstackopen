require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', (req) =>
    req.method === 'POST' ? JSON.stringify(req.body) : ' '
)
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :data'
    )
)

const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }

    next(err)
}

app.use(errorHandler)

app.get('/api/info', (req, res) => {
    res.send('<p>Phonebook has info for 2 people</p><br /><p></p>')
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then((persons) => {
            res.json(persons)
        })
        .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then((savedPerson) => {
            res.json(savedPerson)
        })
        .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((err) => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
