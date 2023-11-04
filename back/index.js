// a lightweight express server and app for serving the react app

import express from 'express';
import path from 'path';
import process from 'process';
import multer from 'multer';

// define process
const port = process.env.PORT || 5000;
const app = express();
const upload = multer();

// define __dirname
const __dirname = path.resolve();

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from the react app
app.use(express.static(path.join(__dirname, '../build')));

// catch all route for simple POST request
app.post('/api', upload.any(), (req, res) => {
  console.log('req.body ', req.body);
  console.log('req.files ', req.files);
  res.send('POST request to the homepage');
});

// start the server
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
