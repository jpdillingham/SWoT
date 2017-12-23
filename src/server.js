const path = require('path')
const express = require('express')
const app = express()

console.log('Serving content from ' + path.join(__dirname, '../build'))

app.use(express.static(path.join(__dirname, '../build')))

app.get('/api/hello', (req, res) => res.send("hello world!"))

app.listen(3000, () => console.log('Listening on port 3000.'))