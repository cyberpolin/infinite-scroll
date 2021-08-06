const express = require('express')
const data = require('./data.json')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send(data[0])
})

app.get('/feed', (req, res) => {
  console.log('> ', req.query)
  const { startsAt, limit, offset } = req.query
  setTimeout(() => res.send(data.slice(offset, limit)) , 3000)
  
})


app.listen(port , ()=>{
  console.log('I am running')
})