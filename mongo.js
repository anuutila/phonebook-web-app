const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGO_URI

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 4) {
  
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })
  console.log(`adding person ${process.argv[2]} number ${process.argv[3]} to the directory`)

  person
    .save()
    .then(response => {
      console.log('person saved!')
      mongoose.connection.close()
    })

} else if (process.argv.length === 2) {

  Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })

} else {
  console.log('Virhe! Tuntematon komento')
  mongoose.connection.close()
}