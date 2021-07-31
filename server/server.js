// require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// create app
const app = express();
app.use(express.static('./server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// global variables
const port = 5000;
let solution = {
    solution: 0
};

// setup get request
app.get('/calculator', (req, res) => {
    console.log('Ready to send back calculations');
    console.log('Route is:', req.route.path);
    res.send(solution);
});

//setup post request
app.post('/inputs', (req, res) => {
    console.log('Ready to post user input');
    res.sendStatus(200);
});

// listen for requests
app.listen(port, () => {
    console.log('App is up and running');
});