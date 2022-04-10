const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )

  if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const genereteId = () => {
  return Math.floor(Math.random()*10000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'nimi tai numero puuttuu'})
  }
  if (persons.filter(person => person.name === body.name).length > 0) {
    return response.status(400).json({error: 'nimi on jo luettelossa'})
  }

  const person ={
    name: body.name,
    number: body.number,
    id: genereteId()
  }

  persons = persons.concat(person)

  response.json(person)
})

const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})