const mongoose = require('mongoose')

const url = 'mongodb+srv://anuutila:*****@cluster0.ixlyb.mongodb.net/phonebook-persons'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person