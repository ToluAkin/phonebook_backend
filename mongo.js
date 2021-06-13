const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personsSchema = new mongoose.Schema({
    'id': Number,
    'name': String,
    'number': String
})

const Persons = mongoose.model('Persons', personsSchema)

if (process.argv.length > 3) {
    const person = new Persons({
        'name': process.argv[3],
        'number': process.argv[4]
    })

    // eslint-disable-next-line no-unused-vars
    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

Persons.find({}).then(result => {
    console.log('PhoneBook:')
    result.forEach(person => {
        let phonebook = `${person.name} ${person.number}`
        console.log(phonebook)
    })
    mongoose.connection.close()
})
