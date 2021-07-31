// require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// create app
const app = express();

// global variables
const port = 5000;

// listen for requests
app.listen(port, () => {
    console.log('App is up and running');
});