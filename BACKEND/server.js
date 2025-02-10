const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
var indexRouter = require('./routes/index.js');


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow Vue app running on this port
    methods: ['GET', 'POST'],
  }));

app.use('/',indexRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;