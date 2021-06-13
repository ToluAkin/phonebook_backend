require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Persons = require('./models/persons')
morgan.token('body', function (req) { return JSON.stringify(req.body) })

// to use and allow for requests from all origins
app.use(cors())

// setup request body for JSON parsing
app.use(express.json())

// setup morgan for http request logging
app.use(morgan('dev'))

// serve static files like html
app.use(express.static('build'))

// get all persons
app.get('/api/persons', (req, res, next) => {
    Persons.find({})
        .then(result => {
            return res.json(result.toJSON())
        })
        .catch(error => next(error))
})

//Display a page
app.get('/info', (req, res, next) => {
    Persons.find({})
        .then(persons => {
            const text = `<div><p>Phonebook info has ${persons.length} people</p>
                    <p>${new Date}</p></div>`
            res.send(text)
        })
        .catch(error => next(error))
})

//get person by id
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Persons.findById(id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

// update person by id
app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    Persons.findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

//delete by id
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Persons.findByIdAndRemove(id)
        // eslint-disable-next-line no-unused-vars
        .then(result => {
            res.status(204).end()
        })
        .catch (error => next(error))
})

//add person to the phonebook
app.post('/api/persons', (req, res, next) => {
    let content = req.body

    if (content.name === '' || content.number === '') {
        res.json({ error: 'content is missing' }).status(400)
    } else {
        Persons.find({ name: content.name })
            .then(existingPerson => {
                if (existingPerson.length) {
                    const id = existingPerson[0].id
                    //update person
                    Persons.findByIdAndUpdate(id, content, { new: true })
                        .then(updatedPerson => {
                            res.json(updatedPerson)
                        })
                        .catch(error => next(error))
                } else {
                    const person = new Persons({
                        'identifier': Math.floor(Math.random() * 10000),
                        'name': content.name,
                        'number': content.number
                    })
                    person.save()
                        .then(savedPerson => savedPerson.toJSON())
                        .then(savedAndFormatted => {
                            res.json(savedAndFormatted)
                        })
                        .catch(error => next(error))
                }
            })
            .catch(error => next(error))
    }
})


/**
 * checks if the error is a CastError exception
 * @param {*} error
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns
 */
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

//Setting a port for the application
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
