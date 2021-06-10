const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
//e40YytB80ebguNLU
const password = process.argv[2]
const url = `mongodb+srv://fullstack_api:e40YytB80ebguNLU@cluster0.sar1s.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personsSchema = new mongoose.Schema({
    "id": Number,
    "name": String,
    "number": String
})

const Persons = mongoose.model('Persons', personsSchema)

if (process.argv.length > 3) {
    const person = new Persons({
        "name": process.argv[3],
        "number": process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

Person.find({}).then(result => {
    console.log('PhoneBook:');
    result.forEach(person => {
        let phonebook = `${person.name} ${person.number}`
        console.log(phonebook);
    });
    mongoose.connection.close()
})

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });