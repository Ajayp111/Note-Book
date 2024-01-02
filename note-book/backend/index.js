const express = require('express');
const connectToMongo = require('./db');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express();
require('dotenv').config();
const validateApi = require('./middleware/validateApi.js');


app.use(express.json());
app.use(cors());

connectToMongo();

// Available Routes
app.use('/', validateApi);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, ()=>{
    console.log(`iNotebook Server listening on port ${PORT}`);
});