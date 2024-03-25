const connectToMongo = require('./db');
const express = require('express')
const app = express();
require('dotenv').config();
var cors = require('cors');

connectToMongo;

app.use(express.json());
app.use(cors());

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const notes = require("./routes/notes");
app.use("/api/notes", notes);

// const port = process.env.PORT;
const port = 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})