const db = require('./db');
const {createUserRoute} = require('./routes');
const cors = require("cors");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cors());
app.use('/users', createUserRoute(db));

app.listen(3002);
