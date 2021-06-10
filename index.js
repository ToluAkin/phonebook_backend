require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/persons')

// to use and allow for requests from all origins
app.use(cors())

// setup request body for JSON parsing
app.use(express.json())

// setup morgan for http request logging
app.use(morgan('dev'))

// serve static files like html
app.use(express.static('build'))

//e40YytB80ebguNLU

// let persons = [
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
// ]

// get all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        return res.json(result)
    })
})

//Display a page
app.get('/info', (req, res) => {
    const text = `<div><p>Phonebook info has ${persons.length} people</p>
                 <p>${new Date}</p></div>`
    res.send(text)
})

//get person by id
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        }).catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

//delete by id
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    
   res.status(204).end()
})

//add person to the phonebook
app.post('/api/persons', (req, res) => {
    let content = req.body

    if (content.name === '' || content.number === '') {
        res.json({error: 'content is missing'}).status(400)
    } else {
        const person = new Person({
            "id": Math.floor(Math.random() * 10000),
            "name": content.name,
            "number": content.number
        })
        // let checkExisting = persons.filter(
        //     existingPerson => existingPerson.name.toLowerCase().includes(person.name.toLowerCase()))
        
        // if (checkExisting.length) {
        //     res.json({error: 'name must be unique'}).status(400).end()
        // } else {

            // person.id = 
            // persons = persons.concat(person)

            person.save().then(savedPerson => {
                res.json(savedPerson)
            })
        // }
    } 
})

//Setting a port for the application
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
