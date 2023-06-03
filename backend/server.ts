import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import generate from './controllers/generate.js'
dotenv.config()
const PORT = 3000

const app = express()
app.use(cookieParser())
app.use(express.json())

app.post('/api/create', async (req, res) => {
  const { itineraryParameters } = req.body
  console.log('input from backend', itineraryParameters)
  try {
    const itineraryResponse = await generate(itineraryParameters)
    console.log('itineraryResponse in backend', itineraryResponse)
    res.status(200).json({ itineraryResponse })
  } catch (error) {
    console.error('error in using openai', error)
    res.status(500).send('Internal Server Error')
  }
  // res.status(200).json({ message: 'input received' })
})

// Main page
app.get('/api', (req, res) => {
  res.status(200).send('backend')
})

// app.post('/generate', async (req, res) => {
//   const { tripDescription } = req.body;
//   try {
//     const query = await generate(tripDescription);
//     res.json({ query });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error in generate');
//   }
// });

// 404 redirect to index.html for react router
// app.use((req, res) =>
//   res.status(404).sendFile(path.join(__dirname, '../frontend/index.html'))
// );

// Express error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: `Express global error handler caught unhandled middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => {
  console.log('Server listening on Port', PORT)
})
