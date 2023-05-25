import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 3000;

const app = express();
app.use(cookieParser());
app.use(express.json());

// Main page
// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../frontend/index.html'));
// });
app.get('/api', (req: Request, res: Response) => {
  res.status(200).send('backend connected');
});

// 404 redirect to index.html for react router
// app.use((req, res) =>
//   res.status(404).sendFile(path.join(__dirname, '../frontend/index.html'))
// );

// Express error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: `Express global error handler caught unhandled middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log('Server listening on Port', PORT);
});
