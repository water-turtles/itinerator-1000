const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
// require in specific keys
require('dotenv').config()
const { DB_URI } = process.env
const { COOKIE_KEY } = process.env

const PORT = 3000

const app = express()
app.use(cookieParser())
app.use(express.json())

// Main page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../frontend/index.html'))
})

// 404 redirect to index.html for react router
app.use((req, res) =>
  res.status(404).sendFile(path.join(__dirname, '../frontend/index.html'))
)

// Express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express global error handler caught unhandled middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, function (err) {
  if (err) console.log('Error in server setup')
  console.log('Server listening on Port', PORT)
})
