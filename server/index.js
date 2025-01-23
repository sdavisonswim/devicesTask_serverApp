const express = require('express');
const consign = require('consign');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
// const app = require('./server/index');
app.use(cors({
  origin: 'http://localhost:8080', // Replace with your development server's origin 
}));

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, '../client/src')));

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

consign()
  .include('server/controllers')
  .include('routes')
  .include('server/libs/middlewares.js')
  .then('server/libs/boots.js')
  .into(app);


const PORT = process.env.PORT || 3001; app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});