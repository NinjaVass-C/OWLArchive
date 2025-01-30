const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow Vue app running on this port
    methods: ['GET', 'POST'],
  }));

app.get('/', (req, res)=> {
    res.json({message: 'Hello, World!'});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;